import CalendarApi from 'react-google-calendar-api'
import { checkIsServer } from 'src/helpers/shared'

export const googleCalendarApi = !checkIsServer()
  ? new CalendarApi({
      clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || '',
      apiKey: process.env.NEXT_PUBLIC_GOOGLE_CALENDAR_API_KEY || '',
      scope: 'https://www.googleapis.com/auth/calendar.events',
      discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest'],
    })
  : null
