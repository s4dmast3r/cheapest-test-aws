import subprocess,json,sys,time,os,signal,urllib.request
from pathlib import Path
method=sys.argv[1].upper()

def reset_get_app(tag):
 path=Path('lab2/raw/current-backend.pid')
 pid=int(path.read_text()) if path.exists() else 16527
 try:os.kill(pid,signal.SIGTERM)
 except ProcessLookupError:pass
 time.sleep(3)
 log=open('lab2/raw/backend-'+tag+'.log','w')
 app=subprocess.Popen(['node','dist/main.js'],stdout=log,stderr=subprocess.STDOUT)
 path.write_text(str(app.pid))
 for _ in range(120):
  if app.poll() is not None:raise RuntimeError('Backend failed')
  try:
   if urllib.request.urlopen('http://localhost:3000/health',timeout=1).status==200:return
  except Exception:time.sleep(1)
 raise RuntimeError('Health timeout')
for scenario,users,ramp,reps in [('alta',1500,75,3),('muy-alta',3000,100,3),('estres',7500,150,3),('pico',18000,200,5)]:
 for rep in range(1,reps+1):
  prefix=Path('lab2/raw')/f'{method.lower()}-{scenario}-{rep}'
  if prefix.with_suffix('.json').exists():continue
  cmd=['/Users/macbookair/.cache/lab2-tools/venv/bin/python','lab2/scripts/load_test.py','--endpoint',method,'--users',str(users),'--ramp-up',str(ramp),'--duration','60','--output',str(prefix.with_suffix('.csv'))]
  if method=='POST':cmd+=['--body','lab2/config/large_order.json']
  prefix.with_suffix('.config.json').write_text(json.dumps(dict(scenario=scenario,rep=rep,users=users,ramp_up=ramp,duration=60,method=method,command=cmd),indent=2))
  if method=='GET':reset_get_app(prefix.name)
  print('START',prefix,flush=True)
  with prefix.with_suffix('.console.log').open('w') as f:subprocess.run(cmd,stdout=f,stderr=subprocess.STDOUT,check=True)
  print('DONE',prefix,flush=True)
  # Drain the server before a subsequent run; /health alone does not check DB queue.
  subprocess.run(['docker','exec','cheapest-postgres','psql','-U','postgres','-d','cheapest','-c','SELECT 1'],check=True,stdout=subprocess.DEVNULL)
  time.sleep(5)
