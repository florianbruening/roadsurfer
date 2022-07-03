<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { api } from '~/plugins/api'
import type { IBooking } from '~/models/api.model'
import { useDateTime } from '~/composables/useDateTime'

const { formatDateTime } = useDateTime()

const { t } = useI18n()

const router = useRouter()
const route = useRoute()

const details = ref<IBooking>()

onMounted(() => {
  api.getBookingDetails(route.params.stationId, route.params.bookingId)
    .then((response) => {
      details.value = JSON.parse(response.data)
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
    <div class="text-start max-w-3xl border border-gray-400 dark:border-teal-600">
      <div class="flex items-center text-white bg-teal-600 w-full px-4 py-2">
        <button class="block rounded-full bg-teal-700 hover:bg-teal-900 transition-all p-1" @click="router.back">
          <div class="i-carbon-arrow-left" />
        </button>
        <h2 class="ml-4 font-semibold">
          {{ t('details.caption') }}
        </h2>
      </div>
      <div>
        <dl class="divide-y dark:divide-teal-600 divide-gray-400 dark:divide-white">
          <div class="py-5 grid grid-cols-3 gap-4 px-6">
            <dt class="text-sm font-medium ">
              <div class="i-carbon-user" />
            </dt>
            <dd class="mt-1 text-sm  mt-0 col-span-2">
              {{ details?.customerName }}
            </dd>
          </div>
          <div class="py-5 grid grid-cols-3 gap-4 px-6">
            <dt class="text-sm font-medium ">
              <div class="i-carbon-building" />
            </dt>
            <dd class="mt-1 text-sm  sm:mt-0 sm:col-span-2">
              {{ details?.pickupReturnStationId }}
            </dd>
          </div>
          <div class="py-5 grid grid-cols-3 gap-4 px-6">
            <dt class="text-sm font-medium ">
              <div class="i-carbon-calendar" />
            </dt>
            <div class="mt-1 text-sm  sm:mt-0 sm:col-span-2">
              {{ dateRange }}
            </div>
          </div>
        </dl>
      </div>
    </div>
  </section>
</template>
