import Level from '../level'
import ConsoleTransporter from './transports/console'
import DefaultInterface from './interfaces'

class Logger {

  /**
   * Constructor
   */
  constructor(){
    this.transports = [ new ConsoleTransporter() ];
  }

  /**
   * Get a new interface to log from
   * @param  {Object} opts    The configuration object
   * @return {Interface}      An interface to log from
   */
  get(opts){
    let options = {
      color: opts && opts.colors ? opts.colors : true,
      formatter: opts && opts.fomatter ? opts.formatter : this._formatter,
      level: opts && opts.level ? Logger.getFromValue(opts.value) : Level.ALL,
      name: opts && opts.name ? opts.name : null,
      handler: this
    };

    return new DefaultInterface(options);
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
   * @param  {Object} context   Context of the interface
   * @param  {*} messages       Messages to transport
   */
  _invoke({level, context, messages }) {
    messages = Array.prototype.slice.call( messages );
    messages = context.formatter.call(context.formatter, {level, messages, name: context.name});

    this.transports.forEach((transport) => {
      transport.invoke({
        level,
        context,
        messages: messages
      })
    })
  }
}

const L = new Logger();
export default L;
