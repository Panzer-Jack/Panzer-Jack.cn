/**
 * 菜单项定义
 */
export interface MenuItem {
  /** 唯一标识 */
  id: string
  /** 显示标签 */
  label: string
  /** 路由路径 */
  path: string
  /** 图标名称 (可选) */
  icon?: string
  /** 是否为外部链接 */
  external?: boolean
}

/**
 * 菜单状态
 */
export interface MenuState {
  /** 当前选中项 ID */
  activeId: string | null
  /** 移动端抽屉是否展开 */
  isDrawerOpen: boolean
}

/**
 * 菜单配置
 */
export interface MenuConfig {
  /** 菜单标题 */
  title: string
  /** 副标题 */
  subtitle: string
}
