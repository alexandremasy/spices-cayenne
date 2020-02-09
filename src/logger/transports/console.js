import AbstractTransport from './abstract'
import Level from '../../level'

class ConsoleTransporter extends AbstractTransport {

  get console(){
    return (typeof console === 'undefined') ? null : console;
  }

  invoke({ level, context, messages }) {
    // check for the presence of console
    if (!this.console){
      return;
    }

    // methods
    let method = this.console.log;
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

    // Execute

    // if (messages.length > 2 && Level.DEBUG.value == level.value){
    //   console.group('');
    //   Function.prototype.apply.call( method, this.console, messages );
    //
    //   console.groupEnd();
    // }
    // else{
      Function.prototype.apply.call( method, this.console, messages );
    // }

    // if (messages.length <= 1 || [Level.TRACE.value].includes(level.value)){
    // }
    // else{
    //   let first = messages.shift();
    //   this.console.group( first );
    //   messages.forEach(message => {
    //     Function.prototype.apply.call( method, this.console, message );
    //   })
    //   this.console.groupEnd( first );
    // }

  }
}

export default ConsoleTransporter
