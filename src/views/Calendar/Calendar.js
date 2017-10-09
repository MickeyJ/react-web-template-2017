import style from './calendar.module.scss'
import React from 'react'
import { Link } from 'react-router-dom'
import shc from 'string-hash-colour'

import CalDates, {
  addEventsToCalendar,
  dummy_data,
} from '../../utils/CalDates'

const options = {
  date_string: '2017-10',
};

const myCal = new CalDates(options);

const {
  year,
  weekDays,
  calendarList,
  currentMonth: {
    info: {
      name_long: month_name
    }
  },
} = myCal;

addEventsToCalendar(calendarList, dummy_data);

const Calendar = () => (
  <div className={style.container}>

    <h3>
      {month_name}, {year}
    </h3>

    {/*<Link to="/" className={style.link}>*/}
    {/*Home*/}
    {/*</Link>*/}

    <div className={style.cal_container}>

      {weekDays.map(weekDay => (
        <div key={weekDay.week_day_number} className={style.week_day_header}>
          {weekDay.name_short}
        </div>
      ))}

      {calendarList.map((day, idx) => {

        const {
          events,
          info: {
            month_day_index,
            month: {
              name_short: month_short,
              type: month_type,
            },
          }
        } = day;

        let dayStyle = style.day;

        if(month_type === 'CURR'){
          dayStyle += ` ${style.current_month}`
        }

        return (
          <div key={idx} className={dayStyle}>

            <div className={style.month_day_number}>
              {month_day_index === 1 ? `${month_short} ${month_day_index}` : month_day_index}
            </div>

            {events.map((event, eventIdx) => {

              if(event){
                return (
                  <div key={`${event.title}-${idx}-${eventIdx}`} className={style.event} style={{ background: shc.convert(event.title) }}>
                    {event.status.start || event.status.end ? `• ${event.title}` : ''}
                  </div>
                )
              }

              return (
                <div key={`no-event-${idx}-${eventIdx}`} className={style.event}>

                </div>
              )
            })}

          </div>
        )
      })}
    </div>

  </div>
);

export default Calendar
