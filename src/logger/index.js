import Level from '../level'
import ConsoleTransporter from './transports/console'
import DefaultInterface from './interfaces'

/**
 * @class
 */
class Logger {

  /**
   * @constructor
   */
  constructor(){
    this.transports = [ new ConsoleTransporter() ];
    this.interfaces = [];
  }

  /**
   * Get a new interface to log from
   * 
   * @param  {Object} opts The configuration object
   * @param  {Boolean} [opts.colors = true]
   * @param  {Function} [opts.formatter]
   * @param  {Level} [opts.level]
   * @param  {String} [opts.name]
   * @return {Interface} An interface to log from
   */
  get(opts){
    let ret = new DefaultInterface({
      colors: opts && opts.colors && opts.colors === true,
      formatter: opts && opts.fomatter ? opts.formatter : this._formatter,
      handler: this,
      level: opts && opts.level ? Logger.getFromValue(opts.value) : Level.ALL,
      name: opts && opts.name ? opts.name : null,
    });

    this.interfaces.push(ret);
    return ret;
  }

  /**
   * Set the interface options
   * @param  {Object} opts The configuration object
   * @param  {Boolean} [opts.colors = true]
   * @param  {Function} [opts.formatter]
   * @param  {Level} [opts.level]
   * @param  {String} [opts.name]
   */
  set(opts){
    let options = {
      colors: opts && opts.colors && opts.colors === true,
      formatter: opts && opts.fomatter ? opts.formatter : this._formatter,
      handler: this,
      level: opts && opts.level ? Logger.getFromValue(opts.value) : Level.ALL,
      name: opts && opts.name ? opts.name : null,
    }

    this.interfaces.forEach(iface => iface.update(options));
  }

  /**
   * @param {Object} options 
   * @param {Messages} options.messages 
   * @param {String} options.name 
   * @private
   */
  _formatter({messages, name}){
    let d = new Date();
    let months = ['Jan', 'Feb', 'Mar', 'Apr', 'Mai', 'Jun', 'Jui', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    let date = `${months[d.getMonth()]} ${d.getDate()}, ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`;

    let grey = 'color: lightgrey';
    let orange = 'color: orange';
    let blue = 'color: lightsteelblue';
    let black = 'color: black';
    let purple = 'color: rebeccapurple';
    
    let m = name ? 
            ['%c %s %c %s %c', grey, date, purple, name, black] : // style - date - style - name - style - ...rest
            ['%c %s %c', grey, date, black]; // style - date - style - ...rest

    return m.concat(messages);
  }
          
  /**
   * Get the messages to the transporters
   * 
   * @param {Object} options
   * @param {Level} options.level      Level of the messages
   * @param {String} options.action    The action to take
   * @param {Object} options.context   Context of the interface
   * @param {*} options.messages       Messages to transport
   * @private
   */
  _invoke({level, action, context, messages }) {
    messages = Array.prototype.slice.call( messages );
    if (!action){
      messages = context.formatter.call(context.formatter, {level, messages, name: context.name});
    }

    this.transports.forEach((transport) => {
      transport.invoke({
        action,
        context,
        level,
        messages: messages
      })
    })
  }
}

const L = new Logger();
export default L;
