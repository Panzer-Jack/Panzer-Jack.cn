import type { DialogueLine } from '@/types/prologue'

/**
 * Stage 1: 尤莉娅对话剧本
 * 包含初见、自我介绍、博客介绍、告别四个部分
 */
export const dialogueScript: DialogueLine[] = [
  // 初见 - 察觉到访客
  { text: '嗯...？', expression: 'surprised' },
  { text: '有人来了吗？', expression: 'thinking' },
  { text: '啊，是新的访客呢。', expression: 'smile' },

  // 自我介绍
  { text: '欢迎来到 Panzer_Jack の 博客。', expression: 'happy' },
  { text: '我是尤莉娅，这片领域的守护者。', expression: 'neutral' },
  { text: '也是这里唯一的向导...大概。', expression: 'shy' },

  // 博客介绍
  { text: '老船长会在这里记录他的航海日志...', expression: 'thinking' },
  { text: '技术、游戏、还有一些奇奇怪怪的东西。', expression: 'smile' },
  { text: '说不定你能在这里找到有趣的宝藏呢。', expression: 'happy' },

  // 告别
  { text: '那么，祝你在这里找到有趣的东西。', expression: 'wave' },
  { text: '再会...', expression: 'neutral' },
]
