"""Campaña POST con restauración de snapshot antes de cada repetición.
Solo usa la base cheapest en el contenedor cheapest-postgres creado para Lab 2.
"""
import subprocess,os,time,signal,json,urllib.request
from pathlib import Path
ROOT=Path.cwd();LAB=ROOT/'lab2';app=None

def cmd(args,**kw):return subprocess.run(args,check=True,**kw)
def sql(q):return subprocess.check_output(['docker','exec','cheapest-postgres','psql','-U','postgres','-d','cheapest','-Atc',q],text=True).strip()
def start(tag):
 global app
 f=(LAB/'raw'/f'backend-{tag}.log').open('w')
 app=subprocess.Popen(['node','dist/main.js'],stdout=f,stderr=subprocess.STDOUT)
 (LAB/'raw/current-backend.pid').write_text(str(app.pid))
 for _ in range(120):
  if app.poll() is not None:raise RuntimeError('Backend failed: '+tag)
  try:
   if urllib.request.urlopen('http://localhost:3000/health',timeout=1).status==200:return
  except Exception:time.sleep(1)
 raise RuntimeError('Health timeout')
def stop():
 global app
 if app:
  app.terminate()
  try:app.wait(timeout=15)
  except subprocess.TimeoutExpired:app.kill();app.wait()
  app=None

def reset(tag):
 stop()
 cmd(['docker','exec','cheapest-postgres','dropdb','-U','postgres','--force','cheapest'])
 cmd(['docker','exec','cheapest-postgres','createdb','-U','postgres','cheapest'])
 with (LAB/'raw/post-baseline.dump').open('rb') as f:cmd(['docker','exec','-i','cheapest-postgres','pg_restore','-U','postgres','-d','cheapest','--no-owner'],stdin=f)
 start(tag)
 before={'pedidos':int(sql('SELECT count(*) FROM pedidos')),'items_pedido':int(sql('SELECT count(*) FROM items_pedido'))}
 (LAB/'raw'/f'{tag}-before.json').write_text(json.dumps(before))
 assert before=={'pedidos':4500,'items_pedido':31500},before

# Call only after GET is complete and its backend has been stopped by the coordinator.
Path('src/datasources/load-seed.yaml').write_text((LAB/'seeds/post-asr2.yaml').read_text())
with (LAB/'raw/build-post.log').open('w') as f:cmd(['npm','run','build'],stdout=f,stderr=subprocess.STDOUT)
cmd(['docker','exec','cheapest-postgres','dropdb','-U','postgres','--force','cheapest'])
cmd(['docker','exec','cheapest-postgres','createdb','-U','postgres','cheapest'])
start('post-baseline')
cmd(['python3','lab2/scripts/audit_database.py','post-baseline'])
products=json.loads(sql('SELECT json_agg(t) FROM (SELECT id,"precioBase" FROM productos ORDER BY id LIMIT 24) t'))
items=[dict(productoId=x['id'],cantidad=2+i%7,precioUnitario=float(x['precioBase']),descuento=0,monedaId='cccccccc-cccc-4ccc-8ccc-cccccccccccc') for i,x in enumerate(products)]
body=dict(identificador='LAB2-template',tiendaId='bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb',fechaHoraCreacion='2026-09-08T00:00:00.000Z',montoTotal=round(sum(x['cantidad']*x['precioUnitario'] for x in items),2),monedaId='cccccccc-cccc-4ccc-8ccc-cccccccccccc',estado='creado',items=items)
(LAB/'config/large_order.json').write_text(json.dumps(body,indent=2))
with (LAB/'raw/post-baseline.dump').open('wb') as f:cmd(['docker','exec','cheapest-postgres','pg_dump','-U','postgres','-Fc','cheapest'],stdout=f)
for scenario,users,ramp,reps in [('smoke',5,5,1),('baja',30,10,1),('media',100,20,1),('normal',450,50,5),('alta',1500,75,3),('muy-alta',3000,100,3),('estres',7500,150,3),('pico',18000,200,5)]:
 for rep in range(1,reps+1):
  tag=f'post-{scenario}-{rep}';prefix=LAB/'raw'/tag
  if prefix.with_suffix('.json').exists() or (prefix.with_suffix('.console.log').exists() and 'end of run' in prefix.with_suffix('.console.log').read_text()):continue
  reset(tag);print('START',tag,flush=True)
  if users<=450:
   command=['/Users/macbookair/.cache/lab2-tools/apache-jmeter-5.6.3/bin/jmeter','-n','-t','lab2/config/load_test.jmx',f'-JPOST_threads={users}',f'-Jramp={ramp}','-l',str(prefix.with_suffix('.csv')),'-j',str(prefix.with_suffix('.jmeter.log'))]
  else:command=['/Users/macbookair/.cache/lab2-tools/venv/bin/python','lab2/scripts/load_test.py','--endpoint','POST','--users',str(users),'--ramp-up',str(ramp),'--duration','60','--body','lab2/config/large_order.json','--output',str(prefix.with_suffix('.csv'))]
  cfg=dict(method='POST',scenario=scenario,rep=rep,users=users,ramp_up=ramp,command=command)
  cfg.update({'loops':1} if users<=450 else {'duration':60})
  prefix.with_suffix('.config.json').write_text(json.dumps(cfg,indent=2))
  with prefix.with_suffix('.console.log').open('w') as f:cmd(command,stdout=f,stderr=subprocess.STDOUT)
  # Stop app to cancel residual timed-out work before counting committed rows and restoring.
  stop()
  prefix.with_suffix('.after.json').write_text(json.dumps({'pedidos':int(sql('SELECT count(*) FROM pedidos')),'items_pedido':int(sql('SELECT count(*) FROM items_pedido'))}))
  print('DONE',tag,flush=True)
start('post-final')
print('POST CAMPAIGN COMPLETE',flush=True)
