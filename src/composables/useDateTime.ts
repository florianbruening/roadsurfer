import { useI18n } from 'vue-i18n'

export const useDateTime = () => {
  const { locale } = useI18n()

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat(locale.value, { dateStyle: 'long', hour12: false }).format(date)
  }

  const formatDateTime = (date: Date) => {
    return new Intl.DateTimeFormat(locale.value, { dateStyle: 'medium', timeStyle: 'medium', hour12: false }).format(date)
  }

  const getFirstDayOfTheWeek = (date: Date) => {
    const start = new Date(date)
    const first = start.getDate() - start.getDay() + 1

    const monday = new Date(start.setDate(first))

    return monday
  }

  const getLastDayOfTheWeek = (date: Date) => {
    const start = new Date(date)
    const last = start.getDate() - start.getDay() + 7

    const sunday = new Date(start.setDate(last))

    return sunday
  }

  const dateIsEqual = (date1: Date, date2: Date) => {
    const d1 = new Date(date1)
    const d2 = new Date(date2)
    d1.setMilliseconds(0)
    d1.setSeconds(0)
    d1.setMinutes(0)
    d1.setHours(0)

    d2.setMilliseconds(0)
    d2.setSeconds(0)
    d2.setMinutes(0)
    d2.setHours(0)
    return d1.getTime() === d2.getTime()
  }

  const getTimeFromDateTime = (date: Date) => {
    return date.toLocaleTimeString('de').substring(0, 5)
  }

  return {
    formatDate,
    dateIsEqual,
    getFirstDayOfTheWeek,
    getLastDayOfTheWeek,
    getTimeFromDateTime,
    formatDateTime,
  }
}
