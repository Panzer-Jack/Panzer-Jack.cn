import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetTypography,
  presetWebFonts,
  presetWind3,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss'

export default defineConfig({
  shortcuts: [
    // ...
  ],
  theme: {
    colors: {
      // 原有颜色
      desc: '#61666D',
      title: '#18191C',
      primary: '#FF6699',
      gray: '#F6F7F8',
      bdline: '#E3E5E7',

      // 哥特暗黑风配色
      gothic: {
        bg: '#0d0a0e',
        surface: '#1a1520',
        elevated: '#251d2a',
        border: '#3d2d4a',
      },
      blood: {
        DEFAULT: '#8b0000',
        light: '#b22222',
        glow: '#ff4444',
      },
      violet: {
        DEFAULT: '#4a0080',
        light: '#7b2cbf',
        glow: '#9d4edd',
      },
      text: {
        primary: '#e8e0f0',
        secondary: '#a89bb8',
        muted: '#6b5a7a',
      },
      dialogue: {
        bg: 'rgba(13, 10, 14, 0.95)',
        border: '#7b2cbf',
        nameBg: '#4a0080',
      },
    },
  },
  presets: [
    presetWind3(),
    presetAttributify(),
    presetIcons(),
    presetTypography(),
    presetWebFonts(),
  ],
  transformers: [
    transformerDirectives(),
    transformerVariantGroup(),
  ],
})
