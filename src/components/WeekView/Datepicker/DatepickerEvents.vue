<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { storeToRefs } from 'pinia'
import type { IEvent } from '~/models/datepicker.model'
import { useStationsStore } from '~/store/stations'

defineProps<{
  events: IEvent[]
}>()

const stationStore = useStationsStore()

const { selectedStation } = storeToRefs(stationStore)

const { t } = useI18n()
</script>

<template>
  <ol class="col-start-1 col-end-2 row-start-1 grid grid-cols-1 sm:grid-cols-7 sm:pr-8" style="grid-template-rows: 1.75rem repeat(288, minmax(0, 1fr)) auto">
    <li v-for="event in events" v-if="selectedStation" :key="event.bookingId" class="relative mt-px flex" :class="`col-start-${event.day} `" :style="`grid-row: ${event.position} / span 12`">
      <router-link :to="{ name: 'details-stationId-bookingId', params: { stationId: selectedStation.id, bookingId: event.bookingId } }" :class="[event.isStart ? 'bg-blue-50 hover:bg-blue-100 dark:bg-blue-800 dark:hover:bg-blue-600' : 'bg-teal-50 hover:bg-teal-100 dark:bg-teal-800 dark:hover:bg-teal-600']" class="group absolute inset-1 flex flex-col overflow-y-auto rounded-lg  p-2 text-xs leading-5 ">
        <p :class="[event.isStart ? 'text-blue-700 dark:text-blue-300' : 'text-teal-700 dark:text-teal-300']" class="order-1 font-semibold">
          <span v-if="event.isStart">{{ t('calendar.pickup', { customerName: event.customerName }) }}</span>
          <span v-else>{{ t('calendar.returnal', { customerName: event.customerName }) }}</span>
        </p>
        <p :class="[event.isStart ? 'text-blue-500 group-hover:text-blue-70 dark:text-blue-100' : 'text-teal-500 group-hover:text-teal-70 dark:text-teal-100']">
          <time :datetime="event.dateTime.toLocaleDateString()">{{ event.time }}</time>
        </p>
      </router-link>
    </li>
  </ol>
</template>
