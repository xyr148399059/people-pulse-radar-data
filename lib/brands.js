// Canonical brand names and aliases, shared by the site and hourly collector.
export const BRAND_CATEGORIES=['数码科技','汽车出行','餐饮消费','美妆时尚','零售电商','文娱平台'];
const groups=[
 ['数码科技','cn',[
  ['华为','Huawei','华为|Huawei'],['小米','Xiaomi','小米|Xiaomi|Redmi|红米'],['荣耀','Honor','荣耀手机|荣耀Magic|荣耀发布|荣耀品牌|HONOR'],['OPPO','OPPO','OPPO'],['vivo','vivo','vivo|iQOO'],['大疆','DJI','大疆|DJI'],['联想','Lenovo','联想|Lenovo']]],
 ['数码科技','global',[
  ['苹果','Apple','苹果|Apple|iPhone|MacBook|iPad'],['三星','Samsung','三星|Samsung|Galaxy'],['英伟达','NVIDIA','英伟达|NVIDIA|Nvidia'],['微软','Microsoft','微软|Microsoft|Xbox'],['谷歌','Google','谷歌|Google|Gemini|Pixel'],['OpenAI','OpenAI','OpenAI|ChatGPT'],['Anthropic','Anthropic','Anthropic|Claude'],['Meta','Meta','Meta|Facebook|Instagram|WhatsApp'],['索尼','Sony','索尼|Sony|PlayStation'],['任天堂','Nintendo','任天堂|Nintendo']]],
 ['汽车出行','cn',[
  ['比亚迪','BYD','比亚迪|BYD'],['理想汽车','Li Auto','理想汽车|理想MEGA|理想L6|理想L7|理想L8|理想L9|Li Auto'],['蔚来','NIO','蔚来|NIO'],['小鹏','XPeng','小鹏|XPeng|Xpeng'],['吉利','Geely','吉利|Geely|极氪|ZEEKR'],['零跑','Leapmotor','零跑|Leapmotor']]],
 ['汽车出行','global',[
  ['特斯拉','Tesla','特斯拉|Tesla'],['丰田','Toyota','丰田|Toyota|雷克萨斯|Lexus'],['奔驰','Mercedes-Benz','奔驰|Mercedes-Benz|Mercedes Benz'],['宝马','BMW','宝马|BMW'],['大众','Volkswagen','大众汽车|Volkswagen'],['保时捷','Porsche','保时捷|Porsche'],['福特','Ford','福特|Ford']]],
 ['餐饮消费','cn',[
  ['瑞幸咖啡','Luckin Coffee','瑞幸|Luckin'],['蜜雪冰城','Mixue','蜜雪冰城|Mixue'],['喜茶','HEYTEA','喜茶|HEYTEA'],['奈雪的茶','Nayuki','奈雪|Nayuki'],['霸王茶姬','CHAGEE','霸王茶姬|CHAGEE'],['农夫山泉','Nongfu Spring','农夫山泉|Nongfu Spring']]],
 ['餐饮消费','global',[
  ['星巴克','Starbucks','星巴克|Starbucks'],['麦当劳','McDonalds','麦当劳|McDonald\'s|McDonalds|McDonald’s'],['肯德基','KFC','肯德基|KFC'],['可口可乐','Coca-Cola','可口可乐|Coca-Cola|Coca Cola'],['百事','Pepsi','百事|Pepsi']]],
 ['美妆时尚','cn',[
  ['安踏','ANTA','安踏|ANTA'],['李宁','Li-Ning','李宁品牌|李宁公司|李宁集团|李宁发布|李宁联名|李宁新款|李宁运动|Li-Ning|Li Ning'],['珀莱雅','Proya','珀莱雅|Proya']]],
 ['美妆时尚','global',[
  ['优衣库','Uniqlo','优衣库|Uniqlo'],['耐克','Nike','耐克|Nike'],['阿迪达斯','Adidas','阿迪达斯|Adidas'],['迪奥','Dior','迪奥|Dior'],['香奈儿','Chanel','香奈儿|Chanel'],['路易威登','Louis Vuitton','路易威登|Louis Vuitton'],['巴黎世家','Balenciaga','巴黎世家|Balenciaga'],['欧莱雅','LOreal','欧莱雅|L’Oreal|L’Oréal|L\'Oreal|L\'Oréal|LOreal'],['丝芙兰','Sephora','丝芙兰|Sephora']]],
 ['零售电商','cn',[
  ['泡泡玛特','POP MART','泡泡玛特|POP MART|Labubu'],['名创优品','MINISO','名创优品|MINISO'],['淘宝','Taobao','淘宝|Taobao|天猫|Tmall'],['京东','JD.com','京东|JD.com'],['拼多多','PDD','拼多多|Pinduoduo|PDD|Temu'],['美团','Meituan','美团|Meituan']]],
 ['零售电商','global',[
  ['亚马逊','Amazon','亚马逊|Amazon'],['宜家','IKEA','宜家|IKEA']]],
 ['文娱平台','cn',[
  ['抖音','Douyin','抖音|Douyin|TikTok'],['小红书','Xiaohongshu','小红书|Xiaohongshu|RedNote'],['哔哩哔哩','Bilibili','哔哩哔哩|Bilibili|B站'],['腾讯','Tencent','腾讯|Tencent|微信|WeChat'],['网易','NetEase','网易|NetEase']]],
 ['文娱平台','global',[
  ['Netflix','Netflix','Netflix|奈飞'],['迪士尼','Disney','迪士尼|Disney']]]
];
export const BRANDS=groups.flatMap(([category,region,items])=>items.map(([name,englishName,aliases])=>({name,englishName,aliases:aliases.split('|'),region,category})));
const brandAliases=BRANDS.flatMap(b=>b.aliases.map(alias=>({...b,alias}))).sort((a,b)=>b.alias.length-a.alias.length);
export function brandFor(title){
 const lower=title.toLowerCase(),matches=[];
 for(const b of brandAliases){const pos=lower.indexOf(b.alias.toLowerCase());if(pos<0)continue;
  if(/[a-z]/i.test(b.alias)&&((pos&&/[a-z0-9]/i.test(title[pos-1]))||/[a-z0-9]/i.test(title[pos+b.alias.length]||'')))continue;
  if(b.name==='苹果'&&/apple pie|apple cider|apple harvest|苹果(?:种植|采摘|树|汁|产量|丰收)/i.test(title)&&!/iphone|ipad|macbook|apple watch/i.test(title))continue;
  if(b.name==='Meta'&&/meta[- ]analysis|meta[- ]analytic/i.test(title))continue;
  if(b.name==='亚马逊'&&/amazon rain(?:forest)?|亚马逊(?:雨林|河流)/i.test(title))continue;
  if(b.name==='福特'&&/Harrison Ford|Gerald Ford/i.test(title))continue;
  matches.push({...b,position:pos});
 }
 const b=matches.sort((a,b)=>a.position-b.position||b.alias.length-a.alias.length)[0];
 return b?{person:b.name,en:b.englishName,region:b.region,category:b.category,entityType:'brand'}:null;
}
export const BRAND_FEEDS=[
 ['cn','数码科技','华为 OR 小米 OR 荣耀 OR OPPO OR vivo OR 大疆 OR 联想'],
 ['cn','汽车出行','比亚迪 OR 理想汽车 OR 蔚来 OR 小鹏 OR 吉利 OR 零跑'],
 ['cn','餐饮消费','瑞幸 OR 蜜雪冰城 OR 喜茶 OR 奈雪 OR 霸王茶姬 OR 农夫山泉'],
 ['cn','美妆时尚','安踏 OR 李宁品牌 OR 珀莱雅 OR 品牌联名'],
 ['cn','零售电商','泡泡玛特 OR 名创优品 OR 淘宝 OR 京东 OR 拼多多 OR 美团'],
 ['cn','文娱平台','抖音 OR 小红书 OR 哔哩哔哩 OR 腾讯 OR 网易'],
 ['global','数码科技','Apple OR Samsung OR Microsoft OR Google OR NVIDIA OR OpenAI OR Anthropic OR Sony OR Nintendo'],
 ['global','汽车出行','Tesla OR Toyota OR BMW OR Volkswagen OR Porsche OR Ford'],
 ['global','餐饮消费','Starbucks OR McDonalds OR KFC OR Coca-Cola OR Pepsi'],
 ['global','美妆时尚','Nike OR Adidas OR Uniqlo OR Chanel OR Dior OR Louis Vuitton OR LOreal'],
 ['global','零售电商','Amazon OR IKEA OR MINISO OR POP MART'],
 ['global','文娱平台','Netflix OR Disney OR Meta OR TikTok']
];
