/**
 * 精灵图帧位置
 */
export interface SpriteFrame {
  row: number
  col: number
}

/**
 * 单条对话
 */
export interface DialogueLine {
  /** 对话文本 */
  text: string
  /** 对应的表情 */
  expression: string
  /** 说话者名字，默认为尤莉娅 */
  speaker?: string
}

/**
 * 精灵图配置
 */
export interface SpriteConfig {
  /** 图片总宽度 */
  width: number
  /** 图片总高度 */
  height: number
  /** 列数 */
  cols: number
  /** 行数 */
  rows: number
  /** 单帧宽度 */
  frameWidth: number
  /** 单帧高度 */
  frameHeight: number
  /** 垂直偏移修正 */
  offsetY?: number
}
