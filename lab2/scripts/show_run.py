"""Muestra el comando archivado y el resumen real para captura de evidencia."""
import json,sys
from pathlib import Path
run=sys.argv[1]
p=Path('lab2/raw')/run
config=json.loads(p.with_suffix('.config.json').read_text())
result=json.loads(p.with_suffix('.json').read_text())
print('\nEVIDENCIA DE CORRIDA GUARDADA — '+run)
print('Fuente: '+str(p.with_suffix('.json')))
print('\nComando ejecutado (ruta del intérprete abreviada):')
command=config['command']
print('python load_test.py --endpoint '+result['config']['endpoint']+
      ' --users '+str(result['config']['users'])+' --ramp-up '+str(result['config']['ramp_up'])+
      ' --duration '+str(result['config']['duration']))
if result['config']['body']:print('  --body '+result['config']['body'])
print('  --output '+str(p.with_suffix('.csv')))
print('\nRESUMEN FINAL DE TODA LA CORRIDA')
for key,label in [('requests','Solicitudes'),('throughput_rps','Throughput total (req/s)'),
    ('mean_ms','Latencia media (ms)'),('p95_ms','p95 (ms)'),('p99_ms','p99 (ms)'),('error_pct','Error (%)')]:
    val=result['overall'][key]
    print(f'{label:30s} {val:,.3f}' if isinstance(val,float) else f'{label:30s} {val:,}')
print('Códigos HTTP:',result['overall']['status_counts'])
print('Duración incluyendo drenaje: %.3f s'%result['elapsed_s'])
print('p99 retraso del event loop: %.3f ms'%result['event_loop_lag_p99_ms'])
print('\nCSV y JSON originales conservados. Esta vista no ejecuta una nueva prueba.\n')
