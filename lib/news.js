const TTL = 15 * 60 * 1000;
const memory = new Map();
const DAY = 86400000;
const PEOPLE = [
  ['马斯克','Elon Musk|Musk','global','科技商业'],['特朗普','Donald Trump|Trump','global','公共人物'],['拜登','Joe Biden|Biden','global','公共人物'],['哈里斯','Kamala Harris','global','公共人物'],['奥巴马','Barack Obama|Obama','global','公共人物'],['普京','Vladimir Putin|Putin','global','公共人物'],['泽连斯基','Volodymyr Zelensky|Zelensky','global','公共人物'],['马克龙','Emmanuel Macron|Macron','global','公共人物'],['默茨','Friedrich Merz|Merz','global','公共人物'],['斯塔默','Keir Starmer|Starmer','global','公共人物'],['莫迪','Narendra Modi|Modi','global','公共人物'],['高市早苗','Sanae Takaichi|Takaichi','global','公共人物'],['石破茂','Shigeru Ishiba','global','公共人物'],['内塔尼亚胡','Benjamin Netanyahu|Netanyahu','global','公共人物'],['查尔斯','King Charles','global','公共人物'],['威廉王子','Prince William','global','公共人物'],['凯特王妃','Kate Middleton|Princess Kate','global','公共人物'],['梅拉尼娅','Melania Trump','global','公共人物'],
  ['黄仁勋','Jensen Huang','global','科技商业'],['奥特曼','Sam Altman','global','科技商业'],['库克','Tim Cook','global','科技商业'],['扎克伯格','Mark Zuckerberg|Zuckerberg','global','科技商业'],['贝索斯','Jeff Bezos|Bezos','global','科技商业'],['巴菲特','Warren Buffett|Buffett','global','科技商业'],['比尔·盖茨','Bill Gates','global','科技商业'],['纳德拉','Satya Nadella','global','科技商业'],['皮查伊','Sundar Pichai','global','科技商业'],['哈萨比斯','Demis Hassabis','global','科技商业'],['辛顿','Geoffrey Hinton','global','科技商业'],['雷军','Lei Jun','cn','科技商业'],['马云','Jack Ma','cn','科技商业'],['马化腾','Pony Ma','cn','科技商业'],['任正非','Ren Zhengfei','cn','科技商业'],['余承东','Richard Yu','cn','科技商业'],['李彦宏','Robin Li','cn','科技商业'],['王传福','Wang Chuanfu','cn','科技商业'],['罗永浩','Luo Yonghao','cn','科技商业'],['刘强东','Richard Liu','cn','科技商业'],['张一鸣','Zhang Yiming','cn','科技商业'],['董明珠','Dong Mingzhu','cn','科技商业'],['梁文锋','Liang Wenfeng','cn','科技商业'],['何小鹏','He Xiaopeng','cn','科技商业'],['李斌','William Li','cn','科技商业'],
  ['泰勒·斯威夫特','Taylor Swift','global','文娱'],['碧昂丝','Beyoncé|Beyonce','global','文娱'],['蕾哈娜','Rihanna','global','文娱'],['Lady Gaga','Lady Gaga','global','文娱'],['比莉·艾利什','Billie Eilish','global','文娱'],['爱莉安娜','Ariana Grande','global','文娱'],['赛琳娜','Selena Gomez','global','文娱'],['贾斯汀·比伯','Justin Bieber','global','文娱'],['贾斯汀·汀布莱克','Justin Timberlake','global','文娱'],['阿黛尔','Adele','global','文娱'],['莉莉·艾伦','Lily Allen','global','文娱'],['杜阿·利帕','Dua Lipa','global','文娱'],['麦当娜','Madonna','global','文娱'],['坎耶','Kanye West|Ye West','global','文娱'],['德雷克','Drake','global','文娱'],['金·卡戴珊','Kim Kardashian','global','文娱'],['妮可·基德曼','Nicole Kidman','global','文娱'],['莱昂纳多','Leonardo DiCaprio','global','文娱'],['汤姆·克鲁斯','Tom Cruise','global','文娱'],['布拉德·皮特','Brad Pitt','global','文娱'],['安吉丽娜·朱莉','Angelina Jolie','global','文娱'],['赞达亚','Zendaya','global','文娱'],['蒂莫西·查拉梅','Timothee Chalamet|Timothée Chalamet','global','文娱'],['诺兰','Christopher Nolan','global','文娱'],['斯皮尔伯格','Steven Spielberg','global','文娱'],['卡梅隆','James Cameron','global','文娱'],
  ...'赵露思 白鹿 杨幂 刘亦菲 赵丽颖 迪丽热巴 杨紫 肖战 王一博 王鹤棣 易烊千玺 刘诗诗 唐嫣 倪妮 张若昀 胡歌 邓超 孙俪 于和伟 王雷 张译 张颂文 黄渤 沈腾 马丽 贾玲 章子怡 周迅 汤唯 舒淇 佟丽娅 杨颖 范冰冰 陈伟霆 陈坤 李现 檀健次 丞磊 郭宇欣 成毅 刘宇宁 王楚然 张凌赫 陈哲远 宋祖儿 田曦薇 陈都灵 虞书欣 陈星旭 钱水明 周杰伦 林俊杰 陈奕迅 王菲 张学友 刘德华 郭富城 黎明 甄子丹 成龙 梁朝伟 张曼玉 张柏芝 谢霆锋 汪峰 章泽天 李宇春 周深 薛之谦 毛不易 张杰 华晨宇 刘雨昕 宋雨琦 蔡依林 邓紫棋 凤凰传奇 张艺谋 陈凯歌 冯小刚 徐峥 韩红 孟子义 黄晓明 钟楚曦 金晨 张天爱 李沁 陈妍希 陈晓 大鹏 宋佳 咏梅 海清 闫妮 范伟 刘浩存 郭帆 文淇 董宇辉 李佳琦 李子柒 陈丽君 何炅 谢娜 撒贝宁 倪萍 董卿'.split(' ').map(n=>[n,'','cn','文娱']),
  ['梅西','Lionel Messi|Messi','global','体育'],['C罗','Cristiano Ronaldo|Ronaldo','global','体育'],['詹姆斯','LeBron James|LeBron','global','体育'],['库里','Stephen Curry|Steph Curry','global','体育'],['大谷翔平','Shohei Ohtani|Ohtani','global','体育'],['姆巴佩','Kylian Mbappe|Kylian Mbappé|Mbappe|Mbappé','global','体育'],['哈兰德','Erling Haaland|Haaland','global','体育'],['内马尔','Neymar','global','体育'],['德约科维奇','Novak Djokovic|Djokovic','global','体育'],['阿尔卡拉斯','Carlos Alcaraz|Alcaraz','global','体育'],['辛纳','Jannik Sinner|Sinner','global','体育'],['纳达尔','Rafael Nadal|Nadal','global','体育'],['维斯塔潘','Max Verstappen|Verstappen','global','体育'],['汉密尔顿','Lewis Hamilton|Hamilton','global','体育'],['西蒙·拜尔斯','Simone Biles','global','体育'],
  ...'郑钦文 张雨霏 潘展乐 孙颖莎 王楚钦 樊振东 马龙 全红婵 陈芋汐 苏炳添 谷爱凌 张伟丽 吴艳妮 陈梦 刘国梁 许昕 林诗栋 王曼昱 周启豪 梁靖崑 刘诗雯 石宇奇 李诗沣 王欣瑜 张之臻 商竣程 布云朝克特 邓亚萍 郎平 朱婷 姚明 易建联 苏翊鸣 宁忠岩'.split(' ').map(n=>[n,'','cn','体育']),
  ['习近平','Xi Jinping','cn','公共人物'],['李强','Li Qiang','cn','公共人物'],['王毅','Wang Yi','cn','公共人物'],['莫言','Mo Yan','cn','文娱'],['余华','Yu Hua','cn','文娱'],['刘慈欣','Liu Cixin','cn','文娱'],['杨振宁','Chen Ning Yang','cn','科技商业']
];
const aliases = PEOPLE.flatMap(p=>[p[0],...p[1].split('|').filter(Boolean)].map(a=>({alias:a,person:p[0],en:p[1].split('|')[0]||p[0],region:p[2],category:p[3]}))).sort((a,b)=>b.alias.length-a.alias.length);
const stopWords = new Set('White House United States United Kingdom North Korea South Korea World Cup New York Los Angeles Golden Globe Nobel Prize Wall Street New Zealand Hong Kong South Africa Prime Minister Supreme Court Breaking News Donald Trump Taylor Swift Elon Musk Dies Dead Death Pretty Little Hollywood Star Actor Actress Singer Grammy Oscar Award Leading Breaking Young First Top Fans Says Reveals Announces After Before'.split(' '));
export function decode(s='') { return s.replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g,'$1').replace(/&#(x[0-9a-f]+|\d+);/gi,(_,v)=>String.fromCodePoint(v[0].toLowerCase()==='x'?parseInt(v.slice(1),16):Number(v))).replace(/&lt;/g,'<').replace(/&gt;/g,'>').replace(/&quot;/g,'"').replace(/&apos;/g,"'").replace(/&amp;/g,'&'); }
function textOnly(s='') { return decode(s).replace(/<[^>]*>/g,' ').replace(/\s+/g,' ').trim(); }
function field(s,k) {return decode(s.match(new RegExp('<'+k+'(?:\\s[^>]*)?>([\\s\\S]*?)</'+k+'>','i'))?.[1]||'');}
export function safeURL(u) {try {let x=new URL(u); return x.protocol==='https:'||x.protocol==='http:' ? x.href : '';}catch{return '';}}
export function parseRss(xml, feed) {
  return [...xml.matchAll(/<item(?:\s[^>]*)?>([\s\S]*?)<\/item>/gi)].map(m=>{
    const s=m[1],source=textOnly(field(s,'source'))||feed.name;
    let title=textOnly(field(s,'title'));
    if(title.endsWith(' - '+source)) title=title.slice(0,-source.length-3);
    return {title,url:safeURL(field(s,'link')),source,publishedAt:new Date(field(s,'pubDate')).getTime(),region:feed.region,category:feed.category,feed:feed.name};
  }).filter(x=>x.url&&x.title&&Number.isFinite(x.publishedAt));
}
export function parseRssJSON(data,feed) {
  if(data.status!=='ok'||!Array.isArray(data.items))throw new Error('备用 RSS 通道暂不可用');
  return data.items.map(item=>{
    const raw=textOnly(item.title),split=raw.lastIndexOf(' - '),source=split>=0?raw.slice(split+3):textOnly(item.author)||feed.name;
    const stamp=String(item.pubDate||'');const publishedAt=Date.parse(/^\d{4}-\d\d-\d\d \d\d:\d\d:\d\d$/.test(stamp)?stamp.replace(' ','T')+'Z':stamp);
    return {title:split>=0?raw.slice(0,split):raw,url:safeURL(item.link),source,publishedAt,region:feed.region,category:feed.category,feed:feed.name};
  }).filter(x=>x.url&&x.title&&Number.isFinite(x.publishedAt));
}
async function fetchFeed(f,preferProxy) {
  if(!preferProxy){try{const body=await(await remote(f.url,{},6500)).text();const articles=parseRss(body,f);if(articles.length)return {articles,transport:'直连 RSS'};}catch{}}
  const feedURL=new URL(f.url),sp=feedURL.searchParams;
  const canonical='https://news.google.com/rss/search?q='+encodeURIComponent(sp.get('q'))+'&hl='+sp.get('hl')+'&gl='+sp.get('gl')+'&ceid='+sp.get('ceid');
  const u='https://api.rss2json.com/v1/api.json?rss_url='+encodeURIComponent(canonical);
  let data;
  for(let i=0;i<4;i++){
    const r=await remote(u,{},10000,true);data=await r.json();
    if(data.status==='ok')break;
    if(!/being processed/i.test(data.message||'')||i===3)throw new Error('备用 RSS 通道暂不可用');
    await new Promise(resolve=>setTimeout(resolve,1000*2**i));
  }
  const articles=parseRssJSON(data,f);return {articles,transport:'RSS2JSON 备用通道（每源最多10条）'};
}
export function personFor(title) {
  const lower=title.toLowerCase();
  for(const a of aliases){ const p=lower.indexOf(a.alias.toLowerCase()); if(p<0)continue; if(/[a-z]/i.test(a.alias) && ((p&&/[a-z]/i.test(title[p-1]))||/[a-z]/i.test(title[p+a.alias.length]||'')))continue; return a; }
  const cn=title.match(/(?:女?演员|歌手|导演|运动员|作家|科学家|企业家)[“「]?([\u4e00-\u9fa5]{2,4}?)(?=在|去世|宣布|透露|回应|获|被|：|，|”|「|将|发文|重返)/);
  if(cn&&!/^(表示|透露|宣布|现场|阵容|中国|美国|国内|近日)/.test(cn[1]))return {person:cn[1],en:cn[1],category:null,region:null,inferred:true};
  const candidates=title.match(/\b[A-Z][a-z]+(?:[-'][A-Z]?[a-z]+)?\s+[A-Z][a-z]+(?:[-'][A-Z]?[a-z]+)?\b/g)||[];
  const match=candidates.find(x=>x.split(' ').every(w=>!stopWords.has(w)));
  return match?{person:match,en:match,category:null,region:'global',inferred:true}:null;
}
function grams(s){s=s.toLowerCase().replace(/[^\p{L}\p{N}]/gu,'');return new Set(Array.from({length:Math.max(0,s.length-1)},(_,i)=>s.slice(i,i+2)));}
function similarity(a,b) {const x=grams(a),y=grams(b);let n=0;for(const z of x)if(y.has(z))n++;return n/Math.max(1,x.size+y.size-n);}
function sameStory(a,b,person) {
  if(similarity(a,b)>=0.38)return true;
  const remove=s=>{let out=s.toLowerCase();for(const p of aliases.filter(x=>x.person===person))out=out.replaceAll(p.alias.toLowerCase(),' ');return out;};
  if(/[\u4e00-\u9fa5]/.test(a+b))return false;
  const common=new Set('a an the is are was were will be been in on at to of for and or with from despite keeps against after before his her its says said as over new'.split(' '));
  const tokens=s=>new Set((remove(s).match(/[a-z0-9]+/g)||[]).filter(x=>!common.has(x)));
  const x=tokens(a),y=tokens(b);let n=0;for(const t of x)if(y.has(t))n++;return n>=4&&n/Math.max(1,Math.min(x.size,y.size))>=0.7;
}
function hash(s) {let h=2166136261;for(const c of s){h^=c.codePointAt(0);h=Math.imul(h,16777619);}return (h>>>0).toString(36);}
export function clusterStories(articles,{days=3,count=7,region='all',category='all',query='',now=Date.now()}={}) {
  const cutoff=now-days*DAY, groups=[];
  const seen=new Set();
  for(const a of articles.sort((a,b)=>b.publishedAt-a.publishedAt)) {
    if(a.publishedAt<cutoff||a.publishedAt>now||seen.has(a.url))continue;
    seen.add(a.url);
    if(/高调官宣|整个商界刮目相看|想不火都难|horoscope|zodiac/i.test(a.title))continue;
    const p=personFor(a.title);
    if(!p||p.inferred&&!query)continue;
    const r=p.region||a.region, c=p.category||a.category;
    if(region!=='all'&&r!==region||category!=='all'&&c!==category)continue;
    if(query && !a.title.toLowerCase().includes(query.toLowerCase())&&!p.person.toLowerCase().includes(query.toLowerCase())&&!p.en.toLowerCase().includes(query.toLowerCase()))continue;
    const g=groups.find(g=>g.person===p.person&&g.references.some(ref=>sameStory(ref.title,a.title,p.person)));
    const ref={title:a.title,url:a.url,source:a.source,publishedAt:new Date(a.publishedAt).toISOString()};
    if(g){g.references.push(ref);g.sourceCount=new Set(g.references.map(x=>x.source)).size;g.reportCount=g.references.length;g.firstReportAt=new Date(Math.min(Date.parse(g.firstReportAt),a.publishedAt)).toISOString();}
    else groups.push({id:hash(p.person+':'+a.title),person:p.person,englishName:p.en,title:a.title,region:r,category:c,nameInferred:!!p.inferred,publishedAt:new Date(a.publishedAt).toISOString(),firstReportAt:new Date(a.publishedAt).toISOString(),references:[ref],sourceCount:1,reportCount:1});
  }
  const ranked=groups.sort((a,b)=>(b.sourceCount-a.sourceCount)||(Date.parse(b.publishedAt)-Date.parse(a.publishedAt)));
  const picked=[],perPerson=new Map();
  const take=g=>{if(!g||picked.includes(g)||picked.length>=count||(perPerson.get(g.person)||0)>=(query?2:1))return; picked.push(g);perPerson.set(g.person,(perPerson.get(g.person)||0)+1);};
  if(category==='all'&&!query)for(const c of ['文娱','体育','科技商业','公共人物'])take(ranked.find(x=>x.category===c&&!perPerson.has(x.person)));
  if(region==='all'&&!query){let each=Math.floor(count/2);for(const r of ['cn','global'])for(const g of ranked.filter(x=>x.region===r)){if(picked.filter(x=>x.region===r).length>=each)break;take(g);}}
  for(const g of ranked){if(picked.length>=count)break;take(g);}
  return {events:picked.sort((a,b)=>b.sourceCount-a.sourceCount||Date.parse(b.publishedAt)-Date.parse(a.publishedAt)).slice(0,count),candidateCount:ranked.length,articleCount:seen.size};
}
async function remote(url, init={}, timeout=13000,allowHTTPError=false) {
  const c=new AbortController(),t=setTimeout(()=>c.abort(),timeout);
  try {const r=await fetch(url,{...init,signal:c.signal,headers:{'Accept-Language':'en-US,en;q=0.9',...init.headers}});if(!r.ok&&!allowHTTPError)throw new Error('来源响应 '+r.status);return r;}catch(e){throw new Error(e.name==='AbortError'?'连接超时':e.message);}finally{clearTimeout(t);}
}
const feedSpecs=[
  ['cn','文娱','演员 OR 歌手 OR 导演 OR 艺人'],['cn','体育','运动员 OR 孙颖莎 OR 郑钦文 OR 潘展乐 OR 全红婵 OR 樊振东'],['cn','科技商业','雷军 OR 董明珠 OR 马云 OR 梁文锋 OR 任正非 OR 余承东'],['cn','公共人物','人物 采访 OR 名人 事件 OR 科学家 获奖'],
  ['global','文娱','celebrity OR actor OR singer OR director'],['global','体育','athlete OR Messi OR Ronaldo OR Ohtani OR Alcaraz'],['global','科技商业','Musk OR Altman OR Huang OR Zuckerberg OR Bezos'],['global','公共人物','Trump OR Macron OR Putin OR Starmer OR Takaichi']
];
function feeds(days,region,category,query) {
  const specs=query?[['cn','文娱',query],['global','文娱',query]]:feedSpecs;
  return specs.filter(s=>(region==='all'||s[0]===region)&&(query||category==='all'||s[1]===category)).map(([r,c,q])=>{
    const u=new URL('https://news.google.com/rss/search');u.search=new URLSearchParams({q:'('+q+') when:'+days+'d',hl:r==='cn'?'zh-CN':'en-US',gl:r==='cn'?'CN':'US',ceid:r==='cn'?'CN:zh-Hans':'US:en'});
    return {name:(r==='cn'?'中文':'英文')+'新闻 · '+c,region:r,category:c,url:u.href};
  });
}
async function cacheGet(key) {
  const hit=memory.get(key);if(hit&&Date.now()-hit.time<TTL)return hit.data;
  if(typeof caches!=='undefined'){try{const r=await caches.default.match(new Request('https://people-radar.cache/'+encodeURIComponent(key)));if(r){const d=await r.json();if(Date.now()-Date.parse(d.fetchedAt)<TTL)return d;}}catch{}}
  return null;
}
function cachePut(key,data,ctx) {
  if(memory.size>40)memory.delete(memory.keys().next().value);memory.set(key,{time:Date.now(),data});
  if(typeof caches!=='undefined'){const work=caches.default.put(new Request('https://people-radar.cache/'+encodeURIComponent(key)),new Response(JSON.stringify(data),{headers:{'Cache-Control':'public, max-age=900','Content-Type':'application/json'}})).catch(()=>{});ctx?.waitUntil?.(work);}
}
async function news(u,ctx,env) {
  const days=Number(u.searchParams.get('days')||3),count=Number(u.searchParams.get('count')||7),region=u.searchParams.get('region')||'all',category=u.searchParams.get('category')||'all',query=(u.searchParams.get('q')||'').trim();
  if(![3,7].includes(days)||![7,15].includes(count)||!['all','cn','global'].includes(region)||!['all','文娱','体育','科技商业','公共人物'].includes(category)||query.length>70)return json({error:'筛选参数不正确'},400);
  const key=JSON.stringify({days,count,region,category,query});const hit=await cacheGet(key);if(hit)return json({...hit,cached:true});
  const fs=feeds(days,region,category,query);
  const preferProxy=env?.PREFER_RSS_PROXY==='1'||typeof caches!=='undefined';
  const all=await Promise.all(fs.map(async f=>{try{const {articles,transport}=await fetchFeed(f,preferProxy);if(!articles.length)throw new Error('本窗口无可解析报道');return {articles,status:{name:f.name,state:'ok',count:articles.length,url:f.url,transport}};}catch(e){return {articles:[],status:{name:f.name,state:'error',message:e.message,url:f.url}};}}));
  const now=Date.now();const result={...clusterStories(all.flatMap(x=>x.articles),{days,count,region,category,query,now}),fetchedAt:new Date(now).toISOString(),windowStart:new Date(now-days*DAY).toISOString(),windowEnd:new Date(now).toISOString(),days,requestedCount:count,sources:all.map(x=>x.status),cached:false};
  result.shortfall=Math.max(0,count-result.events.length);if(result.events.length)cachePut(key,result,ctx);return json(result,result.sources.every(x=>x.state==='error')?503:200);
}
export function initialJSON(html,name) {
  const re=new RegExp('(?:var\\s+)?'+name+'\\s*=\\s*');const m=re.exec(html);if(!m)return null;
  let start=m.index+m[0].length,depth=0,inString=false,escape=false;
  for(let i=start;i<html.length;i++){let c=html[i];if(inString){if(escape)escape=false;else if(c==='\\')escape=true;else if(c==='"')inString=false;continue;}if(c==='"')inString=true;else if(c==='{'||c==='[')depth++;else if(c==='}'||c===']'){depth--;if(depth===0){try{return JSON.parse(html.slice(start,i+1));}catch{return null;}}}}
  return null;
}
function rendererText(x){return x?.simpleText||x?.runs?.map(v=>v.text).join('')||'';}
export function parseViews(label) {
  if(/No views|无观看|暂无/i.test(label))return {value:0,exact:true};
  const raw=label.replace(/,/g,'');const m=raw.match(/([\d.]+)\s*([KMB万亿]?)/i);if(!m)return {value:null,exact:false};
  return {value:Number(m[1])*({K:1e3,M:1e6,B:1e9,'万':1e4,'亿':1e8}[m[2].toUpperCase()]||1),exact:!m[2]};
}
export function ageDays(s){
  const m=s.match(/(\d+)\s*(seconds?|minutes?|hours?|days?|weeks?|months?|years?|[smhdw])\s+ago/i);if(!m)return null;
  const v=Number(m[1]),unit=m[2].toLowerCase();return v*(unit.startsWith('month')?30:unit.startsWith('year')?365:({s:1/86400,m:1/1440,h:1/24,d:1,w:7}[unit[0]]||365));
}
export function parseYouTube(html,days) {
  const data=initialJSON(html,'ytInitialData');if(!data)throw new Error('YouTube 暂未返回可读取的视频列表');
  const found=[],ids=new Set();function walk(o){if(!o||typeof o!=='object')return;if(o.videoRenderer){const v=o.videoRenderer;if(!ids.has(v.videoId)){ids.add(v.videoId);found.push(v);}}for(const v of Object.values(o))if(v&&typeof v==='object')walk(v);}walk(data);
  return found.map(v=>{const viewsLabel=rendererText(v.viewCountText),p=parseViews(viewsLabel);return {id:v.videoId,title:rendererText(v.title),url:'https://www.youtube.com/watch?v='+v.videoId,author:rendererText(v.ownerText||v.longBylineText),thumbnail:safeURL(v.thumbnail?.thumbnails?.slice(-1)[0]?.url),views:p.value,viewsExact:p.exact,viewsLabel,publishedLabel:rendererText(v.publishedTimeText),ageDays:ageDays(rendererText(v.publishedTimeText)),duration:rendererText(v.lengthText),verifiedBy:'YouTube 公开页面',viral:p.value!==null&&p.value>=100000};}).filter(v=>/^[A-Za-z0-9_-]{11}$/.test(v.id)&&v.ageDays!==null&&v.ageDays<days).sort((a,b)=>(b.views||0)-(a.views||0)).slice(0,6);
}
async function yt(q,days,key) {
  if(key){
    const u=new URL('https://www.googleapis.com/youtube/v3/search');u.search=new URLSearchParams({part:'snippet',type:'video',maxResults:'20',q,order:'viewCount',publishedAfter:new Date(Date.now()-days*DAY).toISOString(),publishedBefore:new Date().toISOString(),key});
    const r=await (await remote(u)).json();if(r.error)throw new Error('YouTube API 未通过，请检查 Key、权限和额度');
    const ids=(r.items||[]).map(x=>x.id?.videoId).filter(Boolean);if(!ids.length)return [];
    const v=new URL('https://www.googleapis.com/youtube/v3/videos');v.search=new URLSearchParams({part:'snippet,statistics,contentDetails',id:ids.join(','),key});const d=await(await remote(v)).json();if(d.error)throw new Error('YouTube 视频统计暂不可用');
    return (d.items||[]).map(x=>({id:x.id,title:decode(x.snippet.title),author:x.snippet.channelTitle,url:'https://www.youtube.com/watch?v='+x.id,thumbnail:safeURL(x.snippet.thumbnails?.medium?.url),views:x.statistics?.viewCount==null?null:Number(x.statistics.viewCount),viewsExact:true,likes:x.statistics?.likeCount==null?null:Number(x.statistics.likeCount),publishedAt:x.snippet.publishedAt,verifiedBy:'YouTube 官方 API',viral:Number(x.statistics?.viewCount||0)>=100000})).filter(x=>Date.parse(x.publishedAt)>=Date.now()-days*DAY&&Date.parse(x.publishedAt)<=Date.now()).sort((a,b)=>(b.views||0)-(a.views||0)).slice(0,6);
  }
  const u=new URL('https://www.youtube.com/results');u.search=new URLSearchParams({search_query:q,hl:'en',gl:'US',sp:'CAMSAggD'});
  return parseYouTube(await(await remote(u)).text(),days);
}
export function parseDouyin(d,days,now=Date.now()) {
  if(d.err_no!==0)throw new Error('抖音官方接口未通过，请检查 Token、搜索权限和设备 ID');
  return (d.data?.data?.video_list||[]).map(x=>({id:x.item_id,title:x.title,author:x.nickname,url:safeURL(x.link)||'https://www.douyin.com/video/'+x.item_id,thumbnail:safeURL(x.cover),likes:x.statistics?.digg_count==null?null:Number(x.statistics.digg_count),publishedAt:new Date(Number(x.create_time)*1000).toISOString(),verifiedBy:'抖音官方 API',viral:Number(x.statistics?.digg_count||0)>=10000})).filter(x=>/^https:\/\/www\.douyin\.com\/video\/\d+/.test(x.url)&&Date.parse(x.publishedAt)>=now-days*DAY&&Date.parse(x.publishedAt)<=now).sort((a,b)=>(b.likes||0)-(a.likes||0)).slice(0,6);
}
async function douyin(q,days,token,deviceId) {
  if(!token||!deviceId)return {videos:[],state:'needs_connection',message:'抖音自动检索需要开通视频搜索权限并填入 Token 与设备 ID。可先用下方搜索入口查看相关视频。'};
  if(!/^\d{1,20}$/.test(deviceId))throw new Error('抖音设备 ID 应为数字');
  const u=new URL('https://open.douyin.com/dy_open_api/v1/search/video/');u.search=new URLSearchParams({keyword:q,count:'30',cursor:'0',device_id:deviceId,publish_time:'7',sort_type:'1'});
  const d=await(await remote(u,{headers:{'access-token':token,'Content-Type':'application/json'}})).json();return {videos:parseDouyin(d,days),state:'ok'};
}
async function videos(request,env,ctx) {
  let b;try{b=await request.json();}catch{return json({error:'请求格式不正确'},400);}
  const q=String(b.q||'').trim().slice(0,150),days=Number(b.days||3),dyQuery=String(b.douyinQuery||q).slice(0,150);
  if(!q||![3,7].includes(days))return json({error:'请提供关键词及 3 天或 7 天窗口'},400);
  const key=b.youtubeKey||env?.YOUTUBE_API_KEY,token=b.douyinToken||env?.DOUYIN_CLIENT_TOKEN,deviceId=b.deviceId||env?.DOUYIN_DEVICE_ID;
  const searchLinks={youtube:'https://www.youtube.com/results?search_query='+encodeURIComponent(q)+'&sp=CAMSAggD',douyin:'https://www.douyin.com/search/'+encodeURIComponent(dyQuery)+'?type=video&sort_type=1&publish_time=7'};
  let ytResult;const cacheKey='yt:'+days+':'+q;
  const hit=!key?await cacheGet(cacheKey):null;
  const [y,d]=await Promise.allSettled([hit?Promise.resolve(hit.videos):yt(q,days,key),douyin(dyQuery,days,token,String(deviceId||''))]);
  if(y.status==='fulfilled'){ytResult={state:'ok',videos:y.value};if(!key&&!hit&&y.value.length)cachePut(cacheKey,{videos:y.value,fetchedAt:new Date().toISOString()},ctx);}else ytResult={state:'error',videos:[],message:y.reason.message};
  return json({youtube:ytResult,douyin:d.status==='fulfilled'?d.value:{state:'error',videos:[],message:d.reason.message},searchLinks,fetchedAt:hit?.fetchedAt||new Date().toISOString(),days,thresholds:{youtube:100000,douyin:10000},note:'视频与事件的相关性由关键词匹配；爆款候选门槛仅为本工具规则。'},200,true);
}
function json(d,status=200,privateData=false){return new Response(JSON.stringify(d),{status,headers:{'Content-Type':'application/json; charset=utf-8','Cache-Control':privateData?'no-store':'no-cache','X-Content-Type-Options':'nosniff'}});}
export default {async fetch(request,env={},ctx={}) {
  const u=new URL(request.url);
  try {
    if(u.pathname==='/api/events'&&request.method==='GET')return await news(u,ctx,env);
    if(u.pathname==='/api/videos'&&request.method==='POST'){if(Number(request.headers.get('Content-Length')||0)>12000)return json({error:'请求过大'},413);const origin=request.headers.get('Origin');if(origin&&origin!==u.origin)return json({error:'来源不允许'},403);return await videos(request,env,ctx);}
    if(u.pathname==='/api/health')return json({status:'ok',version:'1.0.0',time:new Date().toISOString()});
    if(u.pathname==='/'&&request.method==='GET')return new Response(typeof PAGE==='undefined'?'Preview not assembled':PAGE,{headers:{'Content-Type':'text/html; charset=utf-8','Cache-Control':'no-cache','X-Content-Type-Options':'nosniff','Referrer-Policy':'strict-origin-when-cross-origin','Content-Security-Policy':"default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; connect-src 'self'; frame-src https://www.youtube-nocookie.com; base-uri 'none'; object-src 'none'"}});
    return json({error:'页面不存在'},404);
  }catch{return json({error:'服务暂不可用，请稍后重试'},500);}
}};
