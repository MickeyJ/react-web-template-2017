

export default class Day{
  constructor(info){
    this.info = info;
    this._events = []
  }

  get info(){
    return this._info
  }
  set info(x){
    this._info = x;
  }

  get events(){
    return this._events;
  }
  get hasEvents(){
    return this.events.length;
  }

  addEvent(event){
    this.events.push(event)
  }

}