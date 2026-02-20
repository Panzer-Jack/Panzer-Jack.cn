---
title: 如何实现一个mini-Redux
date: "2024-02-06 23:37:06"
tags:
    - React
    - 源码解析系列
---

这里取最简原则, 使用JS来实现

这里展示的是 Redux核心原理部分。

主要以三个核心函数组成：`createStore`、`combineReducers`、`applyMiddleware`

## 首先先展示一下 Redux 的正常使用案例 以及可以方便之后用自定义的mini-Redux 来测试效果

```js
// 测试效果用的 & Redux 的正常使用案例

import Redux from './package/index.js'
const { createStore, combineReducers, applyMiddleware } = Redux

const initState = {
    milk: 1
}

function reducer(state = initState, action) {
    switch (action.type) {
        case 'PUT':
            return { ...state, milk: state.milk + action.count }
        case 'Get':
            return { ...state, milk: state.milk - action.count }
        default:
            return state
    }
}

// 自定义的中间件
function logger(store) {
    return function (next) {
        return function (action) {
            console.log(next)
            console.log(store.getState())
            let res = next(action)
            console.log(store.getState())
            return res
        }
    }
}

const reducer2 = combineReducers({ milkState: reducer, ccState: reducer })
const store = createStore(reducer2, applyMiddleware(logger))
console.dir(store.getState())
store.subscribe(() => console.log(store.getState()))
store.dispatch({type: 'PUT', count: 5})

```

## 好！现在来实现一下 mini-Redux

```js
// 添加中间件
// 这里核心是使用了 装饰器模式 来让自己创建的中间件可以包装到dispatch函数
function applyMiddleware(middleware) {
    function enhancer(createStore) {
        function newCreateStore(reducer) {
            const store = createStore(reducer)
            const func = middleware(store)
            const { dispatch } = store
            const newDispatch = func(dispatch)
            return { ...store, dispatch: newDispatch }
        }
        return newCreateStore
    }
    return enhancer
}

// 合并多个reducer
function combineReducers(reducerMap) {
    // 得到reducerMap 对象的key值列表
    const reducerKeys = Object.keys(reducerMap)
    // 返回值是一个普通结构的 reducer 函数
    const reducer = (state = {}, action) => {
        const newState = {}
        reducerKeys.map((key) => {
            // 通过key 来获取到 当前访问的reducer
            const currentReducer = reducerMap[key]
            // 将先前的state取出来
            const prevState = state[key]
            // 这里可以对应着reducer传入的 state 和 action参数
            // 并将其reducer的key 作为一个更大的对象的一个key
            newState[key] = currentReducer(prevState, action)
        })
        // 返回 新的 state
        return newState
    }
    return reducer
}

// 核心思想是 闭包 + 发布订阅者模式
export default function createStore(reducer, storeEnhancer) {
    if (storeEnhancer) {
        return storeEnhancer(createStore)(reducer)
    }

    // 保存全局的state
    let currentState
    // 保存监听的事件
    const listeners = []
    // dispatch状态
    let isDispatching = false

    // 订阅函数
    function subscribe(callback) {
        // 将订阅函数放入监听器
        listeners.push(callback)
    }

    // 执行函数
    function dispatch(action) {
        try {
            isDispatching = true
            currentState = reducer(currentState, action)
        } finally {
            isDispatching = false
        }
        // 遍历执行监听器中订阅函数
        listeners.forEach(callback => callback())
    }

    // 访问函数
    function getState(stateName) {
        if (stateName)
            return currentState[stateName]
        else
            return currentState
    }

    // 第一次执行时，初始化仓库，将reducer中的state存入仓库的currentState遍历中
    dispatch({ type: ActionTypes.INIT })

    // 返回API
    const store = {
        subscribe,
        dispatch,
        getState
    }
    return store
}
```
