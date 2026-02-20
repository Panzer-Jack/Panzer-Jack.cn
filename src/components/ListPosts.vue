<script setup lang="ts">
import type { Post } from '@/types/post'
import { useMobile } from '@/composables/useMobile'

const { isMobile } = useMobile()
const router = useRouter()
const routes: Post[] = router.getRoutes()
  .filter((i: any) => i.path.startsWith('/posts') && i.meta.frontmatter.date && !i.meta.frontmatter.draft)
  .map((i: any) => ({
    path: i.meta.frontmatter.redirect || i.path,
    title: i.meta.frontmatter.title,
    date: i.meta.frontmatter.date,
    duration: i.meta.frontmatter.duration,
  }))

const posts = computed(() =>
  [...routes]
    .sort((a, b) => +new Date(b.date) - +new Date(a.date)),
)

const getYear = (a: Date | string | number) => new Date(a).getFullYear()
const isFuture = (a?: Date | string | number) => a && new Date(a) > new Date()
const isSameYear = (a?: Date | string | number, b?: Date | string | number) =>
  a && b && getYear(a) === getYear(b)

function isSameGroup(a: Post, b?: Post) {
  return (isFuture(a.date) === isFuture(b?.date)) && isSameYear(a.date, b?.date)
}

function getGroupName(p: Post) {
  if (isFuture(p.date))
    return 'Upcoming'
  return getYear(p.date)
}

function formatPostDate(date: string) {
  const d = new Date(date)
  const year = d.getFullYear()
  const month = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}
</script>

<template>
  <div class="flex flex-col">
    <!-- 文章列表 -->
    <template
      v-for="(route, idx) in posts"
      :key="route.path"
    >
      <!-- 年份分组标题 -->
      <div
        v-if="!isSameGroup(route, posts[idx - 1])"
        class="flex items-center gap-16px mb-0px"
        :class="idx === 0 ? 'mt-0' : 'mt-40px'"
      >
        <span class="font-[special-event] text-20px font-700 tracking-2px text-tno-primary [text-shadow:0_0_8px_rgba(0,212,170,0.4)] whitespace-nowrap">
          {{ getGroupName(route) }}
        </span>
        <div class="flex-1 h-1px bg-gradient-to-r from-tno-primary/40 via-tno-primary/8 to-transparent" />
      </div>

      <!-- 文章条目 -->
      <RouterLink
        :to="route.path"
        class="flex justify-between py-14px rounded-4px no-underline color-inherit transition-all duration-250 border-1px border-solid border-transparent hover:bg-tno-primary/4 hover:border-tno-primary/12 hover:shadow-[0_0_16px_rgba(0,212,170,0.06)]"
        :class="isMobile ? 'flex-col items-start' : 'items-center'"
      >
        <h3
          class="!text-13px font-600 text-tno-text m-0 transition-all duration-250 group-hover:text-tno-accent group-hover:[text-shadow:0_0_6px_rgba(0,255,204,0.3)]"
          :style="{
            margin: 0,
          }"
        >
          {{ route.title }}
        </h3>
        <div class="flex items-center gap-12px whitespace-nowrap shrink-0 pt-2px">
          <span class="text-12px text-tno-dim">
            {{ route.duration }} min
          </span>
          <span class="text-12px font-mono text-tno-primary tracking-0.5px">
            {{ formatPostDate(route.date) }}
          </span>
        </div>
      </RouterLink>
    </template>
  </div>
</template>
