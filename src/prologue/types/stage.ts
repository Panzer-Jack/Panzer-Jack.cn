import type { Component } from 'vue'

/**
 * Stage 配置
 */
export interface StageConfig {
  /** 唯一标识 */
  id: string
  /** 排序权重，越小越先执行 */
  order: number
  /** 下一阶段 ID，undefined 表示结束 */
  nextStage?: string
  /** 组件懒加载器 */
  component: () => Promise<{ default: Component }>
  /** 过渡动画配置（预留扩展） */
  transition?: StageTransition
}

/**
 * 过渡动画配置
 */
export interface StageTransition {
  /** 进入动画名称 */
  enterClass?: string
  /** 离开动画名称 */
  leaveClass?: string
  /** 动画时长 (ms) */
  duration?: number
}

/**
 * Stage 组件 Props
 */
export interface StageProps {
  /** 是否为活跃状态 */
  isActive: boolean
}
