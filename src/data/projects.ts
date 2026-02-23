import type { ProjectCategory } from '@/types/project'

/**
 * 项目分类数据
 * 图标使用 Iconify 类名，参考: https://icon-sets.iconify.design/
 */
export const projectCategories: ProjectCategory[] = [
  // {
  //   name: 'Focusing',
  //   projects: [
  //   ],
  // },
  {
    name: 'Application',
    projects: [
      {
        name: 'Blog.Panzer-Jack.cn',
        link: 'https://blog.panzer-jack.cn',
        description: '老船长PZ_Jack的个人博客，TNO + 日丹诺夫远视主义艺术风格 + 二次元',
        icon: 'i-carbon-face-wink',
      },
      {
        name: 'OpenAVG',
        link: 'https://github.com/Panzer-Jack/OpenAVG',
        description: '一个可以做Galgame和RPG 的 通用Web冒险游戏引擎 (目前仅支持Gal能力)',
        icon: 'i-carbon-face-wink',
      },
      {
        name: '数云控',
        link: 'https://www.bilibili.com/video/BV17X4y1n7GF/?spm_id_from=333.999.0.0&vd_source=97c8faa200f8ec81ac98c1e357025cd4',
        description: '一种用于数控设备的泛用性云监控IOT平台',
        icon: 'i-carbon-cloud',
      },
      {
        name: 'AI_EP_System',
        link: 'https://github.com/Panzer-Jack/AI_EP_System',
        description: '智能防疫门禁系统 - 包含身份识别、健康码检测、实时监控、体温监测、口罩检测等功能',
        icon: 'i-carbon-security',
      },
      {
        name: 'SerialHelper for SIX-DOF Manipulator',
        link: 'https://github.com/Panzer-Jack/SerialHelperfor_SIX-DOF_manipulator',
        description: '用于获取六自由度机械臂关键帧的多线程串口通信调试软件',
        icon: 'i-carbon-connect',
      },
      {
        name: 'ColorDetect Software',
        link: 'https://github.com/Panzer-Jack/ColorDetect_software',
        description: '基于 HSV 的实时动态颜色范围监测小工具',
        icon: 'i-carbon-color-palette',
      },
    ],
  },
  {
    name: 'Tools',
    projects: [
      {
        name: 'easy-live2d',
        link: 'https://github.com/Panzer-Jack/easy-live2d',
        description: '基于 Pixi.js 封装的 轻量级 Live2D Web SDK',
        icon: 'i-carbon-face-wink',
      },
      {
        name: 'feuse-mcp',
        link: 'https://github.com/Panzer-Jack/feuse-mcp',
        description: '一个实用的前端MCP工具集',
        icon: 'i-carbon-machine-learning-model',
      },
      {
        name: 'img-ascii-term',
        link: 'https://github.com/Panzer-Jack/img-ascii-term',
        description: '将图片转换为彩色 ASCII 字符画并在终端中显示',
        icon: 'i-carbon-image',
      },
      {
        name: 'AmiAmi Subscriber',
        link: 'https://github.com/Panzer-Jack/AmiAmi-Subscriber',
        description: '老婆（划掉）手办追踪器',
        icon: 'i-carbon-shopping-cart',
      },
    ],
  },
  {
    name: 'AI Waife～',
    projects: [
      {
        name: 'Cyber_AI-Waife',
        link: 'https://www.bilibili.com/video/BV1Pw411z7mZ',
        description: '一个会说话会动的AI老婆！',
        icon: 'i-carbon-face-wink',
      },
      {
        name: 'easy-live2d-ai',
        link: 'https://github.com/Panzer-Jack/easy-live2d-ai',
        description: 'AI女友通用SDK：将你的老婆随意接入到任何前端应用里吧！（监修中~）',
        icon: 'i-carbon-bot',
      },
      {
        name: 'ChatGPT_VITS_For_QQ-Rob',
        link: 'https://github.com/Panzer-Jack/ChatGPT_VITS_For_QQ-Rob',
        description: '一个会说话的QQ群聊语音AI（ChatGPT版）',
        icon: 'i-carbon-chat',
      },
      {
        name: 'ChatGLM_VITS_For_QQ-Rob',
        link: 'https://github.com/Panzer-Jack/ChatGLM_VITS_For_QQ-Rob',
        description: '一个会说话的QQ群聊语音AI（ChatGLM版）',
        icon: 'i-carbon-chat',
      },
    ],
  },
]
