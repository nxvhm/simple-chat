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
   * @param {String}  url   WebSocket server domain
   * @param {Int}     port  WebSocket Server Port
   * @param {String}  uid   User ID connecting to the socket
   * @callback cb The function to execute on successfull connection or error/interuption.
   */
  connect: (url, port, uid, cb = null) => {
    SocketClient.connection = new WebSocket(`ws://${url}:${port}?uid=${uid}`);

    //If connection throws error execute the provided
    SocketClient.connection.onerror = () => {
      // Some logic...
      if (cb) cb();
    }
    // On connection open execute the provided
    SocketClient.connection.onopen = () => {
      // Some logic here ??
      if (cb) cb();
    };

  }
}

export default SocketClient
