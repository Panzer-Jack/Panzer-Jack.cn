<script setup lang="ts">
interface TableRow {
  tag?: string
  content: string
}

interface TableSubSection {
  subtitle: string
  rows: TableRow[]
}

type SectionItem = TableRow | TableSubSection

interface TableSection {
  title: string
  emoji: string
  color: string
  items: SectionItem[]
}

function isSubSection(item: SectionItem): item is TableSubSection {
  return 'subtitle' in item
}

const sections: TableSection[] = [
  {
    title: 'ACGN',
    emoji: '🌸',
    color: '#ff6699',
    items: [
      {
        subtitle: '近期在肝的',
        rows: [
          { tag: '旮旯', content: '苍之彼方的四重奏、愛上火車' },
          { tag: '漫画', content: '《我那難以啟齒的羞恥初戀》（伏見司最新力作：性轉×骨科×百合）' },
          { tag: 'JRPG', content: '空の軌跡 the 1st' },
          { tag: '輕小說', content: '《東京闇鴉》' },
        ],
      },
      {
        subtitle: '老船长非常喜欢的',
        rows: [
          { tag: '番剧(A)', content: 'Steins;Gate、刀剑神域' },
          { tag: '漫画(C)', content: '《关于我转生变成史莱姆这档事》、《转生英雄之女》' },
          { tag: '旮旯(G)', content: 'Steins;Gate、月に寄りそう乙女の作法系列、金辉恋曲四重奏' },
          { tag: 'JRPG(G)', content: 'A社出品（Evenicle、蘭斯系列）' },
          { tag: '輕小說(N)', content: '《喜歡愛情喜劇的主人公嗎？》、《黑之魔王》、《滿懷美夢的少年是現實主義者》、《有谁规定了现实中不能有恋爱喜剧的？》' },
        ],
      },
    ],
  },
  {
    title: '在玩什么',
    emoji: '🎮',
    color: '#4488ff',
    items: [
      {
        subtitle: '最近在打的',
        rows: [
          { tag: 'RTS', content: '地狱之门、战争之人2、英雄连3' },
          { tag: '大战略', content: '钢铁雄心4、维多利亚3' },
          { tag: '开放世界', content: '天国拯救2' },
          { tag: 'FPS', content: '战地风云6' },
          { tag: '手游', content: 'BA（老年人有点肝不动了）' },
        ],
      },
      {
        subtitle: '长期关注的',
        rows: [
          { tag: 'RTS', content: '战争之人&突击小队系列、英雄连系列、突袭系列；等后续剧情DLC ing：断箭、风暴崛起' },
          { tag: '大战略', content: 'P社（钢铁雄心&欧陆风云&维多利亚&王国风云）' },
        ],
      },
    ],
  },
  {
    title: '在学什么',
    emoji: '💻',
    color: '#00d4aa',
    items: [
      { content: '· 调教 LLM' },
      { content: '· 电子琴（手残废，到现在都没弹明白）、口琴（铃木 SCX-48）' },
      { content: '· 手绘（设备：WACOM CTL-672）' },
      { content: '· 自学日语ing' },
    ],
  },
  {
    title: '未来计划',
    emoji: '🔮',
    color: '#ffaa44',
    items: [
      { tag: '想学', content: '考驾照' },
      { tag: '想学', content: '日语到能日常交流水平' },
      { tag: '想做', content: '26年年中 准备整个日本长期签证' },
      { tag: '想做', content: '逐渐恢复写作习惯（和🐦本性抗争.JPG' },
      { tag: '想去', content: '日本、北欧' },
    ],
  },
]

function headerStyle(color: string) {
  return {
    background: `linear-gradient(135deg, ${color}20, ${color}08)`,
    borderLeft: `3px solid ${color}`,
    color,
  }
}

function subHeaderStyle(color: string) {
  return {
    borderLeft: `2px solid ${color}60`,
    color: `${color}cc`,
  }
}

function tagStyle(color: string) {
  return {
    background: `${color}18`,
    color,
    border: `1px solid ${color}30`,
  }
}
</script>

<template>
  <div class="about-table">
    <div
      v-for="(section, idx) in sections"
      :key="section.title"
      class="section"
      :class="{ 'mt-0': idx === 0 }"
    >
      <!-- 分类标题 -->
      <div
        class="section-header"
        :style="headerStyle(section.color)"
      >
        <span class="emoji">{{ section.emoji }}</span>
        <span class="title">{{ section.title }}</span>
      </div>

      <!-- 遍历 items -->
      <template
        v-for="(item, iIdx) in section.items"
        :key="iIdx"
      >
        <!-- 子分区 (带 subtitle + 嵌套 rows) -->
        <template v-if="isSubSection(item)">
          <div
            class="sub-header"
            :style="subHeaderStyle(section.color)"
          >
            {{ item.subtitle }}
          </div>
          <div
            v-for="(row, rIdx) in item.rows"
            :key="row.tag"
            class="section-row nested"
            :class="{ 'last-row': rIdx === item.rows.length - 1 }"
          >
            <span
              class="tag"
              :style="tagStyle(section.color)"
            >
              {{ row.tag }}
            </span>
            <span class="content">{{ row.content }}</span>
          </div>
        </template>

        <!-- 普通行 -->
        <div
          v-else
          class="section-row"
          :class="{ 'last-row': iIdx === section.items.length - 1 }"
        >
          <span
            v-if="item.tag"
            class="tag"
            :style="tagStyle(section.color)"
          >
            {{ item.tag }}
          </span>
          <span class="content">{{ item.content }}</span>
        </div>
      </template>
    </div>
  </div>
</template>

<style scoped>
.about-table {
  margin: 1.5em 0;
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid rgba(0, 212, 170, 0.12);
  background: rgba(10, 18, 26, 0.6);
}

.section {
  margin-top: 0;
}

.section-header {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 16px;
  font-weight: 700;
  font-size: 14px;
  font-family: 'special-common', sans-serif;
  letter-spacing: 1px;
}

.section-header .emoji {
  font-size: 16px;
}

.sub-header {
  padding: 6px 16px 6px 28px;
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.5px;
  background: rgba(255, 255, 255, 0.02);
}

.section-row {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 9px 16px;
  border-bottom: 1px solid rgba(0, 212, 170, 0.06);
  transition: background 0.2s ease;
}

.section-row.nested {
  padding-left: 28px;
}

.section-row:hover {
  background: rgba(0, 212, 170, 0.04);
}

.section-row.last-row {
  border-bottom: 1px solid rgba(0, 212, 170, 0.1);
}

.tag {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 56px;
  padding: 2px 10px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 600;
  white-space: nowrap;
  flex-shrink: 0;
}

.content {
  font-size: 12px;
  color: #8ba8a8;
  line-height: 1.6;
}
</style>
