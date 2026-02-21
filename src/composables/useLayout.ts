import { defaultPageTitle, pageTitleMap } from '@/data/menuItems'

export const useLayout = () => {
  const route = useRoute()
  const currentTitle = computed(() => {
    const path = route.path
    // 精确匹配优先
    if (pageTitleMap[path])
      return pageTitleMap[path].title

    // 前缀匹配 (取最长匹配)
    const matchedKey = Object.keys(pageTitleMap)
      .filter(prefix => path.startsWith(prefix))
      .sort((a, b) => b.length - a.length)[0]

    return matchedKey ? pageTitleMap[matchedKey].title : defaultPageTitle.title
  })

  const isPost = computed(() => route.path.startsWith('/posts'))
  const isPostDetail = computed(() => {
    return isPost.value && route.path !== '/posts'
  })
  const isAbout = computed(() => route.path === '/about')

  return {
    currentTitle,
    isPost,
    isPostDetail,
    isAbout,
  }
}
