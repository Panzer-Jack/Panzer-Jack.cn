---
title: 阿库娅都能看懂的Zustand源码解读（bushi
date: "2024-02-07 1:49:16"
tags:
    - React
    - 源码解析系列
top_img: https://pic.imgdb.cn/item/65c26d409f345e8d033510d0.jpg
---

## 先贴两个核心源码文件

可以先大致扫描一眼Zustand官方仓库的源码：https://github.com/pmndrs/zustand/blob/main/src

### vanilla.ts

```ts
// vanilla.ts
const createStoreImpl: CreateStoreImpl = (createState) => {
  type TState = ReturnType<typeof createState>
  type Listener = (state: TState, prevState: TState) => void
  let state: TState
  const listeners: Set<Listener> = new Set()

  const setState: StoreApi<TState>['setState'] = (partial, replace) => {
    // TODO: Remove type assertion once https://github.com/microsoft/TypeScript/issues/37663 is resolved
    // https://github.com/microsoft/TypeScript/issues/37663#issuecomment-759728342
    const nextState
      = typeof partial === 'function'
        ? (partial as (state: TState) => TState)(state)
        : partial
    if (!Object.is(nextState, state)) {
      const previousState = state
      state
        = replace ?? (typeof nextState !== 'object' || nextState === null)
          ? (nextState as TState)
          : Object.assign({}, state, nextState)
      listeners.forEach(listener => listener(state, previousState))
    }
  }

  const getState: StoreApi<TState>['getState'] = () => state

  const getInitialState: StoreApi<TState>['getInitialState'] = () =>
    initialState

  const subscribe: StoreApi<TState>['subscribe'] = (listener) => {
    listeners.add(listener)
    // Unsubscribe
    return () => listeners.delete(listener)
  }

  const destroy: StoreApi<TState>['destroy'] = () => {
    if (import.meta.env?.MODE !== 'production') {
      console.warn(
        '[DEPRECATED] The `destroy` method will be unsupported in a future version. Instead use unsubscribe function returned by subscribe. Everything will be garbage-collected if store is garbage-collected.',
      )
    }
    listeners.clear()
  }

  const api = { setState, getState, getInitialState, subscribe, destroy }
  const initialState = (state = createState(setState, getState, api))
  return api as any
}

export const createStore = (createState =>
  createState ? createStoreImpl(createState) : createStoreImpl) as CreateStore
```

### react.ts

```ts
// react.ts
export function useStore<TState, StateSlice>(
  api: WithReact<StoreApi<TState>>,
  selector: (state: TState) => StateSlice = identity as any,
  equalityFn?: (a: StateSlice, b: StateSlice) => boolean,
) {
  if (
    import.meta.env?.MODE !== 'production'
      && equalityFn
      && !didWarnAboutEqualityFn
  ) {
    console.warn(
      '[DEPRECATED] Use `createWithEqualityFn` instead of `create` or use `useStoreWithEqualityFn` instead of `useStore`. They can be imported from \'zustand/traditional\'. https://github.com/pmndrs/zustand/discussions/1937',
    )
    didWarnAboutEqualityFn = true
  }
  const slice = useSyncExternalStoreWithSelector(
    api.subscribe,
    api.getState,
    api.getServerState || api.getInitialState,
    selector,
    equalityFn,
  )
  useDebugValue(slice)
  return slice
}

export type UseBoundStore<S extends WithReact<ReadonlyStoreApi<unknown>>> = {
  (): ExtractState<S>
  <U>(selector: (state: ExtractState<S>) => U): U
  /**
   * @deprecated Use `createWithEqualityFn` from 'zustand/traditional'
   */
  <U>(
    selector: (state: ExtractState<S>) => U,
    equalityFn: (a: U, b: U) => boolean,
  ): U
} & S

interface Create {
  <T, Mos extends [StoreMutatorIdentifier, unknown][] = []>(
    initializer: StateCreator<T, [], Mos>,
  ): UseBoundStore<Mutate<StoreApi<T>, Mos>>
  <T>(): <Mos extends [StoreMutatorIdentifier, unknown][] = []>(
    initializer: StateCreator<T, [], Mos>,
  ) => UseBoundStore<Mutate<StoreApi<T>, Mos>>
  /**
   * @deprecated Use `useStore` hook to bind store
   */
  <S extends StoreApi<unknown>>(store: S): UseBoundStore<S>
}

const createImpl = <T>(createState: StateCreator<T, [], []>) => {
  if (
    import.meta.env?.MODE !== 'production'
      && typeof createState !== 'function'
  ) {
    console.warn(
      '[DEPRECATED] Passing a vanilla store will be unsupported in a future version. Instead use `import { useStore } from \'zustand\'`.',
    )
  }
  const api
    = typeof createState === 'function' ? createStore(createState) : createState

  const useBoundStore: any = (selector?: any, equalityFn?: any) =>
    useStore(api, selector, equalityFn)

  Object.assign(useBoundStore, api)

  return useBoundStore
}

