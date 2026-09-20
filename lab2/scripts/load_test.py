#!/usr/bin/env python3
"""Carga cerrada: usuarios virtuales escalonados, luego meseta de duration s.
users/ramp-up NO es throughput objetivo: cada usuario repite sin think time.
Una sola dependencia: aiohttp. CSV conserva errores y fase de cada petición.
"""
import argparse, asyncio, csv, json, math, time, uuid, resource
from datetime import datetime, timezone
from pathlib import Path
import aiohttp

def percentile(values, p):
    return sorted(values)[max(0, math.ceil(len(values)*p)-1)] if values else 0

async def run(a):
    if a.users < 1 or a.duration <= 0 or a.ramp_up < 0:
        raise ValueError('users>=1, duration>0, ramp-up>=0')
    soft, hard = resource.getrlimit(resource.RLIMIT_NOFILE)
    resource.setrlimit(resource.RLIMIT_NOFILE, (min(max(soft, a.users+2048), hard), hard))
    endpoint = '/logistics/pedidos' if a.endpoint == 'POST' else '/logistics/tenderos/productos-disponibles'
    template = json.loads(Path(a.body).read_text()) if a.endpoint == 'POST' else None
    if template and len(template['items']) <= 20:
        raise ValueError('POST requiere más de 20 ítems')
    output=Path(a.output); output.parent.mkdir(parents=True,exist_ok=True)
    start=time.perf_counter(); end=start+a.ramp_up+a.duration
    rows=[]; lag=[]; inflight=0; max_inflight=0; peak_users=0
    columns=['timestamp_iso','method','endpoint','status_code','latency_ms','error','phase','user','response_bytes']
    connector=aiohttp.TCPConnector(limit=a.users,limit_per_host=a.users)
    timeout=aiohttp.ClientTimeout(total=a.timeout)
    with output.open('w',newline='') as f:
        writer=csv.DictWriter(f,fieldnames=columns); writer.writeheader()
        async with aiohttp.ClientSession(connector=connector,timeout=timeout) as session:
            async def monitor():
                while time.perf_counter()<end:
                    before=time.perf_counter(); await asyncio.sleep(1)
                    lag.append(max(0,time.perf_counter()-before-1)*1000)
                    f.flush()
            async def user(i):
                nonlocal inflight,max_inflight,peak_users
                await asyncio.sleep(max(0,start+a.ramp_up*i/a.users-time.perf_counter()))
                peak_users+=1
                while time.perf_counter()<end:
                    tick=time.perf_counter(); phase='ramp' if tick-start<a.ramp_up else 'steady'
                    stamp=datetime.now(timezone.utc).isoformat(); status=0; error=''; size=0
                    payload=None
                    if template:
                        payload=dict(template,identificador='LAB2-'+uuid.uuid4().hex,fechaHoraCreacion=stamp)
                    params={'tiendaId':a.tienda,'zona':a.zona} if a.endpoint=='GET' else None
                    inflight+=1; max_inflight=max(max_inflight,inflight)
                    try:
                        async with session.request(a.endpoint,a.base_url+endpoint,json=payload,params=params) as response:
                            status=response.status; data=await response.read(); size=len(data)
                            if status>=400: error=data.decode(errors='replace')[:240]
                            elif status != (201 if template else 200): error='unexpected_status'
                    except Exception as exc:
                        error=type(exc).__name__+': '+str(exc)[:180]
                    finally: inflight-=1
                    ms=(time.perf_counter()-tick)*1000
                    row=dict(zip(columns,[stamp,a.endpoint,endpoint,status,round(ms,3),error,phase,i,size]))
                    writer.writerow(row); rows.append((ms,bool(error) or status>=400 or status==0,phase,status))
            await asyncio.gather(monitor(),*(user(i) for i in range(a.users)))
    elapsed=time.perf_counter()-start
    def summary(subset,seconds):
        lat=[x[0] for x in subset]
        return dict(requests=len(subset),throughput_rps=len(subset)/seconds if seconds else 0,mean_ms=sum(lat)/len(lat) if lat else 0,p95_ms=percentile(lat,.95),p99_ms=percentile(lat,.99),error_pct=100*sum(x[1] for x in subset)/len(subset) if subset else 0,status_counts={str(s):sum(x[3]==s for x in subset) for s in set(x[3] for x in subset)})
    result=dict(config=vars(a),elapsed_s=elapsed,measurement_s=a.ramp_up+a.duration,peak_virtual_users=peak_users,max_inflight=max_inflight,event_loop_lag_p99_ms=percentile(lag,.99),overall=summary(rows,elapsed),steady=summary([x for x in rows if x[2]=='steady'],a.duration))
    output.with_suffix('.json').write_text(json.dumps(result,indent=2)); print(json.dumps(result,indent=2),flush=True)

if __name__=='__main__':
    p=argparse.ArgumentParser(description=__doc__)
    p.add_argument('--endpoint',choices=['GET','POST'],required=True);p.add_argument('--users',type=int,required=True)
    p.add_argument('--ramp-up',type=float,required=True);p.add_argument('--duration',type=float,default=60)
    p.add_argument('--body');p.add_argument('--base-url',default='http://localhost:3000');p.add_argument('--timeout',type=float,default=30)
    p.add_argument('--tienda',default='bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb');p.add_argument('--zona',default='Zona Norte')
    p.add_argument('--output',default='results_get.csv');asyncio.run(run(p.parse_args()))



#docker compose down -v
#docker compose up postgres -d

#npm run start:dev