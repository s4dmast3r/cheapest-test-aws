import sys
sys.path.insert(0,'/Users/macbookair/.cache/lab2-tools/doclibs')
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
import json,statistics,csv
from pathlib import Path
rows=json.loads(Path('lab2/report/results-summary.json').read_text())
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
 else:ax.set_ylim(bottom=-.3)
 ax.set_ylabel(ylab);ax.set_title(title,loc='left',fontweight='bold');ax.grid(axis='y',alpha=.2);ax.legend(loc='upper left')
 fig.text(.5,.01,'JMeter: 1 envío por hilo (izquierda)   |   Python: usuarios que repiten (derecha). Puntos = corridas.',ha='center',fontsize=9)
 fig.tight_layout(rect=(0,.05,1,1));fig.savefig(f'lab2/graphs/{method.lower()}-asr.png',dpi=190);plt.close(fig)
fig,ax=plt.subplots(figsize=(10,4.5))
for method,color in [('GET','#22577A'),('POST','#B35C1E')]:
 xs=[];ys=[]
 for i,s in enumerate(scenarios):
  vals=[r['throughput_rps'] for r in rows if r['endpoint']==method and r['scenario']==s]
  if vals:xs.append(i);ys.append(statistics.median(vals))
 ax.plot(xs,ys,'o-',label=method,color=color)
ax.set_xticks(range(8),labels);ax.set_ylabel('Solicitudes por segundo');ax.set_title('Throughput observado por escenario',loc='left',fontweight='bold');ax.legend();ax.grid(axis='y',alpha=.2);ax.axvline(3.5,color='#8D99AE',linestyle=':')
fig.text(.5,.01,'Mediana entre corridas. La línea no implica continuidad entre los dos modelos de carga.',ha='center',fontsize=9)
fig.tight_layout(rect=(0,.05,1,1));fig.savefig('lab2/graphs/throughput.png',dpi=190);plt.close(fig)
