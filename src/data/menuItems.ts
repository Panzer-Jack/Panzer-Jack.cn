import type { MenuConfig, MenuItem } from '@/types/menu'

/**
 * 主菜单项配置
 */
export const mainMenuItems: MenuItem[] = [
    {
    id: 'Blog',
    label: 'Blog',
    path: '/posts',
  },
  {
    id: 'Projects',
    label: 'Projects',
    path: '/projects',
  },
  {
    id: 'Links',
    label: 'Links',
    path: '/links',
  },
  {
    id: 'About',
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
