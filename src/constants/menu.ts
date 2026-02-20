export const MENU_KEY = {
  BLOG: 'BLOG',
  PROJECTS: 'PROJECTS',
  LINKS: 'LINKS',
  ABOUT: 'ABOUT',
} as const
export type TMenuKey = typeof MENU_KEY[keyof typeof MENU_KEY]
