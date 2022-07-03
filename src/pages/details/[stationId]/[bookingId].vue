<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { api } from '~/plugins/api'
import type { IBooking, IStation } from '~/models/api.model'
import { useDateTime } from '~/composables/useDateTime'
import { useStationsStore } from '~/store/stations'

const { formatDateTime } = useDateTime()

const { t } = useI18n()

const router = useRouter()
const route = useRoute()

const stationsStore = useStationsStore()
const station = ref<IStation>()

const { getStoreById } = stationsStore

const details = ref<IBooking>()
const isLoading = ref(true)

onMounted(() => {
  station.value = getStoreById(route.params.stationId)
  api.getBookingDetails(route.params.stationId, route.params.bookingId)
    .then((response) => {
      details.value = JSON.parse(response.data)
    })
    .finally(() => {
      setTimeout(() => {
        isLoading.value = false
      }, 2000)
    })
})

const dateRange = computed(() => {
  if (!details.value?.startDate || !details.value?.endDate)
    return ''
  return `${formatDateTime(new Date(details.value?.startDate))} - ${formatDateTime(new Date(details.value?.endDate))}`
})
</script>

<template>
  <section class="flex flex-col items-center justify-center ">
    <h2 class="h-20 text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-600">
      {{ t('details.caption') }}
    </h2>
    <Spinner v-if="isLoading" class="mt-4" />
    <div v-else class="text-left border border-dark-500 dark:border-white rounded-lg overflow-hidden">
      <img src="https://images.unsplash.com/photo-1534437401535-8cdaa9b93ae4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80" alt="" class="object-cover w-full h-60">
      <dl class="mt-4 py-4 px-4">
        <div class="grid grid-cols-3 gap-4 px-6">
          <dt class="flex text-lg">
            <div class="i-carbon-user" />
            <span class="ml-2">{{ t('details.information.customer') }}</span>
          </dt>
          <dd>
            {{ details?.customerName }}
          </dd>
        </div>
        <div class="py-2 grid grid-cols-3 gap-4 px-6">
          <dt class="flex text-lg">
            <div class="i-carbon-earth" />
            <span class="ml-2">{{ t('details.information.station') }}</span>
          </dt>
          <dd>
            {{ station?.name }}
          </dd>
        </div>
        <div class="py-2 grid grid-cols-3 gap-4 px-6">
          <dt class="flex text-lg">
            <div class="i-carbon-calendar" />
            <span class="ml-2">{{ t('details.information.startdate') }}</span>
          </dt>
          <dd>
            {{ formatDateTime(new Date()) }}
          </dd>
        </div>
        <div class="py-2 grid grid-cols-3 gap-4 px-6">
          <dt class="flex text-lg">
            <div class="i-carbon-calendar" />
            <span class="ml-2">{{ t('details.information.enddate') }}</span>
          </dt>
          <dd>
            {{ formatDateTime(new Date()) }}
          </dd>
        </div>
        <div class="py-2 grid grid-cols-3 gap-4 px-6">
          <dt class="flex text-lg">
            <div class="i-carbon-time" />
            <span class="ml-2">{{ t('details.information.duration') }}</span>
          </dt>
          <dd>
            {{ formatDateTime(new Date()) }}
          </dd>
        </div>
      </dl>
    </div>
    <button class="mt-8 bg-blue-600 hover:bg-blue-800 transition-all text-white rounded-lg py-2 px-4" @click="router.back">
      {{ t('button.back') }}
    </button>
  </section>
</template>

<route lang="yaml">
meta:
  layout: subpage
</route>
