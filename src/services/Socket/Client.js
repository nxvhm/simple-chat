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
   * @param   {String} url WebSocket server domain
   * @param   {Int}  port   WebSocket Server Port
   */
  connect: (url, port, uid, cb = null) => {
    SocketClient.connection = new WebSocket(`ws://${url}:${port}?uid=${uid}`);

    SocketClient.connection.onopen = () => {
      // Some logic here ??
      cb();
    }

  }
}

export default SocketClient
