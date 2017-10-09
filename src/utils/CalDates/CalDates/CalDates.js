import moment from 'moment'
import _ from 'lodash'

import Day from './Day'

import {
  months,
  weekDays,
} from '../assets'

const PREV = 'PREV';
const CURR = 'CURR';
const NEXT = 'NEXT';

const _now = moment();

export default class CalDates{
  constructor(options = {}){

    const {
      date_format = 'YYYY-MM',
      date_string = _now.format(date_format),
      daysInCalendar = 42,
    } = options;

    this._date_format = date_format;
    this._date_string = date_string;
    this._daysInCalendar = daysInCalendar;

    this._date = moment(this._date_string);
    this._year = this.date.format('YYYY');

    this._structure = generateCalStructure(this.daysInCalendar);

    this._months = {};
    this._calendar = {};

    this._generateMonths();
    this._generateCalendar();
  }

  get date(){
    return this._date
  }

  get year(){
    return this._year;
  }

  get daysInCalendar(){
    return this._daysInCalendar;
  }

  get months(){
    return this._months;
  }

  get weekDays(){
    return formatWeekDays();
  }

  get structure(){
    return this._structure;
  }

  get previousMonth(){
    return this.months[PREV];
  }
  get currentMonth(){
    return this.months[CURR];
  }
  get nextMonth(){
    return this.months[NEXT];
  }


  get calendar(){
    return this._calendar
  }
  get calendarList(){
    return _
      .chain(this._calendar)
      .valuesIn()
      .orderBy(['cal_day_index'], ['asc'])
      .value();
  }

  _getDayString(month_type, day){
    return `${this.year}-${parseDateNumber(this.months[month_type].number)}-${parseDateNumber(day)}`;
  }

  _generateMonths(){

    const monthDates = [
      [PREV, this.date.clone().subtract(1, 'month')],
      [CURR, this.date],
      [NEXT, this.date.clone().add(1, 'month')],
    ];

    monthDates.forEach(monthDate => {
      const type = monthDate[0];
      const date = monthDate[1];

      const monthNumber = parseInt(date.format('MM'));
      const monthInfo = months[monthNumber];

      this._months[type] = {
        number: monthNumber,
        numberOfDays: numberOfDaysInMonth(date),
        info: {
          ...monthInfo,
          type,
        },
      }
    });
  }

  _generateCalendar(){

    const firstCurrentMonthDayNumber = parseDateNumber(this.date.day() + 1);

    const firstCalDayIndex = this.structure.findIndex(calDay => calDay.week_day_number === firstCurrentMonthDayNumber) + 1;
    const lastCalDayIndex = this.months[CURR].numberOfDays + firstCalDayIndex;

    let previousMonthDayIndex = this.months[PREV].numberOfDays - (firstCalDayIndex - 2);
    let currentMonthDayIndex = 1;
    let nextMonthDayIndex = 1;

    this.structure.forEach((calDay) => {

      const {
        cal_day_index: calDayIndex,
      } = calDay;

      let month_type = '';
      let month_day_index = 0;

      const updatePosition = (monthType, dayIndex) =>{
        month_type = monthType;
        month_day_index = dayIndex;
      };

      // Last Month
      if(calDayIndex < firstCalDayIndex) {
        updatePosition(PREV, previousMonthDayIndex++);
      }

      // Current Month
      else if(calDayIndex < lastCalDayIndex) {
        updatePosition(CURR, currentMonthDayIndex++);
      }

      // Next Month
      else {
        updatePosition(NEXT, nextMonthDayIndex++);
      }

      const date_string = this._getDayString(month_type, month_day_index);

      this.calendar[date_string] = new Day({
        ...calDay,
        date_string,
        month_day_index,
        month_day_number: parseDateNumber(month_day_index),
        month: this.months[month_type].info,
      })

    });

  }

}

export function formatWeekDays(){
  return _
    .chain(weekDays)
    .valuesIn()
    // .orderBy(['order'], ['asc'])
    .value();
}

function generateCalStructure(calendarDays){
  const result = [];
  const weekDayList = formatWeekDays();

  let week_days = [...weekDayList];

  for(let d = 1; d <= calendarDays; d++){
    if(!week_days.length) week_days = [...weekDayList];
    const weekDay = week_days.shift();
    delete weekDay.order;
    result.push({
      ...weekDay,
      week_day_index: parseInt(weekDay.week_day_number),
      cal_day_index: d,
    });
  }

  return result;
}

function numberOfDaysInMonth(date){
  return date.daysInMonth()
}

function parseDateNumber(number){
  const numberString = `${number}`;
  if(numberString.length === 1) return '0' + numberString;
  return numberString;
}