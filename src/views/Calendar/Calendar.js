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
  calendarWeeks,
  currentMonth: {
    info: {
      name_long: month_name
    }
  },
} = myCal;

addEventsToCalendar(calendarList, dummy_data);

const Calendar = () => {

  const renderEvent = (event, eventIdx) =>{
    if(event){
      return (
        <div key={`${event.title}-${eventIdx}`} className={style.event} style={{ background: shc.convert(event.title) }}>
          {event.status.start || event.status.end ? `• ${event.title}` : ''}
        </div>
      )
    }
    return (
      <div key={`no-event-${eventIdx}`} className={style.event}>
      </div>
    )
  };

  const renderDay = (day, dayKey) => {
    const {
      events,
      info: {
        // cal_day_index,
        // name_short,
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
      <div key={dayKey} className={dayStyle}>
        <div className={style.month_day_number}>
          {month_day_index === 1 ? `${month_short} ${month_day_index}` : month_day_index}
        </div>

        {events.map(renderEvent)}
      </div>
    )
  };

  const renderWeek = (calendarWeek) =>{
    return calendarWeek.map(renderDay)
  };

  const renderMonth = (calendarMonth) =>{
    return calendarMonth.map(renderDay)
  };


  return (
    <div className={style.container}>

      <h3>
        {month_name}, {year}
      </h3>

      <Link to="/" className={style.link}>
        Home
      </Link>

      <div className={style.cal_container}>

        {weekDays.map(weekDay => (
          <div key={weekDay.week_day_number} className={style.week_day_header}>
            {weekDay.name_short}
          </div>
        ))}

        {renderMonth(calendarList)}
        {/*{renderWeek(calendarWeeks[0])}*/}
      </div>

    </div>
  )
};

export default Calendar
