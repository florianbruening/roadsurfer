<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useStationsStore } from '~/store/stations'
import { useCalendarStore } from '~/store/calendar'

const { t } = useI18n()
const calendarStore = useCalendarStore()
const stationStore = useStationsStore()
const { selectedStation } = storeToRefs(stationStore)
const { setStation, getStoreById } = stationStore

const route = useRoute()

const dateFrom = ref<Date>(new Date('2021-07-17'))

const setToday = () => {
  dateFrom.value = new Date()
}

const setDateFrom = (daysToAdd: number) => {
  dateFrom.value = new Date(dateFrom.value.setDate(dateFrom.value.getDate() + daysToAdd))
}

onMounted(() => {
  if (route.params.stationId)
    setStation(getStoreById(route.params.stationId as string))
})
</script>

<template>
  <section class="flex flex-col items-center justify-center">
    <div>
      <h2 class="text-gray-800 dark:text-white font-semibold">
        {{ t('home.select-station') }}
      </h2>
      <StationAutoComplete @item-selected="stationStore.setStation" />
    </div>
    <Datepicker v-if="selectedStation" class="mt-4" :date-from="dateFrom" :station="selectedStation" @previous-week="setDateFrom(-7)" @next-week="setDateFrom(7)" @today="setToday" />
  </section>
</template>

<route lang="yaml">
meta:
  layout: home
</route>
