<script setup lang="ts">
const { t, availableLocales, locale } = useI18n()

const toggleLocales = () => {
  const locales = availableLocales
  locale.value = locales[(locales.indexOf(locale.value) + 1) % locales.length]
}
</script>

<template>
  <nav text-xl mt-6>
    <RouterLink class="icon-btn mx-2" to="/" :title="t('button.home')">
      <div i-carbon-campsite />
    </RouterLink>

    <button class="icon-btn mx-2 !outline-none" :title="t('button.toggle.language')" @click="toggleLocales()">
      <div i="carbon-language" />
    </button>

    <button class="icon-btn mx-2 !outline-none" :title="t('button.toggle_dark')" @click="toggleDark()">
      <div i="carbon-sun dark:carbon-moon" />
    </button>

    <a class="icon-btn mx-2" rel="noreferrer" href="https://github.com/florianbruening/roadsurfer" target="_blank" title="GitHub">
      <div i-carbon-logo-github />
    </a>
    <div class="text-sm">
      <a target="_blank" href="https://icons8.com/icon/PTx98y4GSxBG/van">Van</a> &
      <a target="_blank" href="https://icons8.com/icon/SGLlYIY8kkK2/ocean-wave">Ocean Wave</a> icon by <a target="_blank" href="https://icons8.com">Icons8</a>
    </div>
  </nav>
</template>
