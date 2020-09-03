/**
 * @class
 */
export default class Level {

  /**
   * @readonly
   * @static
   */
  static get OFF(){ return {name: 'OFF', value: 0} };
  
  /**
   * @readonly
   * @static
   */
  static get TRACE(){ return {name: 'TRACE', value: 1} };
  
  /**
   * @readonly
   * @static
   */
  static get DEBUG(){ return {name: 'DEBUG', value: 2} };
  
  /**
   * @readonly
   * @static
   */
  static get INFO(){ return {name: 'INFO', value: 4} };
  
  /**
   * @readonly
   * @static
   */
  static get TIME(){ return {name: 'TIME', value: 8} };
 
  /**
   * @readonly
   * @static
   */
  static get WARN(){ return {name: 'WARN', value: 16} };
  
  /**
   * @readonly
   * @static
   */
  static get ERROR(){ return {name: 'ERROR', value: 32} };
  
  /**
   * @readonly
   * @static
   */
  static get ALL(){ return {name: 'ALL', value: 63} };

  /**
   * Get the level from its value
   * @param  {Int} value The level value
   * @return {Level|null}     The level object or null
   */
  static getFromValue(value){
    return [Level.OFF, Level.TRACE, Level.DEBUG, Level.INFO, Level.TIME, Level.WARN, Level.ERROR, Level.ALL].find(e => e.value === value)
  }
}
