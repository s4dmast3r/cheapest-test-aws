"""Verifica registro de fallos y ramp-up con un servidor local controlado."""
import asyncio, tempfile, subprocess, json
from pathlib import Path
from aiohttp import web
async def main():
 async def handler(request):
  return web.Response(status=503,text='controlled failure')
 app=web.Application();app.router.add_get('/logistics/tenderos/productos-disponibles',handler)
 runner=web.AppRunner(app);await runner.setup();site=web.TCPSite(runner,'127.0.0.1',3099);await site.start()
 with tempfile.TemporaryDirectory() as d:
  target=Path(d)/'test.csv'
  proc=await asyncio.create_subprocess_exec('/Users/macbookair/.cache/lab2-tools/venv/bin/python','lab2/scripts/load_test.py','--endpoint','GET','--users','3','--ramp-up','0.2','--duration','0.3','--base-url','http://127.0.0.1:3099','--output',str(target),stdout=asyncio.subprocess.PIPE)
  await proc.communicate();assert proc.returncode==0
  result=json.loads(target.with_suffix('.json').read_text())
  assert result['overall']['requests']>0 and result['overall']['error_pct']==100
  assert result['peak_virtual_users']==3 and result['elapsed_s']>=0.5
  assert result['steady']['requests']>0
 await runner.cleanup();print('PASS: HTTP errors, CSV/JSON output, ramp plus steady window, virtual users')
asyncio.run(main())
