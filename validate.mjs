import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
const root=path.dirname(new URL(import.meta.url).pathname);
const manifest=JSON.parse(fs.readFileSync(path.join(root,'manifest.json'),'utf8'));
const articles=['content.json','content-04-06.json','content-07-10.json'].flatMap(f=>JSON.parse(fs.readFileSync(path.join(root,f),'utf8')));
const plain=s=>s.replace(/\[([^\]]+)\]\([^)]+\)/g,'$1');
const normalize=s=>plain(s).toLowerCase().replace(/[^a-z0-9]+/g,' ').trim();
const prose=a=>[a.answer,...a.tldr,...a.sections.flatMap(s=>[s.q,s.lead,s.text||'',s.after||'',s.prompt||'',...(s.table?[s.table.caption,...s.table.headers,...s.table.rows.flat()]:[])]),...a.faqs.flatMap(f=>[f.q,f.answer])];
assert.equal(manifest.length,10);
const files=['index.html',...manifest.map(m=>m.file)];
const issues=[];
for(const file of files){
 const html=fs.readFileSync(path.join(root,file),'utf8');
 assert.equal((html.match(/<h1[ >]/g)||[]).length,1,file+': H1 count');
 assert.ok(html.startsWith('<!doctype html>'),file+': doctype');
 assert.ok(html.includes('<html lang="en-US">'),file+': language');
 assert.ok(html.includes('name="viewport"'),file+': viewport');
 const ld=JSON.parse(html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)[1]);
 assert.ok(ld['@graph'].length>0);
 const ids=[...html.matchAll(/\bid="([^"]+)"/g)].map(m=>m[1]);
 assert.equal(new Set(ids).size,ids.length,file+': duplicate ids');
 for(const m of html.matchAll(/href="([^"]+)"/g)){
  const href=m[1];
  if(href.startsWith('#'))assert.ok(ids.includes(href.slice(1)),file+': invalid anchor '+href);
  else if(!href.startsWith('https://'))assert.ok(fs.existsSync(path.join(root,href)),file+': broken local link '+href);
 }
 for(const image of html.matchAll(/<img\b[^>]*src="([^"]+)"[^>]*alt="([^"]*)"[^>]*>/g)){
  assert.ok(image[2].trim().length>0,file+': image alt text');
  if(!image[1].startsWith('https://'))assert.ok(fs.existsSync(path.join(root,image[1])),file+': missing image '+image[1]);
 }
 assert.ok(!/TODO|LOREM IPSUM|PLACEHOLDER CONTENT/i.test(html),file+': placeholder');
 assert.ok(!/AI-assisted editorial|prepared with AI assistance/i.test(html),file+': AI editorial label');
 if(file!=='index.html'){
  const m=manifest.find(m=>m.file===file);
  assert.ok(m.answerWords>=40&&m.answerWords<=60,file+': direct answer length');
  assert.ok(m.questionCount>=5&&m.questionCount<=8,file+': question count');
  assert.ok(m.words>=1500,file+': article minimum length');
  assert.equal(m.faqCount,3);
  assert.equal(m.tldrCount,4);
  assert.ok(html.indexOf('id="tldr-title"')<html.indexOf('<figure'),file+': TLDR before illustration');
  assert.equal((html.match(/class="direct-answer"/g)||[]).length,7);
  const a=articles.find(a=>a.slug===m.slug);
  const faq=ld['@graph'].find(n=>n['@type']==='FAQPage');
  assert.deepEqual(faq.mainEntity.map(q=>q.name),a.faqs.map(f=>f.q));
  assert.deepEqual(faq.mainEntity.map(q=>q.acceptedAnswer.text),a.faqs.map(f=>plain(f.answer)));
  if(file!=='ecommerce-analytics-tools.html')assert.ok(!/https:\/\/(?:www\.)?(?:supermetrics\.com|triplewhale\.com|northbeam\.io|tryprofound\.com|databox\.com)/i.test(html),file+': competitor source');
  assert.ok(m.related.length>=2);
  assert.ok(html.includes('https://docs.hologrow.ai/hologrow-data/data-schema'));
  assert.ok(m.sourceCount>=3);
  const sourceSection=html.match(/<section class="sources"[\s\S]*?<\/section>/)?.[0]||'';
  const sourceLabels=[...sourceSection.matchAll(/<li><a[^>]*>([^<]+)<\/a><\/li>/g)].map(match=>match[1]);
  assert.equal(sourceLabels.length,m.sourceCount,file+': visible source count');
  assert.ok(sourceLabels.every(label=>!/\{|"q"|\["/.test(label)),file+': malformed source label');
  assert.ok(html.includes('<link rel="canonical" href="'+m.url+'">'));
  assert.equal(ld['@graph'][0].headline,m.title);
  assert.equal(ld['@graph'][0].wordCount,m.words);
  if(file==='ecommerce-analytics.html')assert.equal((html.match(/class="doc-shot"/g)||[]).length,3,file+': documentation screenshots');
  if(file==='ecommerce-analytics-tools.html')assert.equal((html.match(/class="doc-shot"/g)||[]).length,3,file+': comparison screenshots');
 }
}
assert.equal(120000-42000-18000-30000,30000);
assert.equal(120000-45000-21000-28000,26000);
assert.equal(100000-35000-15000-20000,30000);
assert.equal((100+160)/(2000+8000),.026);
assert.equal((50+220)/(1000+11000),.0225);
assert.equal(130000-8000-5000+6000+4000,127000);
assert.equal((40-13-11-2)/40,.35);
assert.equal((40-13-11-2-4)/40,.25);
assert.equal(250*12+20*50+6*12*50,7600);
assert.equal(450*12+10*50+2*12*50,7100);
assert.equal(40000-24000+10000-8000,18000);
assert.equal(3000*.4-1000,200);
assert.equal(2500*.5-1000,250);
assert.equal(new Set(articles.map(a=>a.title)).size,10);
assert.equal(new Set(articles.map(a=>a.description)).size,10);
const amazonArticle=articles.find(a=>a.slug==='amazon-seller-tools');
const amazonProse=prose(amazonArticle).join(' ');
for(const phrase of ['Product Opportunity Explorer','Amazon Creative Studio','Amazon Marketing Cloud','Lingxing ERP','WBR','MBR'])assert.ok(amazonProse.includes(phrase),'amazon-seller-tools: missing '+phrase);
const paragraphIndex=new Map();
for(const a of articles){
 for(const part of prose(a).flatMap(p=>p.split(/\n\n+/))){
  const p=normalize(part);if(p.split(' ').length<20)continue;
  if(!paragraphIndex.has(p))paragraphIndex.set(p,new Set());
  paragraphIndex.get(p).add(a.slug);
 }
}
const repeatedParagraphs=[...paragraphIndex].filter(([,slugs])=>slugs.size>1).map(([text,slugs])=>({text,articles:[...slugs]}));
assert.equal(repeatedParagraphs.length,0,'Repeated substantive paragraphs between articles');
const shingles=a=>{const words=normalize(prose(a).join(' ')).split(' ');return new Set(words.slice(0,-4).map((_,i)=>words.slice(i,i+5).join(' ')))};
const sets=articles.map(shingles),pairs=[];
for(let i=0;i<articles.length;i++)for(let j=i+1;j<articles.length;j++){
 const overlap=[...sets[i]].filter(x=>sets[j].has(x)).length;
 pairs.push({articles:[articles[i].slug,articles[j].slug],fiveWordShingleJaccardPercent:Number((100*overlap/(sets[i].size+sets[j].size-overlap)).toFixed(2))});
}
pairs.sort((a,b)=>b.fiveWordShingleJaccardPercent-a.fiveWordShingleJaccardPercent);
const report={status:'PASS',htmlPages:files.length,articles:manifest.length,totalArticleWords:manifest.reduce((n,m)=>n+m.words,0),wordRange:[Math.min(...manifest.map(m=>m.words)),Math.max(...manifest.map(m=>m.words))],wordCountScope:'Direct answer, TLDR bullets, question sections including tables and prompt labels, and customer FAQ text. Excludes navigation, illustrations, source list, CTA and related reading.',directAnswers:'40–60 words',questionSections:70,additionalCustomerFAQs:30,tldrBlocks:10,checks:['H1','language','viewport','JSON-LD','visible FAQ/schema match','unique IDs','local links','anchors','canonicals','sources','related links','example arithmetic','distinct titles and descriptions','no repeated substantive paragraphs across articles'],similarity:{method:'Five-word shingle Jaccard on normalized editorial body; shared navigation, source notes and CTA excluded. A local overlap measure, not a Google score, global plagiarism check or AI detector.',repeatedParagraphs,highestOverlapPairs:pairs.slice(0,5)},limitations:['No guarantee of indexing, rankings, AI citation or classifier outcomes.','No search-engine verdict, independent expert review or real customer benchmark is claimed.']};
fs.writeFileSync(path.join(root,'quality-report.json'),JSON.stringify(report,null,2)+'\n');
console.log(JSON.stringify(report,null,2));
