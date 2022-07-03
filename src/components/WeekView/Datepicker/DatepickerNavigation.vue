<script setup lang="ts">
import type { IDayTile } from '~/models/datepicker.model'

defineProps<{
  dates: IDayTile[]
}>()
</script>

<template>
  <div class="sticky top-0 z-30 flex-none shadow ring-1 ring-black ring-opacity-5 sm:pr-8">
    <div class="grid grid-cols-7 text-sm leading-6 text-gray-500 dark:text-white sm:hidden">
      <button v-for="date in dates" :key="date.date" type="button" class="flex flex-col items-center pt-2 pb-3">
        {{ date.shortName.substring(0, 1) }}
        <span class="mt-1 flex h-8 w-8 items-center justify-center font-semibold text-gray-900 dark:text-white">{{ date.day }}</span>
      </button>
    </div>

    <div class="-mr-px hidden grid-cols-7 divide-x border-b divide-gray-100 dark:divide-white border-r border-gray-100 dark:border-white  text-sm leading-6 text-gray-500 dark:text-white sm:grid">
      <div class="col-end-1 w-14" />
      <div v-for="date in dates" :key="date.date" class="flex items-center justify-center py-3">
        <span>{{ date.shortName }} <span class="items-center justify-center font-semibold text-gray-900 dark:text-white">{{ date.day }}</span></span>
      </div>
    </div>
  </div>
</template>
