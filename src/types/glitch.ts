/**
 * Glitch 故障艺术组件类型定义
 */

/** 组件配置 */
export interface GlitchConfig {
  /** 显示文字 */
  text: string
  /** 故障强度 (1-100)，默认 30 */
  intensity?: number
  /** 字体大小，默认 20 */
  fontSize?: number
}

/** 穿插线条属性 */
export interface GlitchBar {
  /** 线条宽度 */
  w: number
  /** 线条高度 */
  h: number
  /** X 坐标 */
  x: number
  /** Y 坐标 */
  y: number
  /** 移动速度 (正为右移，负为左移) */
  speed: number
  /** 颜色 */
  color: string
  /** 透明度 */
  opacity: number
}

/** 动画状态 */
export interface GlitchAnimationState {
  /** 动画帧 ID */
  animationId: number | null
  /** 穿插线条数组 */
  bars: GlitchBar[]
  /** 当前帧数 */
  frameCount: number
}
