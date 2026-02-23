export interface Project {
  /** 项目名称 */
  name: string
  /** 项目链接 (GitHub、npm 等) */
  link: string
  /** 项目简短描述 */
  description: string
  /** UnoCSS 图标类名，如 'i-carbon-code' */
  icon?: string
}

export interface ProjectCategory {
  /** 分类名称，如 'Focusing', 'Tools' */
  name: string
  /** 该分类下的项目列表 */
  projects: Project[]
}
