<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useStationsStore } from '~/store/stations'

const stationsStore = useStationsStore()

const { stations, selectedStation } = storeToRefs(stationsStore)

const { loadStations, setStation } = stationsStore

onMounted(() => loadStations())
</script>

<template>
  <auto-complete item-text="name" :auto-complete-data="stations" :value="selectedStation" @item-selected="setStation">
    <template #auto-complete-item="{ item }">
      {{ item?.name }}
    </template>
  </auto-complete>
</template>
