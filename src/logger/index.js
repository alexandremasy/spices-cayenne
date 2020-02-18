import Level from '../level'
import ConsoleTransporter from './transports/console'
import DefaultInterface from './interfaces'

class Logger {

  /**
   * Constructor
   */
  constructor(){
    this.transports = [ new ConsoleTransporter() ];
    this.interfaces = [];
  }

  /**
   * Get a new interface to log from
   * @param  {Object} opts    The configuration object
   * @return {Interface}      An interface to log from
   */
  get(opts){
    let options = {
      colors: opts && opts.colors ? opts.colors : true,
      formatter: opts && opts.fomatter ? opts.formatter : this._formatter,
      level: opts && opts.level ? Logger.getFromValue(opts.value) : Level.ALL,
      name: opts && opts.name ? opts.name : null,
      handler: this
    };

    let ret = new DefaultInterface(options);
    this.interfaces.push(ret);
    return ret;
  }

  /**
   * Set the interface options
   * @param {*} opts 
   */
  set(opts){
    let options = {
      colors: opts && opts.colors ? opts.colors : true,
      formatter: opts && opts.fomatter ? opts.formatter : this._formatter,
      level: opts && opts.level ? Logger.getFromValue(opts.value) : Level.ALL,
      name: opts && opts.name ? opts.name : null,
      handler: this
    }

    this.interfaces.forEach(iface => iface.update(options));
  }

  _formatter({level, messages, name}){
    let d = new Date();
    let months = ['Jan', 'Feb', 'Mar', 'Apr', 'Mai', 'Jun', 'Jui', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    let date = `${months[d.getMonth()]} ${d.getDate()}, ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`;

    let grey = 'color: lightgrey';
    let orange = 'color: orange';
    let blue = 'color: lightsteelblue';
    let black = 'color: black';
    let purple = 'color: rebeccapurple';

    // style - date - style - ...rest
    let m = [
      '%c %s %c',
      grey,
      date,
      black
    ];

    if (name) {
      // style - date - style - name - style - ...rest
      m = [
        '%c %s %c %s %c',
        grey,
        date,
        purple,
        name,
        black
      ];
    }

    return m.concat(messages);
  }

  /**
   * Get the messages to the transporters
   * @param  {Level} level      Level of the messages
   * @param  {String} action    The action to take
   * @param  {Object} context   Context of the interface
   * @param  {*} messages       Messages to transport
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
