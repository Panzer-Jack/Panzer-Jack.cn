import panzerjack from '@panzerjack/eslint-config'

export default panzerjack({
  typescript: true,
  vue: true,
  pnpm: true,
  formatters: true,
  markdown: false,
  rules: {
    'no-console': 'off',
  },
})
