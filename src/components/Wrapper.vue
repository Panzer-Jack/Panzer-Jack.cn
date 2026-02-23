<script setup lang='ts'>
import { useLayout } from '@/composables/useLayout'

const { frontmatter } = defineProps({
  frontmatter: {
    type: Object,
    required: true,
  },
})
const { isPostDetail, isAbout, isLink, isProject } = useLayout()
const route = useRoute()

function formatPostDate(date: string) {
  return new Date(date).toLocaleTimeString('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  })
}
</script>

<template>
  <div
    v-key="route.path"
    class="markdown-body"
  >
    <div v-show="isPostDetail">
      <h1>{{ frontmatter.title }}</h1>
      <blockquote>
        <i-object-calendar class="h-10px w-10px" /> {{ formatPostDate(frontmatter.date) }}
        ~
        <i-object-time class="h-10px h-10px" /> {{ frontmatter.duration }} min
      </blockquote>
      <br>
      <img
        v-if="frontmatter.top_img"
        :src="frontmatter.top_img"
        class="w-200px"
      >
    </div>
    <slot />
  </div>

  <div v-show="isPostDetail || isAbout || isLink || isProject">
    <div class="markdown-body mt-80px mb-20px">
      <hr>
    </div>
    <Waline />
  </div>
</template>
