import moment from 'moment'

import CalDates from './CalDates/CalDates'

export function addEventsToCalendar(calendar, calendarData){

  calendar.forEach(day => {

    const {
      info: {
        date_string,
      }
    } = day;

    const dateTimeStamp = moment(date_string).unix();

    calendarData.forEach(event => {

      const eventStartTimeStamp = moment(event.start_date).unix();
      const eventEndTimeStamp = moment(event.end_date).unix();
      const isStartDate = eventStartTimeStamp === dateTimeStamp;
      const isEndDate = eventEndTimeStamp === dateTimeStamp;

      const eventStatus = {
        start: false,
        active: false,
        end: false,
      };

      if(isStartDate){
        eventStatus.start = true;
      }

      if(isEndDate){
        eventStatus.end = true;
      }

      if(eventStartTimeStamp < dateTimeStamp && eventEndTimeStamp > dateTimeStamp){
        eventStatus.active = true;
      }

      const newEvent = (
        (eventStatus.start || eventStatus.end || eventStatus.active)
          ? {
            ...event,
            status: eventStatus,
            status_type: statusType(eventStatus),
          }
          : null
      );

      day.addEvent(newEvent)

    });

  });

}

function statusType({ start, active, end }){
  let output = 'INACTIVE';
  if(start) output = 'START';
  if(active) output = 'ACTIVE';
  if(end) output = 'END';
  if(start && end) output = 'START_END';
  return output;
}

export { dummy_data } from './assets'

export default CalDates





