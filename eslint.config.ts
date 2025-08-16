import panzerjack from '@panzerjack/eslint-config'

export default panzerjack({
  typescript: true,
  vue: true,
  pnpm: true,
  formatters: true,
  rules: {
    'no-console': 'off',
  },
})
