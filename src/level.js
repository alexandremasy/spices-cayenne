class Level {
  static get OFF(){ return {name: 'OFF', value: 0} };
  static get TRACE(){ return {name: 'TRACE', value: 1} };
  static get DEBUG(){ return {name: 'DEBUG', value: 2} };
  static get INFO(){ return {name: 'INFO', value: 4} };
  static get TIME(){ return {name: 'TIME', value: 8} };
  static get WARN(){ return {name: 'WARN', value: 16} };
  static get ERROR(){ return {name: 'ERROR', value: 32} };
  static get ALL(){ return {name: 'ALL', value: 63} };

  /**
   * Get the level from its value
   * @param  {Int} value The level value
   * @return {Level|null}     The level object or null
   */
  static getFromValue(value){
    let ret = null;
    const list = [Level.OFF, Level.TRACE, Level.DEBUG, Level.INFO, Level.TIME, Level.WARN, Level.ERROR, Level.ALL];
    list.forEach((e, i) => {
      if (e.value === value){
        ret = e;
      }
    })

    return ret;
  }
}

export default Level
