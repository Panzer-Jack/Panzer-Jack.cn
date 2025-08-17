export default {
  plugins: {
    'postcss-px-to-viewport': {
      unitToConvert: 'px',
      viewportWidth: 375, // 设计稿的视口宽度
      viewportHeight: 667, // 设计稿的视口高度（可选）
      unitPrecision: 5, // 转换后保留的小数位数
      viewportUnit: 'vw', // 转换的视口单位
      minPixelValue: 1, // 小于或等于 1px 不转换为视口单位
      mediaQuery: false, // 允许在媒体查询中转换 px
    },
  },
}
