export interface FriendLink {
  /** 站点名称 */
  name: string
  /** 站点链接 */
  link: string
  /** 站点简短描述 */
  description: string
  /** 头像图片 URL（可选，无则用首字母 fallback） */
  avatar?: string
}
