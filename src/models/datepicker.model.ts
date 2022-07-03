export interface IEvent {
  bookingId: string
  customerName: string
  isStart: boolean
  position: number
  dateTime: Date
  day: number
  time: string
}

export interface IDayTile {
  date: string
  day?: number
  shortName: string
  events: IEvent[]
}
