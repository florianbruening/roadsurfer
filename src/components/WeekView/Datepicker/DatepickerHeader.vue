<script setup lang="ts">
import { useI18n } from 'vue-i18n'

defineProps<{
  currentMonth: {
    date: string
    long: string
  }
}>()

const emit = defineEmits<{
  (e: 'today'): void
  (e: 'previousWeek'): void
  (e: 'nextWeek'): void
}>()

const { t } = useI18n()
</script>

<template>
  <header class="relative z-40 flex flex-none items-center justify-between border-b border-gray-200 py-4 px-6">
    <h1 class="text-lg font-semibold text-gray-900 dark:text-white">
      <time :datetime="currentMonth.date">{{ currentMonth.long }}</time>
    </h1>
    <div class="flex items-center">
      <div class="flex items-center rounded-md shadow-sm md:items-stretch">
        <button type="button" class="flex items-center justify-center rounded-l-md border border-r-0 border-gray-300 bg-white dark:bg-dark-500 dark:text-white dark:hover:bg-dark-300 py-2 pl-3 pr-4 text-gray-400 light:hover:text-gray-500 focus:relative md:w-9 md:px-2 md:hover:bg-gray-50" @click="emit('previousWeek')">
          <div class="h-5 w-5 i-carbon-arrow-left" aria-hidden="true" />
        </button>
        <button type="button" class="hidden border-t border-b border-gray-300 bg-white dark:bg-dark-500 dark:text-white dark:hover:bg-dark-300 px-3.5 text-sm font-medium text-gray-700 hover:bg-gray-50 light:hover:text-gray-900 focus:relative md:block" @click="emit('today')">
          {{ t('calendar.today') }}
        </button>
        <span class="relative -mx-px h-5 w-px bg-gray-300 md:hidden" />
        <button type="button" class="flex items-center justify-center rounded-r-md border border-l-0 border-gray-300 bg-white dark:hover:bg-dark-300 dark:bg-dark-500 dark:text-white py-2 pl-4 pr-3 text-gray-400 light:hover:text-gray-500 focus:relative md:w-9 md:px-2 md:hover:bg-gray-50" @click="emit('nextWeek')">
          <div class="h-5 w-5 i-carbon-arrow-right" aria-hidden="true" />
        </button>
      </div>
    </div>
  </header>
</template>
