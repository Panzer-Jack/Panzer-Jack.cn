<script setup lang="ts">
import { useLayout } from '@/composables/useLayout'
import { useMobile } from '@/composables/useMobile'

const { isMobile } = useMobile()
const route = useRoute()

const { isPost } = useLayout()
const frontmatter = computed(() => route.meta.frontmatter || {})
</script>

<template>
  <div
    class="fixed top-0 right-0 bottom-0 flex flex-col justify-center z-10"
    :class="isMobile ? 'left-0' : 'left-280px'"
  >
    <div
      class="bg-[rgba(27,37,46,0.95)] backdrop-blur-4px flex flex-col"
      :class="isMobile ? 'h-full' : 'border-tno-border border-2px border-solid mr-10px h-95%'"
    >
      <!-- TNO 装饰标题栏 -->
      <div class="px-16px pt-16px">
        <LayoutHeader />
      </div>

      <!-- 可滚动内容区 -->
      <main
        id="main-content"
        class="flex-1 overflow-y-auto px-16px py-16px"
      >
        <div class="min-h-full p-20px">
          <Wrapper
            :frontmatter="frontmatter"
          >
            <slot />
          </Wrapper>
        </div>
      </main>
    </div>
  </div>
</template>
