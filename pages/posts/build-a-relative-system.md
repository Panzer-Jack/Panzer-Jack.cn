---
title: 如何实现一个 Vue3 贫民版的响应式系统？
date: "2023-10-02 13:23:12"
tags:
    - Vue
    - 源码解析系列
---

### 核心实现：

1. reactive 函数：
   - 闭包返回Proxy
   - Get 收集依赖 （收集副作用函数）
   - Set 触发依赖 （遍历执行相关依赖的所有副作用函数）

2. 注册副作用 函数

3. 副作用函数桶 架构：
   - WeakMap 桶分装 各个响应式对象 depMap
   - depMap 装 各个响应式对象的属性副作用函数集 depSet
   - depSet 装 副作用函数

```javascript
// 副作用函数 - 哈希桶
// WeakMap[obj] -> Map[key] = set(fn, fn, ...)
const bucket = new WeakMap()
// 当前执行的副作用函数
let activeEffect = null

// 注册副作用函数
function effect(fn) {
    if (typeof fn !== 'function') return;
    activeEffect = fn
    fn()
    activeEffect = null
}

// 收集依赖
function track(target, key) {
    if (!activeEffect) return

    let depMap = bucket.get(target)
    if (!depMap) {
        depMap = new Map()
        bucket.set(target, depMap)
    }
    let depSet = depMap.get(key)
    if (!depSet) {
        depSet = new Set()
        bucket.get(target).set(key, depSet)
    }
    depSet.add(activeEffect)
}

// 触发依赖
function trigger(target, key) {
    bucket.get(target).get(key).forEach(fn => fn())
}

// 创建响应式数据
function reactive(obj) {
    if (typeof obj !== 'object' || obj === null) return;
    return new Proxy(obj, {
        get(target, key) {
            track(target, key)
            return target[key]
        },
        set(target, key, value) {
            target[key] = value
            trigger(target, key)
            return true
        }
    })
}
```
