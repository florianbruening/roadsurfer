import { acceptHMRUpdate, defineStore } from 'pinia'
import type { IStation } from '~/models/api.model'
import { api } from '~/plugins/api'

export const useStationsStore = defineStore('stations', () => {
  const selectedStation = ref<IStation>()
  const stations = ref<IStation[]>([])
  const loadStations = () => {
    stations.value.splice(0)
    return api.getStations().then(({ data }) => {
      stations.value.push(...JSON.parse(data))
      return Promise.resolve(data)
    })
      .catch(error => Promise.reject(error))
  }

  const setStation = (newStation: IStation | undefined) => {
    selectedStation.value = newStation
  }

  const getStoreById = (id: string): IStation | undefined => {
    return stations.value.find(station => station.id === id)
  }

  return {
    selectedStation,
    stations,
    loadStations,
    setStation,
    getStoreById,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useStationsStore, import.meta.hot))
