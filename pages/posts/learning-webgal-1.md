---
title: 如何用 WebGL 去实现一个图片背景透明化小工具
date: "2026-02-25 21:13:14"
tags:
    - 前端学习
    - webgl
cover: https://pic.imgdb.cn/item/63770c5416f2c2beb107d59f.png
draft: true
---

## 先简要介绍一下 WebGL

当今大多数主流浏览器存在2个 WebGL 版本: `WebGL 1.0`（基于 OpenGL ES2.0）、`WebGL 2.0`（基于 OpenGL ES3.0）

```ts
const canvas = document.createElement('canvas');
const gl = canvas.getContext('webgl')
const gl2 = canvas.getContext('webgl2')
```

在 WebGL 中，所有的绘制操作都是通过着色器（Shader）来完成的。着色器是一段运行在 GPU 上的小程序，并且为一对函数的形式组成：

- `顶点着色器（Vertex Shader）`：负责处理每个顶点的数据，进行变换和投影等操作。

- `片段着色器（Fragment Shader）`：负责处理每个片段（像素）的数据，进行颜色计算和纹理采样等操作。

其组合又称为`程序（Program）`，而程序中的着色器会在 GPU 上对每个顶点/片元并行执行，这也是 WebGL 能够实现高性能图形渲染的原因之一。你可以想象如果是 CPU 处理，它只有少量核心，并且在Web场景上以单核心面对数百万个像素逐个计算，而 GPU 拥有成百上千个核心，可以同时处理大量像素，效率自然天差地别。

在 WebGL 中，顶点着色器和片段着色器都是用 GLSL（OpenGL Shading Language）编写的。GLSL 是一种专门为图形编程设计的语言，具有类似于 C 语言的语法结构。我这边以WebGL 2.0为例，来展示一下最基本的着色器代码示例：

顶点着色器（Vertex Shader）示例：

```glsl
// 这里的 #version 300 es 是告诉编译器我们使用的是 WebGL 2.0 的 GLSL 版本
#version 300 es
// 声明输入变量 a_position，类型为 vec4（4维向量），表示顶点的位置
in vec4 a_position;

void main() {
  // 将输入的顶点位置直接赋值给内置变量 gl_Position，表示最终的顶点位置
  gl_Position = a_position;
}
```

片段着色器示例：

```glsl

```

## 代码实践

## 参考链接

1. https://webgl2fundamentals.org/webgl/lessons/zh_cn/webgl-fundamentals.html

2. https://messiahhh.github.io/blog/docs/canvas/webgl
