import type { StageConfig } from '@/prologue/types/stage'

/**
 * Stage 1: 尤莉娅对话阶段配置
 */
export const stage1Config: StageConfig = {
  id: 'stage1',
  order: 0,
  nextStage: 'stage2', // 最后一个 stage，结束后进入主页
  component: () => import('./index.vue'),
  transition: {
    enterClass: 'fade',
    leaveClass: 'fade',
    duration: 500,
  },
}
