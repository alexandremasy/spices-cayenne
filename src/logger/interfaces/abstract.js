import LoggerLevel from '../../level'

class AbstractInterface{
  constructor({colors, format, level, name, handler}){
    this.colors = colors;
    this.format = format;
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
      format: this.format,
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
   * Invoke the handler if the level is enabled
   * @param  {Level} level    The level of the messages
   * @param  {*}     messages The messages
   */
  _invoke({level, messages}) {
    if (this.enabledFor(level)){
      this.handler._invoke({level, context: this.context, messages});
    }
  }
}

export default AbstractInterface
