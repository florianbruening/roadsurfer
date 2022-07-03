<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useStationsStore } from '~/store/stations'
import { useCalendarStore } from '~/store/calendar'

const { t } = useI18n()
const calendarStore = useCalendarStore()

const { dateFrom } = storeToRefs(calendarStore)
const { selectPreviousWeek, selectNextWeek, selectToday } = calendarStore

const stationStore = useStationsStore()
const { selectedStation } = storeToRefs(stationStore)
</script>

<template>
  <section class="flex flex-col items-center justify-center h-full">
    <div>
      <Logo class="text-5xl sm:text-6xl md:text-8xl" image-size="h-10 sm:h-16 md:h-20" />
      <h2 class="text-base sm:text-xl font-semibold">
        your only limit is your <span class="font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-red-600">imagination</span>
      </h2>
      <p />
    </div>
    <div class=" mt-8">
      <h3 class="text-gray-800 dark:text-white ">
        {{ t('home.select-station') }}
      </h3>
      <StationAutoComplete @item-selected="stationStore.setStation" />
    </div>
    <Datepicker v-if="selectedStation" class="mt-4" :date-from="dateFrom" :station="selectedStation" @previous-week="selectPreviousWeek" @next-week="selectNextWeek" @today="selectToday" />
  </section>
</template>
