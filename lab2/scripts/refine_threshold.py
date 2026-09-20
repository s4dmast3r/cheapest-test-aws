"""Pruebas adicionales en DB aislada, mismo ramp-up y tamaño de body.
No modifica la base cheapest ni los CSV de las 44 corridas originales.
"""
import json, os, shutil, subprocess, time, urllib.request
from pathlib import Path

ROOT = Path.cwd()
LAB = ROOT / 'lab2'
OUT = LAB / 'refinement'
OUT.mkdir(exist_ok=True)
runtime = LAB / 'runtime-refinement'
shutil.copytree(ROOT / 'dist', runtime, dirs_exist_ok=True)
DB = 'cheapest_lab2_refinement'
PY = '/Users/macbookair/.cache/lab2-tools/venv/bin/python'
app = None

def command(args, **kwargs):
    return subprocess.run(args, check=True, **kwargs)

def stop():
    global app
    if app is not None:
        app.terminate()
        try:
            app.wait(timeout=15)
        except subprocess.TimeoutExpired:
            app.kill(); app.wait()
        app = None

def reset(method, tag):
    stop()
    command(['docker','exec','cheapest-postgres','dropdb','-U','postgres','--if-exists','--force',DB])
    command(['docker','exec','cheapest-postgres','createdb','-U','postgres',DB])
    with (LAB/'raw'/f'{method.lower()}-baseline.dump').open('rb') as stream:
        command(['docker','exec','-i','cheapest-postgres','pg_restore','-U','postgres','-d',DB,'--no-owner'],stdin=stream)
    seed = 'get-asr1.yaml' if method == 'GET' else 'post-asr2.yaml'
    shutil.copyfile(LAB/'seeds'/seed, runtime/'datasources/load-seed.yaml')
    global app
    env = dict(os.environ, DB_NAME=DB, PORT='3002')
    with (OUT/f'{tag}-backend.log').open('w') as log:
        app = subprocess.Popen(['node',str(runtime/'main.js')],env=env,stdout=log,stderr=subprocess.STDOUT)
    for _ in range(90):
        if app.poll() is not None:
            raise RuntimeError('Backend stopped during startup')
        try:
            if urllib.request.urlopen('http://localhost:3002/health',timeout=1).status == 200:
                return
        except Exception:
            time.sleep(1)
    raise RuntimeError('Health timeout')

def trial(method, users, rep=1):
    tag=f'{method.lower()}-u{users}-r{rep}'
    path=OUT/(tag+'.json')
    if path.exists():
        return json.loads(path.read_text())
    reset(method,tag)
    args=[PY,'lab2/scripts/load_test.py','--endpoint',method,'--users',str(users),
          '--ramp-up','30','--duration','60','--base-url','http://localhost:3002',
          '--output',str(OUT/(tag+'.csv'))]
    if method=='POST': args+=['--body','lab2/config/large_order.json']
    (OUT/(tag+'.command.json')).write_text(json.dumps(args,indent=2))
    print('START',tag,flush=True)
    with (OUT/(tag+'.console.log')).open('w') as log:
        command(args,stdout=log,stderr=subprocess.STDOUT)
    stop()
    result=json.loads(path.read_text())
    print('DONE',tag,result['overall'],flush=True)
    return result

def campaign():
    for method, candidates, tolerance in [('GET',[50,150,300,600],50),('POST',[7500,10000,12500],1250)]:
        metric='p99_ms' if method=='GET' else 'error_pct'
        limit=1000 if method=='GET' else 2
        results={n:trial(method,n)['overall'][metric] for n in candidates}
        good=[n for n,v in results.items() if v<limit or (method=='POST' and v==limit)]
        bad=[n for n,v in results.items() if v>=limit and not (method=='POST' and v==limit)]
        if good and bad and max(good)<min(bad):
            low,high=max(good),min(bad)
            while high-low>tolerance:
                mid=((low+high)//2//25)*25
                if mid<=low:break
                val=trial(method,mid)['overall'][metric]
                if val<limit or (method=='POST' and val==limit):low=mid
                else:high=mid
            for n in (low,high):
                for rep in (2,3):trial(method,n,rep)
            print('BRACKET',method,low,high,flush=True)
    print('REFINEMENT COMPLETE',flush=True)

if __name__=='__main__':
    try:campaign()
    finally:stop()
