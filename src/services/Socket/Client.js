const SocketClient = {

  connection: null,

  /**
   * Get current connection
   * @return  {WebSocket} or NULL
   */
  getConnection: () => {
    return SocketClient.connection;
  },

  /**
   * Check if socket client is currently connected to socket server
   * @return  {Bool}
   */
  isConnected: () => {
    let connection = SocketClient.getConnection();

    return (connection && connection.readyState && connection.readyState === 1);
  },

  /**
   * Connect to socket Server
   * @see https://developer.mozilla.org/en-US/docs/Web/API/WebSocket#Properties
   * @param {String}  url   WebSocket server domain
   * @param {Int}     port  WebSocket Server Port
   * @param {String}  uid   User ID connecting to the socket
   * @callback cb The function to execute on successfull connection or error/interuption.
   */
  connect: (url, port, uid, cb = null, errorCb = null) => {
    SocketClient.connection = new WebSocket(`ws://${url}:${port}?uid=${uid}`);
    // On connection open execute the provided
    SocketClient.connection.onmessage = SocketClient.incomingMessage;

    SocketClient.connection.onopen = () => {
      // Some logic here ??
      if (cb) cb();
    };

    // SocketClient.connection.addEventListener('new-user-online', function(e) {
    //   console.log(console.log('new-user-online', e));
    // });
  },

  onError: (onErrorCallback) => {
    //If connection throws error execute the provided callback
    SocketClient.connection.onerror = onErrorCallback;
  },

  onClose: (onCloseCallback) => {
    //If connection throws error execute the provided callback
    SocketClient.connection.onclose = onCloseCallback;
  },
  /**
   * On WebSocket message handler
   * @param   {object}  payload
   */
  incomingMessage: (payload) => {
    try {
      let data = JSON.parse(payload.data);

      console.log('WsMsg', data);
      if (data.type === 'event') {
        return SocketClient.dispatchEvent(data.name, data.body ? data : null);
      }

    } catch (error) {
      console.error(error.message);
      return false;
    }
  },

  /**
   * Dispatch Event to the client using connection
   * @see https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/dispatchEvent
   * @param   {String}  name    String representing the name of the event.
   * @param   {Object}  detail  Value/Data associated with the event. Default null
   * @return  {void}
   */
  dispatchEvent: (name, detail = null) => {
    if (SocketClient.isConnected()) {

      let socketEvent = (detail)
        ? new CustomEvent(name, {detail})
        : new Event(name);
      SocketClient.getConnection().dispatchEvent(socketEvent);
    }
  }
}

export default SocketClient
