import type { IBooking } from '~/models/api.model'
import type { IEvent } from '~/models/datepicker.model'
import { useDateTime } from '~/composables/useDateTime'

export const useBookings = () => {
  const { dateIsEqual, getTimeFromDateTime } = useDateTime()

  const bookingToEventMapper = (booking: IBooking, tileDate: Date): IEvent => {
    const eventTime = dateIsEqual(tileDate, new Date(booking.startDate)) ? new Date(booking.startDate) : new Date(booking.endDate)
    return {
      bookingId: booking.id,
      customerName: booking.customerName,
      isStart: dateIsEqual(tileDate, new Date(booking.startDate)),
      day: tileDate.getDay() === 0 ? 6 : tileDate.getDay(),
      dateTime: eventTime,
      position: Math.ceil((eventTime.getHours() * 60 + eventTime.getMinutes()) / 5),
      time: getTimeFromDateTime(eventTime),
    }
  }

  const getBookingsForDate = (bookings: IBooking[], tileDate: Date) => {
    return bookings.filter(booking => dateIsEqual(new Date(booking.startDate), tileDate) || dateIsEqual(new Date(booking.endDate), tileDate)).map(booking => bookingToEventMapper(booking, tileDate))
  }

  return {
    getBookingsForDate,
  }
}
