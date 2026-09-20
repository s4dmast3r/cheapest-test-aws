from pathlib import Path
import csv,json,math,statistics

def pct(xs,p):return sorted(xs)[max(0,math.ceil(len(xs)*p)-1)] if xs else 0
all_rows=[]
for csvpath in sorted(Path('lab2/raw').glob('*.csv')):
 stem=csvpath.stem
 configpath=csvpath.with_suffix('.config.json')
 if stem=='get-smoke-1':config=dict(method='GET',scenario='smoke',rep=1,users=5,ramp_up=5,loops=1)
 elif configpath.exists():config=json.loads(configpath.read_text())
 else:continue
 if 'loops' in config:
  log=csvpath.with_suffix('.console.log')
  if not log.exists() or 'end of run' not in log.read_text():continue
  with csvpath.open() as f:rows=list(csv.DictReader(f))
  if not rows:continue
  xs=[float(x['elapsed']) for x in rows];errors=sum(x['success']!='true' for x in rows)
  seconds=(max(float(x['timeStamp'])+float(x['elapsed']) for x in rows)-min(float(x['timeStamp']) for x in rows))/1000
  result=dict(requests=len(rows),throughput_rps=len(rows)/seconds,mean_ms=statistics.mean(xs),p95_ms=pct(xs,.95),p99_ms=pct(xs,.99),error_pct=100*errors/len(rows))
  max_inflight=max(int(x['allThreads']) for x in rows);tool='JMeter';steady={}
 else:
  jp=csvpath.with_suffix('.json')
  if not jp.exists():continue
  data=json.loads(jp.read_text());result=data['overall'];max_inflight=data['max_inflight'];tool='Python';steady=data['steady']
 all_rows.append(dict(run=stem,endpoint=config['method'],scenario=config['scenario'],rep=config['rep'],tool=tool,users=config['users'],ramp_up=config['ramp_up'],duration=config.get('duration',''),**{k:round(v,3) if isinstance(v,float) else v for k,v in result.items() if k!='status_counts'},max_inflight=max_inflight,steady_p99_ms=round(steady.get('p99_ms',0),3),steady_error_pct=round(steady.get('error_pct',0),3)))
if all_rows:
 with Path('lab2/report/results-summary.csv').open('w',newline='') as f:
  w=csv.DictWriter(f,fieldnames=all_rows[0].keys());w.writeheader();w.writerows(all_rows)
 Path('lab2/report/results-summary.json').write_text(json.dumps(all_rows,indent=2))
 print('Completed runs:',len(all_rows))
 for x in all_rows:print(x['run'],x['requests'],x['p99_ms'],x['error_pct'],x['throughput_rps'])
