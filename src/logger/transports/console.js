import AbstractTransport from './abstract'
import Level from '../../level'

/**
 * @class
 */
class ConsoleTransporter extends AbstractTransport {

  /**
   * @readonly
   * @private
   * @property {console}
   */
  get console(){
    return (typeof console === 'undefined') ? null : console;
  }

  /**
   * @param {Object} options 
   * @param {String} options.action 
   * @param {Level} options.level 
   * @param {String} options.name 
   * @param {*} options.message 
   */
  invoke({ action, level, context, messages }) {
    // check for the presence of console
    if (!this.console){
      return;
    }

    // methods
    let method = this.console.log;

    // based on the level
    switch( level.value ){
      case Level.TRACE.value:
        method = this.console.trace;
        break;
      case Level.INFO.value:
        method = this.console.info;
        break;
      case Level.WARN.value:
        method = this.console.warn;
        break;
      case Level.ERROR.value:
        method = this.console.error;
        break;
    }

    if (action != null){
      switch( action ){
        case 'group':
          method = this.console.group;
          break;
        case 'groupEnd': 
          method = this.console.groupEnd;
          break  
      }
    }

    // Execute
    Function.prototype.apply.call( method, this.console, messages );
  }
}

export default ConsoleTransporter
