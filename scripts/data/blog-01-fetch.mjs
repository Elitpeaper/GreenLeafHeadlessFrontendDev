// Polite crawl of article pages listed in .cache/blog/list_*.html
import fs from 'node:fs'; import path from 'node:path';
const dir = '.cache/blog'; const UA = 'GreenleafTR-ContentBot/1.0 (content localisation for owner)';
const dec = s => s.replace(/&#x3A;/g,':').replace(/&#x2F;/g,'/').replace(/&#x3F;/g,'?').replace(/&#x3D;/g,'=').replace(/&amp;/g,'&');
const urls = new Set();
for (const f of ['list_company_news.html','list_eco.html']) {
  const h = dec(fs.readFileSync(path.join(dir,f),'utf8'));
  for (const m of h.matchAll(/href="(https:\/\/global\.green-leaf\.shop\/(?:novosti-kompanii-greenleaf|eko-gid)\/[^"]+)"/g)) urls.add(m[1]);
}
fs.mkdirSync(path.join(dir,'articles'),{recursive:true});
for (const u of urls) {
  const fn = path.join(dir,'articles', u.split('/').pop()+'.html');
  if (fs.existsSync(fn)) continue;
  const r = await fetch(u,{headers:{'User-Agent':UA}});
  fs.writeFileSync(fn, await r.text()); console.log(r.status,u);
  await new Promise(r=>setTimeout(r,1200));
}
fs.writeFileSync(path.join(dir,'urls.json'), JSON.stringify([...urls],null,1));
