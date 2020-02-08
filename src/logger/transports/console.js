import AbstractTransport from './abstract'

class ConsoleTransporter extends AbstractTransport {

  formatter({ messages, context }) {
    if ( context.name ) {
      messages.unshift( "[" + context.name + "]" );
    }
  }

  invoke({ level, context, messages }) {
    console.log('Console.invoke', level, context, messages);
  }


  // invoke({ level, name, messages }) {
  //   // Support for IE8+ (and other, slightly more sane environments)
  //   var invokeConsoleMethod = ( hdlr, messages ) => Function.prototype.apply.call( hdlr, console, messages );
  //
  //   // Check for the presence of a logger.
  //   if ( typeof console === "undefined" ) {
  //     return;
  //   }
  //
  //   // Convert arguments object to Array.
  //   messages = Array.prototype.slice.call( messages );
  //   var hdlr = console.log;
  //   var timerLabel;
  //
  //   if ( context.level === Logger.TIME ) {
  //     timerLabel = ( context.name ? '[' + context.name + '] ' : '' ) + messages[ 0 ];
  //
  //     if ( messages[ 1 ] === 'start' ) {
  //       if ( console.time ) {
  //         console.time( timerLabel );
  //       } else {
  //         timerStartTimeByLabelMap[ timerLabel ] = new Date().getTime();
  //       }
  //     } else {
  //       if ( console.timeEnd ) {
  //         console.timeEnd( timerLabel );
  //       } else {
  //         invokeConsoleMethod( hdlr, [ timerLabel + ': ' +
  //           ( new Date().getTime() - timerStartTimeByLabelMap[ timerLabel ] ) + 'ms'
  //         ] );
  //       }
  //     }
  //   } else {
  //     // Delegate through to custom warn/error loggers if present on the console.
  //     if ( context.level === Logger.WARN && console.warn ) {
  //       hdlr = console.warn;
  //     } else if ( context.level === Logger.ERROR && console.error ) {
  //       hdlr = console.error;
  //     } else if ( context.level === Logger.INFO && console.info ) {
  //       hdlr = console.info;
  //     } else if ( context.level === Logger.DEBUG && console.debug ) {
  //       hdlr = console.debug;
  //     } else if ( context.level === Logger.TRACE && console.trace ) {
  //       hdlr = console.trace;
  //     }
  //
  //     options.formatter( messages, context );
  //     invokeConsoleMethod( hdlr, messages );
  //   }
  // }
}

export default ConsoleTransporter
