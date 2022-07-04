import { acceptHMRUpdate, defineStore } from 'pinia'
import { useDateTime } from '~/composables/useDateTime'

export const useCalendarStore = defineStore('calendar', () => {
  const { getFirstDayOfTheWeek, getLastDayOfTheWeek } = useDateTime()

  const dateFrom = ref<Date>(new Date('2021-07-12'))
  const selectedDate = ref<Date>(new Date('2021-07-12'))

  const selectPreviousWeek = () => {
    dateFrom.value = new Date(dateFrom.value.setDate(dateFrom.value.getDate() - 7))
  }

  const selectNextWeek = () => {
    dateFrom.value = new Date(dateFrom.value.setDate(dateFrom.value.getDate() + 7))
  }

  const selectToday = () => {
    dateFrom.value = new Date()
  }

  const setSelectedDate = (date: Date) => {
    selectedDate.value = new Date(date)
  }

  const startOfTheWeek = computed(() => {
    return getFirstDayOfTheWeek(dateFrom.value)
  })

  const endOfTheWeek = computed(() => {
    return getLastDayOfTheWeek(dateFrom.value)
  })

  watch(dateFrom, () => {
    selectedDate.value = getFirstDayOfTheWeek(dateFrom.value)
  })

  return {
    dateFrom,
    selectedDate,
    startOfTheWeek,
    endOfTheWeek,
    selectPreviousWeek,
    selectNextWeek,
    selectToday,
    setSelectedDate,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useStationsStore, import.meta.hot))
