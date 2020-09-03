import Level from '../../level'

/**
 * @abstract
 * @interface
 * @class
 */
export default class AbstractInterface {

  /**
   * @constructor
   * @param {Object} options
   * @param {Boolean} options.colors
   * @param {Function} options.formatter
   * @param {Level} options.level
   * @param {String} options.name
   * @param {Function} options.handler
   */
  constructor({colors, formatter, level, name, handler}){
    this.colors = colors;
    this.formatter = formatter;
    this.level = level;
    this.name = name;
    this.handler = handler;
  }

  /**
   * Return the logger level
   * @return {Level} The level
   */
  get level(){
    return this._level;
  }

  /**
   * Define the logger level
   * @param  {Level} value The level
   */
  set level(value){
    if (value && value.hasOwnProperty('value')){
      this._level = value;
    }
  }

  /**
   * Return the context of the interace
   * @return {Object}
   */
  get context(){
    return {
      colors: this.colors,
      formatter: this.formatter,
      level: this.level,
      name: this.name
    }
  }

  /**
   * Is the logger enabled for the given level
   * @param  {Level} level The level to evaluate
   * @return {Boolean}
   */
  enabledFor(level){
    return this._level.value & level.value;
  }

  /**
   * Get a new interface to log from
   * @param  {Object} opts    The configuration object
   * @return {Interface}      An interface to log from
   */
  get(opts){
    return this.handler.get(opts);
  }

  /**
   * Update the interface options
   * @param {Boolean} colors 
   * @param {Function} formatter 
   * @param {Level} level 
   * @param {String} name 
   * @param {Logger} handler 
   */
  update({colors, formatter, level, name, handler}){
    this.colors = colors;
    this.formatter = formatter;
    this.level = level;
    this.name = name;
    this.handler = handler;
  }

  /**
   * Invoke the handler if the level is enabled
   * @param  {Level} level    The level of the messages
   * @param  {String} action  The action to take
   * @param  {*}     messages The messages
   */
  _invoke({action, level, messages}) {
    if (this.enabledFor(level)){
      this.handler._invoke({action, level, context: this.context, messages});
    }
  }
}
