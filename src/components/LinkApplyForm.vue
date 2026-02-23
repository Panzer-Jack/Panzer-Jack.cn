<script setup lang="ts">
import { computed, reactive, ref } from 'vue'
import { useMobile } from '@/composables/useMobile'

const { isMobile } = useMobile()

const form = reactive({
  name: '',
  url: '',
  desc: '',
  avatar: '',
})

const copied = ref(false)

/** 生成配置预览文本 */
const configText = computed(() => {
  return [
    `site: ${form.name || '站点名称'}`,
    `url: ${form.url || 'https://example.com'}`,
    `desc: ${form.desc || '一句话描述'}`,
    `avatar: ${form.avatar || 'https://example.com/avatar.png'}`,
  ].join('\n')
})

/** 复制配置到剪贴板 */
async function copyConfig() {
  try {
    await navigator.clipboard.writeText(configText.value)
    copied.value = true
    setTimeout(() => (copied.value = false), 2000)
  } catch {
    // clipboard API 不可用时的 fallback
    const textarea = document.createElement('textarea')
    textarea.value = configText.value
    document.body.appendChild(textarea)
    textarea.select()
    document.execCommand('copy')
    document.body.removeChild(textarea)
    copied.value = true
    setTimeout(() => (copied.value = false), 2000)
  }
}

const inputClass = 'w-full py-8px px-12px rounded-4px bg-tno-bg-solid border-1px border-solid border-tno-primary/20 text-13px text-tno-text outline-none transition-all duration-200 focus:border-tno-primary/40 focus:shadow-[0_0_8px_rgba(0,212,170,0.1)]'
</script>

<template>
  <div
    class="grid gap-20px mt-32px"
    :class="isMobile ? 'grid-cols-1' : 'grid-cols-2'"
  >
    <!-- 左侧：表单 -->
    <div class="flex flex-col gap-12px">
      <h3 class="text-16px font-700 text-tno-primary m-0 mb-4px">
        申请友链
      </h3>
      <input
        v-model="form.name"
        :class="inputClass"
        type="text"
        placeholder="站点名称"
      >
      <input
        v-model="form.url"
        :class="inputClass"
        type="url"
        placeholder="站点地址 (https://...)"
      >
      <input
        v-model="form.desc"
        :class="inputClass"
        type="text"
        placeholder="站点简介"
      >
      <input
        v-model="form.avatar"
        :class="inputClass"
        type="url"
        placeholder="头像链接 (https://...)"
      >
    </div>

    <!-- 右侧：配置预览 -->
    <div class="flex flex-col gap-12px">
      <h3 class="text-16px font-700 text-tno-primary m-0 mb-4px">
        配置预览
      </h3>
      <pre class="m-0 py-12px px-14px rounded-4px bg-tno-bg-solid border-1px border-solid border-tno-primary/12 text-12px text-tno-text font-mono leading-relaxed whitespace-pre-wrap">{{ configText }}</pre>
      <button
        class="self-start py-6px px-16px rounded-4px text-12px font-600 cursor-pointer transition-all duration-200 border-1px border-solid"
        :class="copied
          ? 'bg-tno-primary/20 border-tno-primary/40 text-tno-accent'
          : 'bg-transparent border-tno-primary/20 text-tno-text-muted hover:border-tno-primary/40 hover:text-tno-text'"
        @click="copyConfig"
      >
        {{ copied ? '已复制 ✓' : '复制配置' }}
      </button>
    </div>
  </div>

  <!-- 底部提示 -->
  <p class="text-12px text-tno-text-muted mt-16px">
    填好信息后点击「复制配置」，粘贴到下方评论区发送，博主收到推送后会尽快处理
  </p>
</template>
