import type { StageConfig } from '@/prologue/types/stage'
import { stage1Config } from './stage1/config'
import { stage2Config } from './stage2/config'

/**
 * 注册所有 stage
 * 未来添加新 stage 时，在此导入并加入数组
 */
const allStages: StageConfig[] = [
  stage1Config, // 尤莉娅对话阶段
  stage2Config, // Galgame 风格开场动画
]

/**
 * 按 order 排序的 stage 列表
 */
export const sortedStages = allStages.sort((a, b) => a.order - b.order)

/**
 * ID -> Config 映射
 */
export const stageMap = new Map(
  allStages.map(config => [config.id, config]),
)

/**
 * 获取 stage 配置
 */
export function getStageConfig(id: string): StageConfig | undefined {
  return stageMap.get(id)
}

/**
 * 获取第一个 stage ID
 */
export function getFirstStageId(): string {
  return sortedStages[0]?.id ?? ''
}
