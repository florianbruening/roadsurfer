import type { AxiosResponse } from 'axios'

export interface IApi {
  getStations: () => Promise<AxiosResponse<any, any>>
  getBookingDetails: (stationId: string, bookingId: string) => Promise<AxiosResponse<any, any>>
}

export interface IBooking {
  id: string
  pickupReturnStationId: string
  customerName: string
  startDate: string
  endDate: string
}

export interface IStation {
  id: string
  name: string
  bookings: IBooking[]
}
