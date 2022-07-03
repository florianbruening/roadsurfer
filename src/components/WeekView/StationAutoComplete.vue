<script setup lang="ts">
import { useStationsStore } from '~/store/stations'

const { stations, loadStations, setStation } = useStationsStore()

onMounted(() => loadStations())
</script>

<template>
  <auto-complete item-text="name" :auto-complete-data="stations" @item-selected="setStation">
    <template #auto-complete-item="{ item }">
      {{ item?.name }}
    </template>
  </auto-complete>
</template>
