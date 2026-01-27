import type { CSSProperties } from 'vue'
import type { ExpressionName, SpriteConfig, SpriteFrame } from '@/types/prologue'

/**
 * 精灵图配置常量
 */
export const SPRITE_CONFIG: SpriteConfig = {
  width: 2208,
  height: 1920,
  cols: 8,
  rows: 7,
  frameWidth: 276,
  // 1920 / 7 ≈ 274.29，取整为 274
  frameHeight: 274,
}

/**
 * 表情帧映射 - 根据精灵图实际位置
 * 精灵图是 8x7 网格（8列7行），从左上角开始计数
 */
export const EXPRESSIONS: Record<ExpressionName, SpriteFrame> = {
  neutral: { row: 0, col: 0 },
  smile: { row: 0, col: 1 },
  happy: { row: 0, col: 2 },
  surprised: { row: 1, col: 0 },
  thinking: { row: 2, col: 0 },
  wave: { row: 0, col: 3 },
  blink: { row: 1, col: 1 },
  shy: { row: 2, col: 1 },
}

/**
 * 尤莉娅精灵图控制 Composable
 */
export function useYuliaSprite() {
  const currentFrame = ref<SpriteFrame>({ row: 0, col: 0 })
  const isBlinking = ref(false)
  let blinkInterval: ReturnType<typeof setInterval> | null = null

  /**
   * 计算精灵图样式
   */
  const spriteStyle = computed<CSSProperties>(() => {
    const { frameWidth, frameHeight, width, height } = SPRITE_CONFIG
    const { row, col } = currentFrame.value

    return {
      width: `${frameWidth}px`,
      height: `${frameHeight}px`,
      backgroundImage: `url('/src/assets/images/yulia-sprite.png')`,
      backgroundPosition: `-${col * frameWidth}px -${row * frameHeight}px`,
      backgroundSize: `${width}px ${height}px`,
      backgroundRepeat: 'no-repeat',
    }
  })

  /**
   * 设置表情
   */
  function setExpression(name: ExpressionName) {
    const frame = EXPRESSIONS[name]
    if (frame) {
      currentFrame.value = frame
    }
  }

  /**
   * 直接设置帧位置
   */
  function setFrame(row: number, col: number) {
    currentFrame.value = { row, col }
  }

  /**
   * 开始眨眼动画
   */
  function startBlinkAnimation(baseExpression: ExpressionName = 'neutral') {
    if (blinkInterval)
      return

    isBlinking.value = true
    const baseFrame = EXPRESSIONS[baseExpression]
    const blinkFrame = EXPRESSIONS.blink

    blinkInterval = setInterval(() => {
      // 随机眨眼
      if (Math.random() < 0.3) {
        currentFrame.value = blinkFrame
        setTimeout(() => {
          currentFrame.value = baseFrame
        }, 150)
      }
    }, 2000)
  }

  /**
   * 停止眨眼动画
   */
  function stopBlinkAnimation() {
    if (blinkInterval) {
      clearInterval(blinkInterval)
      blinkInterval = null
    }
    isBlinking.value = false
  }

  /**
   * 清理
   */
  onUnmounted(() => {
    stopBlinkAnimation()
  })

  return {
    currentFrame,
    spriteStyle,
    isBlinking,
    setExpression,
    setFrame,
    startBlinkAnimation,
    stopBlinkAnimation,
  }
}
