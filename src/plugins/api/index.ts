import type { App, AppConfig } from 'vue'
import { Axios } from 'axios'
import { ApiInjectionKey } from '~/injectionkeys'
import type { IApi } from '~/models/api.model'

const axios = new Axios({
  baseURL: 'https://605c94c36d85de00170da8b4.mockapi.io',
  headers: {
    'Content-Type': 'application/json',
  },
})

export const api: IApi = {
  getStations() {
    return axios.get('/stations')
  },
  getBookingDetails(stationId: string, bookingId: string) {
    return axios.get(`/stations/${stationId}/bookings/${bookingId}`)
  },
}

const ApiPlugin = {
  install(app: App, _: AppConfig) {
    app.provide(ApiInjectionKey, api)
  },
}

export default ApiPlugin
