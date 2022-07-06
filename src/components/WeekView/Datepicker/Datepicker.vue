<!-- This example requires Tailwind CSS v2.0+ -->
<script setup lang="ts">
import { computed, toRefs } from 'vue'
import { useI18n } from 'vue-i18n'
import { storeToRefs } from 'pinia'
import type { IDayTile, IEvent } from '~/models/datepicker.model'
import type { IStation } from '~/models/api.model'
import { useBookings } from '~/composables/useBookings'
import { useCalendarStore } from '~/store/calendar'

const props = defineProps<{
  dateFrom: Date
  station: IStation
}>()

const emit = defineEmits<{
  (e: 'today'): void
  (e: 'previousWeek'): void
  (e: 'nextWeek'): void
}>()

const calendarStore = useCalendarStore()
const { startOfTheWeek, endOfTheWeek } = storeToRefs(calendarStore)

const { t, locale } = useI18n()

const { dateFrom, station } = toRefs(props)

const { formatDate } = useDateTime()

const { getBookingsForDate } = useBookings()

const formatTime = (time: number) => {
  if (time >= 10)
    return `${time}:00`
  return `0${time}:00`
}

const calendar = computed(() => {
  const dates: IDayTile[] = []
  const events: IEvent[] = []

  for (let d = new Date(startOfTheWeek.value); d <= endOfTheWeek.value; d.setDate(d.getDate() + 1)) {
    dates.push(
      {
        date: formatDate(d),
        day: d.getDate(),
        dateTime: new Date(d),
        shortName: t(`day.${d.getDay()}`),
        events: [...getBookingsForDate(station.value.bookings, d)],
      },
    )

    events.push(
      ...getBookingsForDate(station.value.bookings, d),
    )
  }
  return { dates, events }
})

const currentMonth = computed(() => {
  const month = dateFrom.value.getMonth()
  return { long: new Intl.DateTimeFormat(locale.value, { month: 'long', year: 'numeric' }).format(dateFrom.value), date: `${dateFrom.value.getFullYear()}-${month >= 10 ? month : `0${month}`}` }
})
</script>

<template>
  <div class="flex h-full flex-col bg-gray-100 dark:bg-dark-400 text-gray-900 dark:text-white p-4 rounded-lg w-screen md:w-9/10">
    <DatepickerHeader :current-month="currentMonth" @today="emit('today')" @previous-week="emit('previousWeek')" @next-week="emit('nextWeek')" />
    <div ref="container" class="flex flex-auto flex-col overflow-auto bg-white dark:bg-dark-500">
      <div style="width: 165%" class="flex max-w-full flex-none flex-col sm:max-w-none md:max-w-full">
        <DatepickerNavigation :dates="calendar.dates" />

        <div class="flex flex-auto">
          <div class="sticky left-0 z-10 w-14 flex-none bg-white dark:bg-dark-500  ring-1 ring-gray-100" />
          <div class="grid flex-auto grid-cols-1 grid-rows-1">
            <!-- Horizontal lines -->
            <div class="col-start-1 col-end-2 row-start-1 grid divide-y divide-gray-100 dark:divide-white" style="grid-template-rows: repeat(24, minmax(3.5rem, 1fr))">
              <div ref="containerOffset" class="row-end-1 h-7" />
              <template v-for="i in 24" :key="i">
                <div>
                  <div class="sticky left-0 z-20 -mt-2.5 -ml-14 w-14 pr-2 text-right text-xs leading-5 text-gray-400 dark:text-white">
                    {{ formatTime(i - 1) }}
                  </div>
                </div>
              </template>
            </div>

            <!-- Vertical lines -->
            <div class="col-start-1 col-end-2 row-start-1 hidden grid-cols-7 grid-rows-1 divide-x divide-gray-100 dark:divide-white sm:grid sm:grid-cols-7">
              <div class="col-start-1 row-span-full" />
              <div class="col-start-2 row-span-full" />
              <div class="col-start-3 row-span-full" />
              <div class="col-start-4 row-span-full" />
              <div class="col-start-5 row-span-full" />
              <div class="col-start-6 row-span-full" />
              <div class="col-start-7 row-span-full" />
              <div class="col-start-8 row-span-full w-8" />
            </div>

            <!-- Events -->
            <DatepickerEvents :events="calendar.events" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
