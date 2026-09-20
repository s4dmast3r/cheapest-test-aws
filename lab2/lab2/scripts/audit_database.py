import subprocess,sys,json
from pathlib import Path
name=sys.argv[1]
def sql(q):return subprocess.check_output(['docker','exec','cheapest-postgres','psql','-U','postgres','-d','cheapest','--csv','-c',q],text=True)
queries={
'counts':"SELECT relname,n_live_tup FROM pg_stat_user_tables ORDER BY relname",
'stores':'SELECT "tiendaId",count(*) pedidos FROM pedidos GROUP BY 1 ORDER BY 2 DESC,1',
'zones':'SELECT zona,count(*) catalogos FROM catalogos GROUP BY 1 ORDER BY 2 DESC',
'promotions':'SELECT count(*) total,count(*) FILTER (WHERE inicio<=now() AND fin>=now()) activas FROM promociones',
'indexes':"SELECT tablename,indexname,indexdef FROM pg_indexes WHERE schemaname='public' ORDER BY tablename,indexname",
'dates':'SELECT min("fechaHoraCreacion"),max("fechaHoraCreacion") FROM pedidos',
'connections':'SELECT state,wait_event_type,wait_event,count(*) FROM pg_stat_activity GROUP BY 1,2,3',
}
subprocess.run(['docker','exec','cheapest-postgres','psql','-U','postgres','-d','cheapest','-c','ANALYZE'],check=True)
for tag,q in queries.items():Path(f'lab2/raw/{name}-{tag}.csv').write_text(sql(q))
