import { acceptHMRUpdate, defineStore } from 'pinia'

export const useCalendarStore = defineStore('calendar', () => {
  const dateFrom = ref<Date>(new Date('2021-07-17'))

  const selectPreviousWeek = () => {
    dateFrom.value = new Date(dateFrom.value.setDate(dateFrom.value.getDate() - 7))
  }

  const selectNextWeek = () => {
    dateFrom.value = new Date(dateFrom.value.setDate(dateFrom.value.getDate() + 7))
  }

  const selectToday = () => {
    dateFrom.value = new Date()
  }

  return {
    dateFrom,
    selectPreviousWeek,
    selectNextWeek,
    selectToday,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useStationsStore, import.meta.hot))
