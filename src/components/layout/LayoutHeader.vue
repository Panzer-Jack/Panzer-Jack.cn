<script setup lang="ts">
import { useLayout } from '@/composables/useLayout'
import { pageTitleMap } from '@/data/menuItems'

const route = useRoute()
const router = useRouter()

const { currentTitle } = useLayout()

const handleBack = () => {
  const path = route.path

  if (pageTitleMap[path]) {
    // 如果是精确匹配，直接返回主页
    router.push('/')
    return
  }

  // 否则返回上一级路径
  const segments = path.split('/').filter(Boolean)
  if (segments.length > 1) {
    router.push(`/${segments.slice(0, -1).join('/')}`)
    return
  }
  router.push('/')
}
</script>

<template>
  <div class="relative w-full h-48px flex items-center shrink-0 font-[special-event]">
    <!-- 左侧系统标签 -->
    <div class="flex items-center gap-12px px-20px relative z-10">
      <span class="text-18px font-mono text-tno-primary [text-shadow:0_0_6px_rgba(0,212,170,0.4)]">「</span>

      <!-- 动态标题（路由切换动画） -->
      <Transition
        name="title-switch"
        mode="out-in"
      >
        <span
          :key="currentTitle"
          class="text-14px font-bold tracking-2px text-tno-accent [text-shadow:0_0_8px_rgba(0,255,204,0.5)]"
        >
          {{ currentTitle }}
        </span>
      </Transition>

      <span class="text-14px text-tno-dim">|</span>

      <span
        class="text-12px tracking-1px text-tno-dim hover:text-tno-active-text cursor-pointer transition-colors duration-200"
        @click="handleBack"
      >
        > cd ..
      </span>

      <span class="text-18px font-mono text-tno-primary [text-shadow:0_0_6px_rgba(0,212,170,0.4)]">」</span>
    </div>
  </div>
</template>

<style scoped>
/* 标题切换过渡 */
.title-switch-enter-active {
  transition: all 0.3s ease;
}
.title-switch-leave-active {
  transition: all 0.2s ease;
}
.title-switch-enter-from {
  opacity: 0;
  transform: translateY(-8px);
  filter: blur(2px);
}
.title-switch-leave-to {
  opacity: 0;
  transform: translateY(8px);
  filter: blur(2px);
}
</style>
