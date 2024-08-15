import { defineConfig } from 'vitepress'

import { DefaultTheme } from 'vitepress/theme'

/**
 * 侧边栏配置
 */
const sidebar: DefaultTheme.Sidebar = [
  {
    text: 'Start',
    items: [
      { text: '环境安装', link: '/start/install' },
    ]
  },
  {
    text: 'Kubernetes',
    items: [
      { text: 'Pod', link: '/kubernetes/pod' },
    ]
  },
  {
    text: 'Helm',
  },
  {
    text: 'Samples',
  },
]

/**
 * 主题配置 https://vitepress.dev/reference/default-theme-config
 */
const themeConfig: DefaultTheme.Config = {
  socialLinks: [
    { icon: 'github', link: 'https://github.com/HenryZhuHR/Hello-Kubernetes' }
  ],
  sidebar: sidebar,
}


// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Hello Kubernetes",
  base: '/Hello-Kubernetes/',
  description: "kubernetes Learning Log",
  themeConfig: themeConfig,
})
