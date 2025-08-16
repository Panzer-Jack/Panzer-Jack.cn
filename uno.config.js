import { defineConfig, presetAttributify, presetIcons, presetTypography, presetWebFonts, presetWind3, transformerDirectives, transformerVariantGroup, } from 'unocss';
export default defineConfig({
    shortcuts: [
    // ...
    ],
    theme: {
        colors: {
            // ...
            desc: '#61666D',
            title: '#18191C',
            primary: '#FF6699',
            gray: '#F6F7F8',
            bdline: '#E3E5E7',
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
});
