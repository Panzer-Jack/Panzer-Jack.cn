import type { StageConfig } from '@/prologue/types/stage'

/**
 * Stage 2: Galgame 风格开场动画配置
 */
export const stage2Config: StageConfig = {
  id: 'stage2',
  order: 0,
  nextStage: 'stage1',
  component: () => import('./index.vue'),
  transition: {
    enterClass: 'fade',
    leaveClass: 'fade',
    duration: 800,
  },
}
