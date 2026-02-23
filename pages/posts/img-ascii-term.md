---
title: 【img-ascii-term】在nodejs中一键将图片转换为彩色或黑白的 ASCII 字符画，只需一个 console.log 就能在终端展示
date: "2026-01-20 10:00:00"
tags:
    - LLM
    - MCP
    - 项目
---

> 【img-ascii-term】🎉 在nodejs中一键将图片转换为彩色或黑白的 ASCII 字符画，只需一个 console.log 就能在终端展示. 😋 搭配 AI 生图，轻松生成独特 logo，快速嵌入你的项目或 CLI！
> ![image.png](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/60b16fdb255d46d1b30663926c6b712f~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAgUGFuemVyX0phY2s=:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiMTgzNDQ0Nzc0MDg2NjIxNSJ9&rk3s=f64ab15b&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1772435021&x-orig-sign=SmkA%2B6UBeF0rPtqJNJpD2aqUvhY%3D)

## 🚀 仓库

[Github 仓库](https://github.com/Panzer-Jack/img-ascii-term)

## 📖 文档

## 功能特色

- 将图片转换为可在任意终端打印的 ASCII 字符串
- 通过 `chalk` 实现真彩色输出，可选择关闭彩色
- 保持图片宽高比例，支持自定义输出宽度和字符集
- 支持常见格式：jpg、jpeg、png等
- 以 ESM 包形式发布，适用于支持 `import` 的 Node.js 环境

![image.png](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/c8185d63efe84d7181e4377122b9cdc3~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAgUGFuemVyX0phY2s=:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiMTgzNDQ0Nzc0MDg2NjIxNSJ9&rk3s=f64ab15b&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1772435021&x-orig-sign=GGwzTaKgOYRuOx1rLDPA8pMxef8%3D)

## 环境要求

- Node.js 22 或更高版本

## 安装方法

安装运行时依赖（canvas 为原生依赖，请保留在 dependencies）：

```shell
npm install canvas img-ascii-term
```

## 快速上手

```ts
import { convertImageToAscii } from 'img-ascii-term'

const ascii = await convertImageToAscii('./logo.png', {
    width: 120,
    colored: true,
    charset: ' .:-=+*#%@',
})

console.log(ascii)
```

## API 说明

```ts
convertImageToAscii(imagePath: string, options?: ConvertImageOptions): Promise<string>
```

将图片文件转换为 ASCII 艺术字符串。如果文件不存在或格式不支持会抛出异常。

#### `ConvertImageOptions`

- `width` (number)：输出字符宽度，默认值为 `80`
- `colored` (boolean)：启用真彩色输出，默认值为 `true`
- `charset` (string)：从浅到深排列的字符集，默认值为 `' .:-=+*#%@'`

## Playground

使用内置示例在终端预览效果：

```bash
pnpm install
pnpm start
```

这会构建包并运行 [index.js]()，将 `playground/ciallo.png` 转换为 ASCII。可在此修改图片路径或参数进行实验。

## 开发相关

- `pnpm dev` — 监听模式下构建
- `pnpm build` — 生成 ESM 格式输出到 [dist]()
- `pnpm typecheck` — 仅运行 TypeScript 类型检查
- `pnpm start` — 构建并运行 playground 示例