export const create = (<T>(createState: StateCreator<T, [], []> | undefined) =>
  createState ? createImpl(createState) : createImpl) as Create
```

## emm...看起来好繁琐，好！那接下来把核心的部分以从顶至底的方式简化一下

我将上述核心代码简化成分成两个核心的js版本

### React-min.js

```js
// React-min.js
// 这里是React API 的useSyncExternalStore 的 selector扩展版本 具体可以参考: https://www.npmjs.com/package/use-sync-external-store?activeTab=code
import useSyncExternalStoreExports from 'use-sync-external-store/shim/with-selector'
import { createStore } from './vanilla.ts'

// 顶部入口
export const create = (createState) =>
    createState ? createImpl(createState) : createImpl

const createImpl = (createState) => {
  const api =
    typeof createState === 'function' ? createStore(createState) : createState

  const useBoundStore = (selector?, equalityFn) =>
    useStore(api, selector, equalityFn)

  Object.assign(useBoundStore, api)

  return useBoundStore
}

export function useStore(
  api,
  selector,
  equalityFn?
) {
  const slice = useSyncExternalStoreWithSelector(
    api.subscribe,
    api.getState,
    api.getServerState || api.getInitialState,
    selector,
    equalityFn,
  )
  return slice
}
```

### vanilla-min.js

```js
// vanilla-min.js
export const createStore = createState =>
  createState ? createStoreImpl(createState) : createStoreImpl

const createStoreImpl = (createState) => {
  let state
  const listeners = new Set()

  const setState = (partial, replace) => {
    const nextState
      = typeof partial === 'function' ? partial(state) : partial
    if (!Object.is(nextState, state)) {
      const previousState = state
      state
        = replace ?? (typeof nextState !== 'object' || nextState === null)
          ? nextState
          : Object.assign({}, state, nextState)
      listeners.forEach(listener => listener(state, previousState))
    }
  }

  const getState = () => state

  const getInitialState = () => initialState

  const subscribe = (listener) => {
    listeners.add(listener)
    // 去除订阅
    return () => listeners.delete(listener)
  }

  const destroy = () => {
    listeners.clear()
  }

  const api = { setState, getState, getInitialState, subscribe, destroy }
  const initialState = (state = createState(setState, getState, api))
  return api
}
```

## 现在是不是好看很多了捏，接下来我们平铺开来逐个解读每一个函数的作用

### <1> create

很明显这个就是我们平时使用 zustand 的入口文件

```js
export const create = createState =>
  createState ? createImpl(createState) : createImpl
```

这里我们可以对照着zustand官方文档的使用场景来看

```js
const useBearStore = create((set) => ({
  bears: 0,
  increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
  removeAllBears: () => set({ bears: 0 }),
}))

// 分离！
const myCreateState = (set) => ({
  bears: 0,
  increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
  removeAllBears: () => set({ bears: 0 }),
})

const useBearStore = create(myCreateState)
```

可以看出 我们的这个create函数 传入了一个 包含state和action的函数，也就是上面分离后的`myCreateState`函数.
好！我们回到create源码上

```js
// 将我们的 myCreateState 传入
export const create = createState =>
// 判断如果createState不为空调用createImpl(createState)执行
// 为空则不调用执行createImpl而是将 useBearStore = createImpl，即将其变成create
  createState ? createImpl(createState) : createImpl
