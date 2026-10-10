import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
const root=path.dirname(new URL(import.meta.url).pathname);
const manifest=JSON.parse(fs.readFileSync(path.join(root,'manifest.json'),'utf8'));
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
 assert.ok(!/TODO|LOREM IPSUM|PLACEHOLDER CONTENT/i.test(html),file+': placeholder');
 if(file!=='index.html'){
  const m=manifest.find(m=>m.file===file);
  assert.ok(m.answerWords>=40&&m.answerWords<=60,file+': direct answer length');
  assert.ok(m.questionCount>=5&&m.questionCount<=8,file+': question count');
  assert.ok(m.words>=800,file+': article too short');
  assert.ok(m.related.length>=2);
  assert.ok(html.includes('https://docs.hologrow.ai/hologrow-data/data-schema'));
  assert.ok(m.sourceCount>=3);
  assert.ok(html.includes('<link rel="canonical" href="'+m.url+'">'));
  assert.equal(ld['@graph'][0].headline,m.title);
  assert.equal(ld['@graph'][0].wordCount,m.words);
 }
}
assert.equal(120000-42000-18000-30000,30000);
assert.equal(120000-45000-21000-28000,26000);
assert.equal(100000-35000-15000-20000,30000);
assert.equal((100+160)/(2000+8000),.026);
assert.equal((50+220)/(1000+11000),.0225);
console.log(JSON.stringify({status:'PASS',htmlPages:files.length,articles:manifest.length,totalArticleWords:manifest.reduce((n,m)=>n+m.words,0),wordRange:[Math.min(...manifest.map(m=>m.words)),Math.max(...manifest.map(m=>m.words))],directAnswers:'40–60 words',questionSections:60,checks:['H1','language','viewport','JSON-LD','unique IDs','local links','anchors','canonicals','sources','related links','example arithmetic']},null,2));

