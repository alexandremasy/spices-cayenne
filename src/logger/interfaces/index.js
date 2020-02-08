import Level from '../../level'
import AbstractInterface from './abstract'

class DefaultInterface extends AbstractInterface{

  /**
   * Outputs a message with the log level "debug".
   * @param {*} ...args
   */
  debug(){
    this._invoke({level: Level.DEBUG, messages: arguments});
  }

  /**
  * Outputs a message with the log level "info".
  * @param {*} ...args
  */
  info(){
    this._invoke({level: Level.INFO, messages: arguments});
  }

  /**
  * Outputs a message with the log level "warn".
  * @param {*} ...args
  */
  warn(){
    this._invoke({level: Level.WARN, messages: arguments});
  }

  /**
  * Outputs a message with the log level "error".
  * @param {*} ...args
  */
  error(){
    this._invoke({level: Level.ERROR, messages: arguments});
  }

  /**
  * Outputs a message with the log level "trace".
  * @param {*} ...args
  */
  trace(){
    this._invoke({level: Level.TRACE, messages: arguments});
  }
}

export default DefaultInterface