```

### <2> createImpl

也就是进入到create接口的功能实现函数

```js
// 接着继续将 myCreateState 传入
const createImpl = (createState) => {
  // 判断createState是不是函数，如果是则调用createStore(createState)执行，将结果付给api
  // 不是则直接将createState付给api
  const api =
    typeof createState === 'function' ? createStore(createState) : createState

  // 传入selector 和 equalityFn函数,这两个函数会在后续部分进行讲解
  // 返回 useStore(api, selector, equalityFn) 的执行返回值
  const useBoundStore = (selector?, equalityFn) =>
    useStore(api, selector, equalityFn)

  // 将useBoundStore 和 api 对象合并到一起付给前者并返回
  Object.assign(useBoundStore, api)
  return useBoundStore
}
```

### <3> createStore

这里其实和create一样，传入的依然是 createState 也就是我们的 `myCreateState`函数
并且判断依然和create一样：
判断如果createState不为空调用createStoreImpl(createState)执行
为空则不调用执行createStoreImpl而是将 useBearStore = createStoreImpl，即将其变成createStore

```js
export const createStore = createState =>
  createState ? createStoreImpl(createState) : createStoreImpl
```

### <4> createStoreImpl

也就是进入到createStore接口的功能实现函数
这里就是我们Zustand的第一个核心部分了，这里的设计充分体现了发布订阅者模型
这个函数包含了 4个核心api：`setState`、`getState`、`subscribe`、`destroy`

```js
const createStoreImpl = (createState) => {
  // 存储了store的变量和action (通过闭包的形式)
  let state
  // 监听器存储了该store的所有订阅函数集合，这里的监听器会监听所有更改，对每个更改同步触发
  const listeners = new Set()

  const setState = (partial, replace) => {
    // 判断partial是不是函数
    // 是则执行nextState = partial(state)
    // 不是则让 nextState = partial
    const nextState
      = typeof partial === 'function' ? partial(state) : partial
    // 这里会先进行一次比较,判断前后state是否发生变化
    // 如果变化才会向下执行
    if (!Object.is(nextState, state)) {
      // 创建一个 "旧State" 保存上一次的state
      const previousState = state
      // 这里做了两个动作, 首先这里的replace即是我们zustand使用create创建的第二个变量(默认为false),如果是true, 则会将其完全的替换掉state,不是则会进行一次合并, 将新的state合并到state中
      state
        = replace ?? (typeof nextState !== 'object' || nextState === null)
          ? nextState
          : Object.assign({}, state, nextState)
      // 这里触发监听器, 遍历所有订阅函数,并传入state 和 旧state作为参数.
      listeners.forEach(listener => listener(state, previousState))
    }
  }

  // 返回state
  const getState = () => state

  // 返回初始设定的state
  const getInitialState = () => initialState

  // 订阅函数
  const subscribe = (listener) => {
    // 给监听器集合加入一个新的订阅函数
    listeners.add(listener)
    // 返回去除订阅的函数
    return () => listeners.delete(listener)
  }

  // 清空所有订阅函数
  const destroy = () => {
    listeners.clear()
  }

  // 将上述函数整合成一个完整的api对象
  const api = { setState, getState, getInitialState, subscribe, destroy }
  // 初始化仓库, 第一次运行时候执行
  // 这里createState 即是上文我们传入的 myCreateState函数, 在这里它会将其set、get 和 api 分别映射到上面的 setState、getState 和 api当中,
  // 即你在新创建的函数将会把其中的set、get替换成我们这里的setState、getState以及搭配着初始的state值变量包装成一个对象返回出来
  // 交给 state 以及 initialState(存储了第一次初始化时候的state对象)
  const initialState = (state = createState(setState, getState, api))
  return api
}
```

这里为了方便 对照,我再次把Zustand使用时候的代码贴到这里

```js
// 这里可以看到这个箭头函数返回了 一个包含了 值和操作的 state对象
/**
{
  bears: 0,
  increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
  removeAllBears: () => set({ bears: 0 }),
}
 */
