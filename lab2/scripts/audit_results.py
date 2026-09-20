"""Recalcula métricas desde los CSV originales y comprueba la matriz mínima."""
import csv, json, math, statistics
from collections import Counter
from datetime import datetime, timezone
from pathlib import Path

LAB=Path('lab2')
OUT=LAB/'report'
scenarios=[('smoke',1),('baja',1),('media',1),('normal',5),('alta',3),('muy-alta',3),('estres',3),('pico',5)]
def pct(xs,p): return sorted(xs)[math.ceil(len(xs)*p)-1]
def jmeter_pct(xs,p):
    ordered=sorted(xs);position=(len(xs)+1)*p
    if position<=1:return ordered[0]
    if position>=len(xs):return ordered[-1]
    lo=math.floor(position)
    return ordered[lo-1]+(position-lo)*(ordered[lo]-ordered[lo-1])
audited=[]
for method in ['GET','POST']:
    combined_path=OUT/f'results_{method.lower()}.csv'
    with combined_path.open('w',newline='') as combined:
        fields=['run','scenario','rep','timestamp_iso','method','endpoint','status_code','latency_ms','error','phase']
        writer=csv.DictWriter(combined,fieldnames=fields); writer.writeheader()
        for scenario,reps in scenarios:
            for rep in range(1,reps+1):
                tag=f'{method.lower()}-{scenario}-{rep}'
                path=LAB/'raw'/(tag+'.csv')
                assert path.exists(),tag
                jmeter=scenario in ['smoke','baja','media','normal']
                if jmeter:
                    assert 'end of run' in path.with_suffix('.console.log').read_text(),tag
                else:
                    original=json.loads(path.with_suffix('.json').read_text())
                lat=[]; statuses=Counter(); errors=Counter(); steady=Counter(); first=1e30; last=0
                with path.open() as f:
                    for r in csv.DictReader(f):
                        if jmeter:
                            ms=float(r['elapsed']);stamp=float(r['timeStamp'])/1000
                            status=r['responseCode'];error='' if r['success']=='true' else r['responseMessage']
                            iso=datetime.fromtimestamp(stamp,timezone.utc).isoformat();phase='single_loop'
                        else:
                            ms=float(r['latency_ms']);iso=r['timestamp_iso'];stamp=datetime.fromisoformat(iso).timestamp()
                            status=r['status_code'];error=r['error'];phase=r['phase']
                        expected='200' if method=='GET' else '201'
                        failed=status!=expected or bool(error)
                        if failed:errors[(error.split(':')[0] if error else 'HTTP '+status)]+=1
                        statuses[status]+=1;lat.append(ms);first=min(first,stamp);last=max(last,stamp+ms/1000)
                        if phase=='steady':steady['requests']+=1;steady['failed']+=failed
                        writer.writerow(dict(run=tag,scenario=scenario,rep=rep,timestamp_iso=iso,method=method,
                            endpoint='/logistics/pedidos' if method=='POST' else '/logistics/tenderos/productos-disponibles',
                            status_code=status,latency_ms=ms,error=error,phase=phase))
                elapsed=last-first if jmeter else original['elapsed_s']
                success=statuses['200' if method=='GET' else '201']
                record=dict(run=tag,endpoint=method,scenario=scenario,rep=rep,requests=len(lat),
                    mean_ms=statistics.mean(lat),p95_ms=(jmeter_pct if jmeter else pct)(lat,.95),p99_ms=(jmeter_pct if jmeter else pct)(lat,.99),error_pct=100*sum(errors.values())/len(lat),
                    throughput_rps=len(lat)/elapsed,success_rps=success/elapsed,elapsed_s=elapsed,status_counts=dict(statuses),
                    error_types=dict(errors),steady_counts=dict(steady))
                if not jmeter:
                    assert len(lat)==original['overall']['requests'],tag
                    for metric in ['p95_ms','p99_ms','error_pct']:
                        assert abs(record[metric]-original['overall'][metric])<.002,(tag,metric)
                    record['event_loop_lag_p99_ms']=original['event_loop_lag_p99_ms']
                before=path.with_suffix('.before.json')
                # Existing campaign uses -before.json, while after is .after.json.
                before=path.parent/(tag+'-before.json')
                after=path.with_suffix('.after.json')
                if method=='POST' and before.exists() and after.exists():
                    a=json.loads(after.read_text());b=json.loads(before.read_text())
                    assert b=={'pedidos':4500,'items_pedido':31500},(tag,b)
                    record['committed_orders']=a['pedidos']-b['pedidos']
                    record['committed_items']=a['items_pedido']-b['items_pedido']
                audited.append(record)
assert len(audited)==44
(OUT/'audit-results.json').write_text(json.dumps({'complete_runs':44,'csv_json_metrics_match':True,'runs':audited},indent=2))
for method in ['GET','POST']:
    chosen=[r for r in audited if r['endpoint']==method]
    print(method,'requests',sum(r['requests'] for r in chosen),'errors',sum(sum(r['error_types'].values()) for r in chosen))
    for scenario,_ in scenarios:
        subset=[r for r in chosen if r['scenario']==scenario]
        print(scenario,'p99',round(min(r['p99_ms'] for r in subset),2),round(max(r['p99_ms'] for r in subset),2),
            'error',round(min(r['error_pct'] for r in subset),3),round(max(r['error_pct'] for r in subset),3),
            'success rps',round(statistics.median(r['success_rps'] for r in subset),2))
    print('types',Counter({k:sum(r['error_types'].get(k,0) for r in chosen) for r in chosen for k in r['error_types']}))
