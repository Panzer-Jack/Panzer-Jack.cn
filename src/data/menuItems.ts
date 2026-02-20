import type { MenuConfig, MenuItem } from '@/types/menu'
import { MENU_KEY } from '@/constants/menu'

/**
 * 主菜单项配置
 */
export const mainMenuItems: MenuItem[] = [
  {
    id: MENU_KEY.BLOG,
    label: 'Blog',
    path: '/posts',
  },
  {
    id: MENU_KEY.PROJECTS,
    label: 'Projects',
    path: '/projects',
  },
  {
    id: MENU_KEY.LINKS,
    label: 'Links',
    path: '/links',
  },
  {
    id: MENU_KEY.ABOUT,
    label: 'About',
    path: '/about',
  },
]

/**
 * 菜单配置
 */
export const menuConfig: MenuConfig = {
  title: '老船长PZ_Jack の 博客',
  subtitle: 'MAIN MENU',
}

/**
 * 作者信息配置
 */
export const authorConfig = {
  title: 'Readme',
  description: 'A Pragmatistic Dreamer. ',
}

/**
 * 联系方式配置
 */
export const contactConfig = {
  title: 'Contact',
  email: 'panzer_jack@panzer-jack.cn',
  socialLinks: [
    { icon: 'github', url: 'https://github.com/Panzer-Jack' },
    { icon: 'x', url: 'https://x.com/Panzer_Jack' },
    { icon: 'bilibili', url: 'https://space.bilibili.com/409759250' },
    { icon: 'rss', url: '/rss.xml' },
  ],
}

/**
 * 页面标题配置
 * key 为路由路径前缀，值为标题配置
 */
export const pageTitleMap: Record<string, { title: string }> = {
  '/posts': {
    title: MENU_KEY.BLOG,
  },
  '/projects': {
    title: MENU_KEY.PROJECTS,
  },
  '/links': {
    title: MENU_KEY.LINKS,
  },
  '/about': {
    title: MENU_KEY.ABOUT,
  },
}

/** 默认页面标题 (无匹配路由时) */
export const defaultPageTitle = {
  title: 'MAIN TERMINAL',
}
