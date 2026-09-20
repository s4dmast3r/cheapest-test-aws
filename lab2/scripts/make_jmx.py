from pathlib import Path
import xml.etree.ElementTree as E
import json

def prop(parent,name,value,kind='stringProp'):
 e=E.SubElement(parent,kind,name=name);e.text=str(value);return e
root=E.Element('jmeterTestPlan',version='1.2',properties='5.0',jmeter='5.6.3'); tree=E.SubElement(root,'hashTree')
plan=E.SubElement(tree,'TestPlan',guiclass='TestPlanGui',testclass='TestPlan',testname='Lab 2 Cheapest',enabled='true')
prop(plan,'TestPlan.serialize_threadgroups','true','boolProp')
args=E.SubElement(plan,'elementProp',name='TestPlan.user_defined_variables',elementType='Arguments',guiclass='ArgumentsPanel',testclass='Arguments',enabled='true');E.SubElement(args,'collectionProp',name='Arguments.arguments')
pt=E.SubElement(tree,'hashTree')
for method in ['GET','POST']:
 tg=E.SubElement(pt,'ThreadGroup',guiclass='ThreadGroupGui',testclass='ThreadGroup',testname=method+' Request',enabled='true')
 prop(tg,'ThreadGroup.on_sample_error','continue')
 lc=E.SubElement(tg,'elementProp',name='ThreadGroup.main_controller',elementType='LoopController',guiclass='LoopControlPanel',testclass='LoopController',enabled='true');prop(lc,'LoopController.loops','1');prop(lc,'LoopController.continue_forever','false','boolProp')
 prop(tg,'ThreadGroup.num_threads','${__P('+method+'_threads,0)}');prop(tg,'ThreadGroup.ramp_time','${__P(ramp,5)}');prop(tg,'ThreadGroup.scheduler','false','boolProp')
 tt=E.SubElement(pt,'hashTree')
 sampler=E.SubElement(tt,'HTTPSamplerProxy',guiclass='HttpTestSampleGui',testclass='HTTPSamplerProxy',testname=method+' Cheapest',enabled='true')
 for name,value in [('domain','localhost'),('port','3000'),('protocol','http'),('method',method),('path','/logistics/pedidos' if method=='POST' else '/logistics/tenderos/productos-disponibles'),('connect_timeout','10000'),('response_timeout','30000')]:prop(sampler,'HTTPSampler.'+name,value)
 prop(sampler,'HTTPSampler.use_keepalive','true','boolProp');prop(sampler,'HTTPSampler.follow_redirects','true','boolProp')
 ar=E.SubElement(sampler,'elementProp',name='HTTPsampler.Arguments',elementType='Arguments');coll=E.SubElement(ar,'collectionProp',name='Arguments.arguments')
 if method=='GET': pairs=[('tiendaId','bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb'),('zona','Zona Norte')]
 else:
  body={'identificador':'LAB2-${__UUID()}','tiendaId':'bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb','fechaHoraCreacion':'2026-09-08T00:00:00.000Z','montoTotal':72000,'monedaId':'cccccccc-cccc-4ccc-8ccc-cccccccccccc','estado':'creado','items':[{'productoId':pid,'cantidad':3,'precioUnitario':6000,'descuento':0,'monedaId':'cccccccc-cccc-4ccc-8ccc-cccccccccccc'} for pid in ['aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa','aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaab']*2]}
  pairs=[('',json.dumps(body))];prop(sampler,'HTTPSampler.postBodyRaw','true','boolProp')
 for name,value in pairs:
  el=E.SubElement(coll,'elementProp',name=name,elementType='HTTPArgument');prop(el,'Argument.name',name);prop(el,'Argument.value',value);prop(el,'Argument.metadata','=');prop(el,'HTTPArgument.always_encode','true' if method=='GET' else 'false','boolProp')
 st=E.SubElement(tt,'hashTree')
 hm=E.SubElement(st,'HeaderManager',guiclass='HeaderPanel',testclass='HeaderManager',testname='JSON headers',enabled='true');hc=E.SubElement(hm,'collectionProp',name='HeaderManager.headers')
 for name,value in [('Content-Type','application/json'),('Accept','application/json')]:
  h=E.SubElement(hc,'elementProp',name='',elementType='Header');prop(h,'Header.name',name);prop(h,'Header.value',value)
 E.SubElement(st,'hashTree')
 for gui,name in [('ViewResultsFullVisualizer','View Results Tree'),('SummaryReport','Summary Report'),('StatVisualizer','Percentiles de Latencia'),('GraphVisualizer','Graph Results')]:
  r=E.SubElement(tt,'ResultCollector',guiclass=gui,testclass='ResultCollector',testname=name,enabled='true');prop(r,'filename','');prop(r,'ResultCollector.error_logging','false','boolProp');E.SubElement(tt,'hashTree')
E.indent(root);E.ElementTree(root).write('lab2/config/load_test.jmx',encoding='UTF-8',xml_declaration=True)
