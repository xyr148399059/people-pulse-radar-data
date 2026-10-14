# People Pulse Radar — public news collector

人物雷达的公开新闻采集服务。通过 Google News 中英文公开 RSS 收集近3天和7天的标题、出处和发布时间，不存储新闻正文、账号或密钥。

GitHub Actions 每小时采集一次，也支持手动运行。定时运行可能受 GitHub 队列影响。数据位于 data/latest.json，包含各时间窗的采集时间与来源状态。失败时保留上次成功记录及其原采集时间。

```sh
node collect.mjs
```

这是公开新闻样本，不是全网完整排名。网页按报道发布时间重新筛选，事件真实性、相关视频与事件发生时间请查看原文。
