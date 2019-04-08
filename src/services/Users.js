import axios from 'axios';

const Users = {
  /**
   * Get list of online users
   * @return  {Promise} Containing api response
   */
  getOnlineUsers: () => {
    let apiUrl = process.env.REACT_APP_API_URI;

    return new Promise(resolve => {
      axios.get(`${apiUrl}/users/online`)
      .then(response => {
        return resolve(response.data);
      })
      .catch(err => {
        return resolve({error: true, stack: err});
      });
    });
  }
};

export default Users;
