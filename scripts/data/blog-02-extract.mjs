// Extract title/date/section/cover/body from cached article HTML -> .cache/blog/extracted.json
import fs from 'node:fs'; import path from 'node:path';
const dir='.cache/blog/articles';
const dec=s=>s.replace(/&#x([0-9A-F]+);/gi,(_,h)=>String.fromCodePoint(parseInt(h,16))).replace(/&amp;/g,'&').replace(/&nbsp;/g,' ').replace(/&quot;/g,'"');
const out=[];
for(const f of fs.readdirSync(dir)){
  const h=fs.readFileSync(path.join(dir,f),'utf8');
  const a=h.match(/<article class="greenleaf-content-card">([\s\S]*?)<\/article>/); if(!a){console.log('NOART',f);continue;}
  const x=a[1];
  const date=(x.match(/<time>([^<]*)<\/time>/)||[])[1];
  const title=dec((x.match(/<h1>([\s\S]*?)<\/h1>/)||[])[1]||'');
  const cover=(x.match(/<img src="([^"]+)"/)||[])[1];
  const body=(x.match(/<div class="greenleaf-article-body">([\s\S]*)<\/div>\s*$/)||[,''])[1];
  const bc=[...h.matchAll(/<li class="breadcrumb-item"><a href="([^"]*)">([^<]*)<\/a>/g)].map(m=>dec(m[1])+'|'+dec(m[2]));
  const url=dec(bc[bc.length-1].split('|')[0]);
  const section=url.includes('/eko-gid/')?'eco':'company_news';
  out.push({file:f,url,section,date,title,cover,body,text:dec(body.replace(/<[^>]+>/g,' ')).replace(/\s+/g,' ').trim()});
}
fs.writeFileSync('.cache/blog/extracted.json',JSON.stringify(out,null,1));
for(const o of out) console.log(o.date,o.section.slice(0,3),o.text.length,(o.body.match(/<img/g)||[]).length,o.file,'|',o.title.slice(0,70));
