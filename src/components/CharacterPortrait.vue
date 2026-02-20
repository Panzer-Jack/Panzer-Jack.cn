<script setup lang="ts">
interface Props {
  /** 表情名称，对应图片文件名 */
  expression?: string
}

const props = withDefaults(defineProps<Props>(), {
  expression: '普通',
})

// 获取图片 URL
const imageSrc = computed(() => {
  const fileName = props.expression
  const key = `/yulia/${fileName}.png`
  return key
})
</script>

<template>
  <div class="flex items-center justify-center w-350px">
    <Transition
      name="portrait-fade"
      mode="out-in"
    >
      <img
        v-if="imageSrc"
        :key="`/yulia/${props.expression}.png`"
        :src="imageSrc"
        :alt="`尤莉娅 - ${props.expression}`"
        class="w-full h-auto object-contain"
      >
    </Transition>
  </div>
</template>

<style scoped>
/* 淡入淡出过渡 */
.portrait-fade-enter-active,
.portrait-fade-leave-active {
  transition: opacity 0.2s ease;
}

.portrait-fade-enter-from,
.portrait-fade-leave-to {
  opacity: 0;
}
</style>
