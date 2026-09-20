import csv,json,subprocess,time,sys
from pathlib import Path
from datetime import datetime,timezone
with open(sys.argv[1],'w',newline='') as f:
 w=csv.writer(f);w.writerow(['timestamp','postgres_stats','app_processes','db_activity'])
 while True:
  stamp=datetime.now(timezone.utc).isoformat()
  def run(cmd):
   try:return subprocess.check_output(cmd,text=True,timeout=8).strip()
   except Exception as e:return str(e)
  stats=run(['docker','stats','cheapest-postgres','--no-stream','--format','{{json .}}'])
  processes=run(['ps','-p',Path('lab2/raw/current-backend.pid').read_text().strip() if Path('lab2/raw/current-backend.pid').exists() else '16527','-o','pid,pcpu,rss,etime'])
  activity=run(['docker','exec','cheapest-postgres','psql','-U','postgres','-d','cheapest','-Atc',"SELECT state||':'||coalesce(wait_event_type,'running')||':'||count(*) FROM pg_stat_activity WHERE datname='cheapest' GROUP BY state,wait_event_type"])
  w.writerow([stamp,stats,processes,activity]);f.flush();time.sleep(10)
