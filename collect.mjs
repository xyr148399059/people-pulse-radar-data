import {parseRss,clusterStories} from './lib/news.js';
import {BRAND_FEEDS} from './lib/brands.js';
import {readFile,writeFile,mkdir} from 'node:fs/promises';
const personSpecs=[['cn','文娱','演员 OR 歌手 OR 导演 OR 艺人'],['cn','体育','运动员 OR 孙颖莎 OR 郑钦文 OR 潘展乐 OR 全红婵 OR 樊振东'],['cn','科技商业','雷军 OR 董明珠 OR 马云 OR 梁文锋 OR 任正非 OR 余承东'],['cn','公共人物','人物 采访 OR 名人 事件 OR 科学家 获奖'],['global','文娱','celebrity OR actor OR singer OR director'],['global','体育','athlete OR Messi OR Ronaldo OR Ohtani OR Alcaraz'],['global','科技商业','Musk OR Altman OR Huang OR Zuckerberg OR Bezos'],['global','公共人物','Trump OR Macron OR Putin OR Starmer OR Takaichi']];
let prior;try{prior=JSON.parse(await readFile('data/latest.json','utf8'));}catch{}
const snapshot={version:1,windows:{},brandWindows:{}};
for(const type of ['person','brand'])for(const days of [3,7]){
 const specs=type==='brand'?BRAND_FEEDS:personSpecs,windowKey=type==='brand'?'brandWindows':'windows',count=type==='brand'?(days===3?5:10):(days===3?7:15);
 const results=await Promise.all(specs.map(async([region,category,q])=>{
  const u=new URL('https://news.google.com/rss/search');u.search=new URLSearchParams({q:'('+q+') when:'+days+'d',hl:region==='cn'?'zh-CN':'en-US',gl:region==='cn'?'CN':'US',ceid:region==='cn'?'CN:zh-Hans':'US:en'});
  const feed={name:(region==='cn'?'中文':'英文')+(type==='brand'?'品牌新闻 · ':'新闻 · ')+category,region,category,url:u.href};
  try{let articles=[];for(let attempt=0;attempt<3;attempt++){try{const r=await fetch(u,{signal:AbortSignal.timeout(18000),headers:{Accept:'application/rss+xml, application/xml','User-Agent':'Mozilla/5.0'}});if(!r.ok)throw new Error('HTTP '+r.status);articles=parseRss(await r.text(),feed);if(articles.length)break;}catch(e){if(attempt===2)throw e;await new Promise(r=>setTimeout(r,1500*(attempt+1)));}}
   return {articles,status:{name:feed.name,state:'ok',count:articles.length,url:feed.url,transport:'独立采集服务 · Google News RSS'}};
  }catch(e){return {articles:[],status:{name:feed.name,state:'error',message:e.message,url:feed.url}};}
 }));
 const articles=results.flatMap(r=>r.articles),selected=clusterStories([...articles],{days,count,type});
 if(!articles.length){const previous=prior?.[windowKey]?.[days];if(previous){snapshot[windowKey][days]={...previous,lastAttemptAt:new Date().toISOString(),lastAttemptFailed:true};console.log(type,days,'retained previous data: all sources failed');continue;}throw new Error(type+' '+days+': no sources available');}
 snapshot[windowKey][days]={articles,sources:results.map(r=>r.status),collectedAt:new Date().toISOString(),lastAttemptFailed:false};console.log(type,days,articles.length,'articles;',selected.events.length+'/'+count,'selected events');
}
snapshot.updatedAt=new Date().toISOString();await mkdir('data',{recursive:true});await writeFile('data/latest.json',JSON.stringify(snapshot));
