import subprocess,json,time
from pathlib import Path
import sys
method=sys.argv[1].upper()
runs=[('smoke',5,5,1),('baja',30,10,1),('media',100,20,1),('normal',450,50,5)]
for name,n,ramp,reps in runs:
 for rep in range(1,reps+1):
  prefix=Path('lab2/raw')/f'{method.lower()}-{name}-{rep}'
  if prefix.with_suffix('.csv').exists(): continue
  cmd=['/Users/macbookair/.cache/lab2-tools/apache-jmeter-5.6.3/bin/jmeter','-n','-t','lab2/config/load_test.jmx',f'-J{method}_threads={n}',f'-Jramp={ramp}','-l',str(prefix.with_suffix('.csv')),'-j',str(prefix.with_suffix('.jmeter.log'))]
  prefix.with_suffix('.config.json').write_text(json.dumps(dict(method=method,scenario=name,rep=rep,users=n,ramp_up=ramp,loops=1,command=cmd),indent=2))
  print('START',prefix,flush=True)
  with prefix.with_suffix('.console.log').open('w') as f:subprocess.run(cmd,stdout=f,stderr=subprocess.STDOUT,check=True)
  print('DONE',prefix,flush=True)
