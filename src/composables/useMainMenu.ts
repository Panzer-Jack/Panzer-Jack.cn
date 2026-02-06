import type { MenuItem, MenuState } from '@/types/menu'
import { mainMenuItems } from '@/data/menuItems'

export function useMainMenu() {
  const router = useRouter()
  const route = useRoute()

  // 菜单状态
  const state = reactive<MenuState>({
    activeId: null,
    isDrawerOpen: false,
  })

  // 计算当前激活项
  const activeItem = computed(() =>
    mainMenuItems.find(item => route.path.startsWith(item.path)),
  )

  // 同步路由与激活状态
  watch(activeItem, (item) => {
    state.activeId = item?.id ?? null
  }, { immediate: true })

  // 导航方法
  function navigateTo(item: MenuItem) {
    if (item.external) {
      window.open(item.path, '_blank')
    }
    else {
      router.push(item.path)
    }
    state.isDrawerOpen = false
  }

  // 移动端抽屉控制
  function toggleDrawer() {
    state.isDrawerOpen = !state.isDrawerOpen
  }

  function closeDrawer() {
    state.isDrawerOpen = false
  }

  return {
    items: mainMenuItems,
    state,
    activeItem,
    navigateTo,
    toggleDrawer,
    closeDrawer,
  }
}
