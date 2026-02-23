---
title: easy-live2d：让你的 Live2D 和操控 pixi sprite 一样简单！基于 Pixi.js 封装的 轻量级 Live2D Web SDK
date: "2025-05-05 10:00:00"
tags:
    - live2d
    - 项目
---

![在这里插入图片描述](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/9974f1ba60394f469f491268ff09eba1~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAgUGFuemVyX0phY2s=:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiMTgzNDQ0Nzc0MDg2NjIxNSJ9&rk3s=f64ab15b&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1772434726&x-orig-sign=HOKCya%2FQE2pdMS3PacjDfv9ZuJ8%3D)

让 Live2D 集成更简单！一个基于 Pixi.js 轻量、开发者友好的 Live2D Web SDK 封装库。

让你的 Live2D 和操控 pixi sprite 一样简单！

你能够直接用这个 云IDE [StackBlitz](https://stackblitz.com/~/github.com/Panzer-Jack/easy-live2d-playground) 在你的浏览器上直接体验到 easy-live2d 的魅力！😋
![StackBlitz](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/2f97715a513b4b4aa7f374e55cbb38f2~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAgUGFuemVyX0phY2s=:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiMTgzNDQ0Nzc0MDg2NjIxNSJ9&rk3s=f64ab15b&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1772434726&x-orig-sign=L0n1AVRhTfA2BVZMx6epvEHdjL4%3D)

---

## 📖 官方仓库&文档

👉 [easy-live2d Github 仓库](https://github.com/Panzer-Jack/easy-live2d)

👉 [easy-live2d 官方文档](https://panzer-jack.github.io/easy-live2d)

---

## ✨ 特性

- ⚡️ 支持 Pixi.js v8 和 Cubism 5 （ 均为当前最新版本 ）
- 🌟 极致轻量，去除冗余功能
- 🚀 更简单的 API 接口
- 🛠️ 兼容官方 Live2D Web SDK
- 📦 适配现代前端框架（如 Vue、React）

---

## ⛵️ 面向贡献开发者

由于Live2D政策 你需要自行去Live2d Cubism 官网下载: [Live2D Cubism SDK for Web](https://www.live2d.com/zh-CHS/sdk/download/web/)
并将其 Core目录 放入 /packages/cubism 目录下

---

## 📦 安装

```bash
pnpm add easy-live2d
# 或者
npm install easy-live2d
# 或
yarn add easy-live2d
```

---

## 🛠️ 快速上手

具体也可以参考 [StackBlitz](https://stackblitz.com/~/github.com/Panzer-Jack/easy-live2d-playground) 云IDE 中的代码

一定请在 index.html 中引入 Cubism Core：
你直接去Live2d Cubism 官网下载: [Live2D Cubism SDK for Web](https://www.live2d.com/zh-CHS/sdk/download/web/)

原生HTML

```html
<!doctype html>
<html lang="">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" href="/favicon.ico" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Vite App</title>
    <style>
      html,
      body {
        overflow: hidden;
        margin: 0;
      }
    </style>
  </head>

  <body>
    <div id="app"></div>
    <script src="/Core/live2dcubismcore.js"></script>
    <script type="module">
      import { Application, Ticker } from 'pixi.js';
      import { Live2DSprite, Config, Priority } from 'easy-live2d';

      // Configure basic settings
      Config.MotionGroupIdle = 'Idle'; // Set default idle motion group
      Config.MouseFollow = false; // Disable mouse following
      // Create Live2D sprite
      const live2dSprite = new Live2DSprite();
      live2dSprite.init({
        modelPath: '/Resources/Hiyori/Hiyori.model3.json',
        ticker: Ticker.shared
      });

      const init = async () => {
        // Create application
        const app = new Application();
        await app.init({
          view: document.getElementById('live2d'),
          backgroundAlpha: 0, // Set alpha to 0 for transparency if needed
        });
        // Live2D sprite size
        live2DSprite.width = canvasRef.value.clientWidth * window.devicePixelRatio
        live2DSprite.height = canvasRef.value.clientHeight * window.devicePixelRatio
        // Add to stage
        app.stage.addChild(live2dSprite);
        console.log('easy-live2d initialized successfully!');
      }
      init()
    </script>
  </body>
</html>
```

Vue3 演示：（请注意一定要在index.html入口引入Cubism Core哦）

```vue
<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import { Config, Live2DSprite, LogLevel, Priority } from 'easy-live2d'
import { Application, Ticker } from 'pixi.js'
import { initDevtools } from '@pixi/devtools'

const canvasRef = ref<HTMLCanvasElement>()
const app = new Application()

// 设置 Config 默认配置
Config.MotionGroupIdle = 'Idle' // 设置默认的空闲动作组
Config.MouseFollow = false // 禁用鼠标跟随
Config.CubismLoggingLevel = LogLevel.LogLevel_Off // 设置日志级别

// 创建Live2D精灵 并初始化
const live2DSprite = new Live2DSprite()
live2DSprite.init({
  modelPath: '/Resources/Hiyori/Hiyori.model3.json',
  ticker: Ticker.shared
});

// 监听点击事件
live2DSprite.onLive2D('hit', ({ hitAreaName, x, y }) => {
  console.log('hit', hitAreaName, x, y);
})

// 你也可以直接这样初始化
// const live2DSprite = new Live2DSprite({
//   modelPath: '/Resources/Huusya/Huusya.model3.json',
//   ticker: Ticker.shared
// })

onMounted(async () => {
  await app.init({
    view: canvasRef.value,
    backgroundAlpha: 0, // 如果需要透明，可以设置alpha为0
  })
  if (canvasRef.value) {

    // Live2D精灵大小坐标设置
    live2DSprite.x = -300
    live2DSprite.y = -300
    live2DSprite.width = canvasRef.value.clientWidth * window.devicePixelRatio
    live2DSprite.height = canvasRef.value.clientHeight * window.devicePixelRatio
    app.stage.addChild(live2DSprite);

    // 设置表情
    live2DSprite.setExpression({
      expressionId: 'normal',
    })

    // 设置动作
    live2DSprite.startMotion({
      group: 'test',
      no: 0,
      priority: 3,
    })
  }
})

onUnmounted(() => {
  // 释放实例
  live2DSprite.destroy()
})

</script>

<template>
  <div class="test">
  </div>
  <canvas
    ref="canvasRef"
    id="live2d"
  />
</template>

<style>
#live2d {
  position: absolute;
  top: 0%;
  right: 0%;
  width: 100%;
  height: 100%;
}

.test {
  display: inline-block;
  position: absolute;
  width: 100%;
  height: 70%;
  background-color: pink;
}
</style>

```
