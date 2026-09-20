import time,subprocess,os,signal,json
from pathlib import Path
expected=[Path(f'lab2/raw/get-{name}-{rep}.json') for name,n in [('alta',3),('muy-alta',3),('estres',3),('pico',5)] for rep in range(1,n+1)]
while not all(p.exists() for p in expected):time.sleep(10)
print('All 14 Python GET runs complete; preserving diagnostic evidence',flush=True)
# Let last generator/runner finish cleanup before switching dataset.
time.sleep(10)
pid=int(Path('lab2/raw/current-backend.pid').read_text())
os.kill(pid,signal.SIGTERM);time.sleep(5)
with open('lab2/config/explain-get.sql') as inp,open('lab2/raw/get-explain-analyze.txt','w') as out:
 subprocess.run(['docker','exec','-i','cheapest-postgres','psql','-U','postgres','-d','cheapest'],stdin=inp,stdout=out,check=True)
subprocess.run(['python3','lab2/scripts/audit_database.py','get-final'],check=True)
with open('lab2/raw/get-baseline.dump','wb') as out:subprocess.run(['docker','exec','cheapest-postgres','pg_dump','-U','postgres','-Fc','cheapest'],stdout=out,check=True)
subprocess.run(['python3','lab2/scripts/post_campaign.py'],check=True)
subprocess.run(['python3','lab2/scripts/summarize.py'],check=True)
print('ALL 44 REQUIRED RUNS COMPLETE',flush=True)
