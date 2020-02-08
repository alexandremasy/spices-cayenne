class AbstractTransport{
  invoke({level, name, messages}){
    throw new Exception('Error: No implementation for AbstractTransport.Invoke')
  }
}

export default AbstractTransport
