---
title: 🎉 easy-live2d v0.2.1 发布啦！ 增加了语音 以及 口型同步功能，现在你的Live2D角色 可以在web里说话了
date: "2025-05-19 10:00:00"
tags:
    - live2d
    - 项目
---

![在这里插入图片描述](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/6da181d9185e4e7d809054f40b63e642~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAgUGFuemVyX0phY2s=:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiMTgzNDQ0Nzc0MDg2NjIxNSJ9&rk3s=f64ab15b&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1772434832&x-orig-sign=zYEH0plxp3K1qpIXqBH6oRrOxsI%3D)

🎉 easy-live2d v0.2.1 发布啦！
📢 全新版本带来了超强口型同步功能！现在你的Live2D角色可以跟着声音栩栩如生地说话了\~

![在这里插入图片描述](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/8344a7d628c1429b827eee24e4ef5725~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAgUGFuemVyX0phY2s=:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiMTgzNDQ0Nzc0MDg2NjIxNSJ9&rk3s=f64ab15b&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1772434832&x-orig-sign=tiPrMXWtUd3bnwbStI5Iayv1COs%3D)

🔥 特性亮点：
实时语音控制以及音频口型同步，让角色表情更生动
修复了若干已知BUG
💻 无论你是VTuber还是想给网站添加交互式角色，easy-live2d都能让你轻松实现！

👉 立即体验：[stackblitz](https://stackblitz.com/~/github.com/Panzer-Jack/easy-live2d-playground?file=src/App.vue)

---

## 📖 官方仓库&文档

👉 [easy-live2d Github 仓库](https://github.com/Panzer-Jack/easy-live2d)

👉 [easy-live2d 官方文档](https://panzer-jack.github.io/easy-live2d)

---

## New Feature: 角色说话（口型同步）

![在这里插入图片描述](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/9fc064c945fa4bf3a143aed52382598e~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAgUGFuemVyX0phY2s=:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiMTgzNDQ0Nzc0MDg2NjIxNSJ9&rk3s=f64ab15b&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1772434832&x-orig-sign=o%2FTTzjI2nqSv3KRSTMo%2BQJn3OlU%3D)

当前音嘴同步 仅支持wav格式

首先确保live2d模型已设置 MouthMovement，没有参考下面方法

### 前置方法1:

在Live2D模型编辑器 中开启口型同步 设置 MouthMovement

这里方法可以参看 [官方文档](https://docs.live2d.com/zh-CHS/cubism-sdk-tutorials/lipsync-cocos/)

### 前置方法2:

在模型的 xx.model3.json 中 找到 “Groups” 中 那个`"Name": "LipSync"`的部分，添加：`"Ids":"ParamMouthOpenY"`, 参考如下

```javascript
{
"Version": 3,
"FileReferences": {
  "Moc": "xx.moc3",
  "Textures": [
    "xx.2048/texture_00.png"
  ],
  "Physics": "xx.physics3.json",
  "DisplayInfo": "xx.cdi3.json",
  "Motions": {
    "test": [],
    "idle": []
  },
  "Expressions": []
},
"Groups": [
  {
    "Target": "Parameter",
    "Name": "EyeBlink",
    "Ids": []
  },
  {
    "Target": "Parameter",
    "Name": "LipSync",
    "Ids": [
      "ParamMouthOpenY"
    ]
  }
],
"HitAreas": []
}
```

### 角色说话

```javascript
// 播放声音
live2DSprite.playVoice({
  // 当前音嘴同步 仅支持wav格式
  voicePath: '/Resources/Huusya/voice/test.wav',
})

// 停止声音
// live2DSprite.stopVoice()

setTimeout(() => {
  // 播放声音
  live2DSprite.playVoice({
    voicePath: '/Resources/Huusya/voice/test.wav',
    immediate: true // 是否立即播放: 默认为true，会把当前正在播放的声音停止并立即播放新的声音
  })
}, 10000)
```
