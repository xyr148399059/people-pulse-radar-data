import {parseRss,clusterStories} from './lib/news.js';
import {readFile,writeFile,mkdir} from 'node:fs/promises';
const specs=[['cn','文娱','演员 OR 歌手 OR 导演 OR 艺人'],['cn','体育','运动员 OR 孙颖莎 OR 郑钦文 OR 潘展乐 OR 全红婵 OR 樊振东'],['cn','科技商业','雷军 OR 董明珠 OR 马云 OR 梁文锋 OR 任正非 OR 余承东'],['cn','公共人物','人物 采访 OR 名人 事件 OR 科学家 获奖'],['global','文娱','celebrity OR actor OR singer OR director'],['global','体育','athlete OR Messi OR Ronaldo OR Ohtani OR Alcaraz'],['global','科技商业','Musk OR Altman OR Huang OR Zuckerberg OR Bezos'],['global','公共人物','Trump OR Macron OR Putin OR Starmer OR Takaichi']];
let prior;try{prior=JSON.parse(await readFile('data/latest.json','utf8'));}catch{}
const windows={};
for(const days of [3,7]){
  const results=await Promise.all(specs.map(async([region,category,q])=>{
    const u=new URL('https://news.google.com/rss/search');u.search=new URLSearchParams({q:'('+q+') when:'+days+'d',hl:region==='cn'?'zh-CN':'en-US',gl:region==='cn'?'CN':'US',ceid:region==='cn'?'CN:zh-Hans':'US:en'});
    const feed={name:(region==='cn'?'中文':'英文')+'新闻 · '+category,region,category,url:u.href};
    try{let articles=[];for(let attempt=0;attempt<3;attempt++){try{const r=await fetch(u,{signal:AbortSignal.timeout(18000),headers:{'Accept':'application/rss+xml, application/xml','User-Agent':'Mozilla/5.0'}});if(!r.ok)throw new Error('HTTP '+r.status);articles=parseRss(await r.text(),feed);if(articles.length)break;}catch(e){if(attempt===2)throw e;await new Promise(r=>setTimeout(r,1500*(attempt+1)));}}
      return {articles,status:{name:feed.name,state:'ok',count:articles.length,url:feed.url,transport:'独立采集服务 · Google News RSS'}};
    }catch(e){return {articles:[],status:{name:feed.name,state:'error',message:e.message,url:feed.url}};}
  }));
  const articles=results.flatMap(r=>r.articles),selected=clusterStories(articles,{days,count:days===3?7:15});
  if(selected.events.length<(days===3?7:15)){
    if(prior?.windows?.[days]){windows[days]={...prior.windows[days],lastAttemptAt:new Date().toISOString(),lastAttemptFailed:true};console.log('Window',days,'retained previous data; only',selected.events.length,'events found');continue;}
    throw new Error('Window '+days+' lacks enough verified candidates: '+selected.events.length);
  }
  windows[days]={articles,sources:results.map(r=>r.status),collectedAt:new Date().toISOString(),lastAttemptFailed:false};console.log('Window',days,articles.length,'articles;',selected.events.length,'selected events');
}
await mkdir('data',{recursive:true});await writeFile('data/latest.json',JSON.stringify({version:1,updatedAt:new Date().toISOString(),windows}));
