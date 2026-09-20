from pathlib import Path
import html,json
p=Path('lab2'); out=p/'evidence';out.mkdir(exist_ok=True)
def page(name,title,content):
 (out/name).write_text('<!doctype html><meta charset="utf-8"><title>'+html.escape(title)+'</title><style>body{font:18px system-ui;margin:36px;color:#172b42;background:#fff}h1{font-size:30px}pre{font:16px monospace;white-space:pre-wrap;background:#f3f5f7;padding:24px;line-height:1.5}small{color:#536175}table{border-collapse:collapse;width:100%}td,th{border:1px solid #ccd3da;padding:10px;text-align:left}th{background:#e6edf4}</style><h1>'+html.escape(title)+'</h1>'+content)
page('seed-config.html','Diseño de datos para GET y POST','<small>Fuentes: seeds/get-asr1.yaml y seeds/post-asr2.yaml</small><div style="display:flex;gap:28px"><pre style="flex:1">'+html.escape((p/'seeds/get-asr1.yaml').read_text())+'</pre><pre style="flex:1">'+html.escape((p/'seeds/post-asr2.yaml').read_text())+'</pre></div>')
page('jmeter-config.html','Configuración de JMeter para la campaña','<p>Plan real: config/load_test.jmx · Apache JMeter 5.6.3</p><table><tr><th>Escenario</th><th>Hilos por endpoint</th><th>Ramp up</th><th>Loops</th><th>Repeticiones</th></tr>'+''.join(f'<tr><td>{s}</td><td>{u}</td><td>{r} s</td><td>1</td><td>{n}</td></tr>' for s,u,r,n in [('Smoke',5,5,1),('Baja',30,10,1),('Media',100,20,1),('Normal',450,50,5)])+'</table><pre>GET /logistics/tenderos/productos-disponibles\n  tiendaId = bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb\n  zona = Zona Norte\nPOST /logistics/pedidos\n  Content-Type: application/json\n  4 ítems · identificador con UUID por request\nTimeout conexión: 10 s · respuesta: 30 s\nListeners: View Results Tree, Summary Report,\nPercentiles de Latencia (Aggregate Report), Graph Results</pre><small>Vista documental del plan; no es una captura de la ventana Java.</small>')
for jp in (p/'raw').glob('*.json'):
 if jp.name.endswith('.config.json'):continue
 try:d=json.loads(jp.read_text())
 except:continue
 if 'overall' not in d:continue
 cfg=d['config']; s=d['overall']
 command=f"python load_test.py --endpoint {cfg['endpoint']} --users {cfg['users']} --ramp-up {cfg['ramp_up']:g} --duration {cfg['duration']:g}"
 if cfg['body']:command+=' --body '+cfg['body']
 body='<p>Corrida archivada · Fuente real: raw/'+html.escape(jp.name)+'</p><pre>'+html.escape(command)+'</pre>'
 body+='<table><tr><th>Métrica de toda la corrida</th><th>Valor</th></tr>'
 for key,label in [('requests','Total requests'),('throughput_rps','Throughput total (req/s)'),('mean_ms','Media (ms)'),('p95_ms','p95 (ms)'),('p99_ms','p99 (ms)'),('error_pct','Error (%)')]:
  body+=f'<tr><td>{label}</td><td>{s[key]:,.3f}</td></tr>'
 body+='</table><p>Códigos: '+html.escape(str(s['status_counts']))+'</p>'
 body+=f"<p>Duración con drenaje: {d['elapsed_s']:.3f} s · p99 retraso del generador: {d['event_loop_lag_p99_ms']:.3f} ms</p>"
 body+='<small>Vista de los registros guardados; no representa una nueva ejecución. El comando abrevia las rutas locales.</small>'
 page(jp.stem+'.html','Resultado Python '+jp.stem,body)
