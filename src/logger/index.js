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
      color: opts && opts.color ? opts.colors : true,
      format: opts && opts.fomat ? opts.format : "name | messages | date",
      level: opts && opts.level ? Logger.getFromValue(opts.value) : Level.ALL,
      name: opts && opts.name ? opts.name : null,
      handler: this
    };

    return new DefaultInterface(options);
  }

  /**
   * Get the messages to the transporters
   * @param  {Level} level      Level of the messages
   * @param  {Object} context   Context of the interface
   * @param  {*} messages       Messages to transport
   */
  _invoke({level, context, messages }) {
    this.transports.forEach((transport) => {
      transport.invoke({level, context, messages})
    })
  }
}

const L = new Logger();
export default L;