const myCreateState = set => ({
  bears: 0,
  increasePopulation: () => set(state => ({ bears: state.bears + 1 })),
  removeAllBears: () => set({ bears: 0 }),
})

const useBearStore = create(myCreateState)
```

### <5> useStore

到了我们的第二个核心功能部分。
`useSyncExternalStoreWithSelector`函数 即是让Zustand实现将自己建立的store 与 react的view层 进行绑定的核心钩子

```js
// 将上文提供的api、selector、equalityFn传入
export function useStore(
  api,
  selector,
  equalityFn?
) {
  const slice = useSyncExternalStoreWithSelector(
    api.subscribe,
    api.getState,
    api.getServerState || api.getInitialState,
    selector,
    equalityFn,
  )
  return slice
}
```

这个Hook是借助了`use-sync-external-store`库对React官方提供的`useSyncExternalStore`函数的进一步封装，使其通过Selector用法，能够精确的取出我们想要的store里的变量或者action。

首先肯定又疑问，什么叫做精确？原始React的API`useSyncExternalStore`本身有什么用处，为什么不直接使用它？它能提供什么？

这里是React官方文档里头的描述：https://react.docschina.org/reference/react/useSyncExternalStore

首先我们可以看到其中写道: `useSyncExternalStore` 是一个让你订阅外部 store 的 React Hook。哈？原来React已经给你提供了一个专门用来订阅自定义的全局状态管理仓库的函数捏~

这里`useSyncExternalStore`提供三个参数

1. subscribe：一个函数，接收一个单独的 callback 参数并把它订阅到 store 上。当 store 发生改变，它应当调用被提供的 callback。这会导致组件重新渲染。subscribe 函数会返回清除订阅的函数。

2. getSnapshot：一个函数，返回组件需要的 store 中的数据快照。在 store 不变的情况下，重复调用 getSnapshot 必须返回同一个值。如果 store 改变，并且返回值也不同了（用 Object.is 比较），React 就会重新渲染组件。

3. 可选 getServerSnapshot：一个函数，返回 store 中数据的初始快照。它只会在服务端渲染时，以及在客户端进行服务端渲染内容的 hydration 时被用到。快照在服务端与客户端之间必须相同，它通常是从服务端序列化并传到客户端的。如果你忽略此参数，在服务端渲染这个组件会抛出一个错误。

这里的 api.subscribe 和 api.getState 不正式对应了我们上面返回 api 中的 subscribe 和 getState 函数嘛(第三个参数我们这里暂时跳过)

这里它返回一个 store 中数据的 快照。如果你用过pinia的话,你可能可以想到,为什么在这里不直接使用一个解构语法来直接获取, 那为何要进一步去封装它呢?

这里我们就需要考虑到React的特性了, 解构语法其实就相当于以下:

```js
const obj = {
  a: 1,
  b: 2
}
const [a, b] = obj
// 等于
const obj = {
  a: 1,
  b: 2
}
const a = obj.a
const b = obj.b
```

因此本质上你还是取了一个完整的对象
React 的渲染模式 是一种浅比较更新, 因此在这里你使用了一个对象, 你修改了这个对象内的值 依然会触发组件的重渲染, 而 封装`useSyncExternalStoreWithSelector` 利用一种 selector 的形式 来获取到你想要的值或者操作, 从而避免了直接获取整个state对象来导致即使你不使用的变量在其它组件的更新也会触发本组件的重渲染
而`equalityFn`这个函数则对照着你可以传入你自定义比较函数,来更好的控制重重渲染操作

```js
// 这里提供一个官方的例子
const treats = useBearStore(
  state => state.treats,
  (oldTreats, newTreats) => compare(oldTreats, newTreats),
)
```

## 总结

1. Zustand 的 vanilla 提供了 store 核心代码 是一种通过闭包 + 发布订阅者模型 来实现的
2. Zustand 的 react 提供了 将 store 与 React的view层绑定的钩子, 让其可以在React 中运作.
