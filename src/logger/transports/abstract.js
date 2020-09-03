/**
 * @abstract
 * @class
 * @interface
 */
export default class AbstractTransport {

  /**
   * @param {Object} options 
   * @param {String} options.action 
   * @param {Level} options.level 
   * @param {String} options.name 
   * @param {*} options.message 
   */
  invoke({action, level, name, messages}){
    throw new Exception('Error: No implementation for AbstractTransport.Invoke')
  }
}
