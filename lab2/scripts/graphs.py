import sys
sys.path.insert(0,'/Users/macbookair/.cache/lab2-tools/doclibs')
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
import json,statistics,csv
from pathlib import Path
rows=json.loads(Path('lab2/report/audit-results.json').read_text())['runs']
assert len(rows)==44
scenarios=['smoke','baja','media','normal','alta','muy-alta','estres','pico']
labels=['Smoke\n5','Baja\n30','Media\n100','Normal\n450','Alta\n1500','Muy alta\n3000','Estrés\n7500','Pico\n18000']
plt.rcParams.update({'font.family':'DejaVu Sans','font.size':10,'axes.spines.top':False,'axes.spines.right':False})
for method,metric,limit,title,ylab in [('GET','p99_ms',1000,'Latencia p99 del GET','p99 en milisegundos'),('POST','error_pct',2,'Errores del POST','Solicitudes fallidas (%)')]:
 fig,ax=plt.subplots(figsize=(10,4.5))
 for i,s in enumerate(scenarios):
  values=[r[metric] for r in rows if r['endpoint']==method and r['scenario']==s]
  if values:
   jitter=[i+(j-(len(values)-1)/2)*.06 for j in range(len(values))]
   ax.scatter(jitter,values,c='#22577A',s=35,zorder=3)
   ax.plot([i-.22,i+.22],[statistics.median(values)]*2,color='#102A43',lw=2)
 ax.axhline(limit,color='#B33939',linestyle='--',label=f'Umbral {limit:g}'+(' ms' if method=='GET' else '%'))
 ax.axvline(3.5,color='#8D99AE',linestyle=':');ax.set_xticks(range(8),labels);ax.set_xlim(-.5,7.5)
 if method=='GET':ax.set_yscale('log')
 else:ax.set_ylim(-3,85)
 ax.set_ylabel(ylab);ax.set_title(title,loc='left',fontweight='bold');ax.grid(axis='y',alpha=.2);ax.legend(loc='upper left')
 fig.text(.5,.01,'JMeter: 1 envío por hilo (izquierda)   |   Python: usuarios que repiten (derecha). Puntos = corridas.',ha='center',fontsize=9)
 fig.tight_layout(rect=(0,.05,1,1));fig.savefig(f'lab2/graphs/{method.lower()}-asr.png',dpi=190);plt.close(fig)
fig,axes=plt.subplots(1,2,figsize=(10,4.8))
for ax,subset,title in zip(axes,[scenarios[:4],scenarios[4:]],['JMeter con un envío por hilo','Python con usuarios que repiten']):
 for method,color in [('GET','#22577A'),('POST','#B35C1E')]:
  for metric,style,label in [('throughput_rps','--','total'),('success_rps','-','éxitos')]:
   values=[statistics.median(r[metric] for r in rows if r['endpoint']==method and r['scenario']==s) for s in subset]
   ax.plot(range(4),values,'o'+style,color=color,label=f'{method} {label}',markersize=4)
 ax.set_xticks(range(4),[labels[scenarios.index(s)] for s in subset]);ax.set_title(title,fontsize=11,fontweight='bold');ax.grid(axis='y',alpha=.2);ax.set_ylabel('Solicitudes por segundo');ax.set_ylim(bottom=0)
axes[1].legend(fontsize=8)
fig.text(.5,.01,'Medianas por escenario. Total incluye fallos; éxitos cuenta solamente HTTP 200 GET y HTTP 201 POST.',ha='center',fontsize=9)
fig.tight_layout(rect=(0,.05,1,1));fig.savefig('lab2/graphs/throughput.png',dpi=190);plt.close(fig)
refined=[]
for path in Path('lab2/refinement').glob('*-r*.json'):
 if path.name.endswith(('.command.json','.config.json')):continue
 data=json.loads(path.read_text())
 if 'overall' in data:refined.append((path.stem,data))
fig,axes=plt.subplots(1,2,figsize=(10,4.5))
for ax,method,metric,limit in zip(axes,['get','post'],['p99_ms','error_pct'],[1000,2]):
 for tag,data in refined:
  if tag.startswith(method+'-'):
   n=int(tag.split('-u')[1].split('-')[0]);ax.scatter(n,data['overall'][metric],color='#22577A',alpha=.8,s=28)
 ax.axhline(limit,color='#B33939',linestyle='--',label=f'Umbral {limit}');ax.legend(fontsize=8);ax.grid(alpha=.2);ax.set_xlabel('Usuarios Python');ax.set_ylabel('p99 en ms' if method=='get' else 'Error %');ax.set_title(method.upper()+' con ramp-up 30 s y meseta 60 s',fontsize=10)
 if method=='get':ax.set_yscale('log')
 else:ax.set_ylim(bottom=-1)
fig.tight_layout();fig.savefig('lab2/graphs/refinement.png',dpi=190);plt.close(fig)
