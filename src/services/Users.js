import axios from 'axios';
import Auth from './Auth';

const Users = {
  /**
   * Get list of online users
   * @return  {Promise} Containing api response
   */
  getOnlineUsers: () => {
    let apiUrl = process.env.REACT_APP_API_URI;

    return new Promise(resolve => {
      Auth.axios().get(`${apiUrl}/users/online`)
      .then(response => {
        return resolve(response.data);
      })
      .catch(err => {
        return resolve({error: true, stack: err});
      });
    });
  },

  /**
   * Get User Data by Id
   * @return  {Promise} Containing api response
   */
  getUserData: (id) => {
    let apiUrl = process.env.REACT_APP_API_URI;

    return new Promise(resolve => {
      Auth.axios().get(`${apiUrl}/user/${id}`)
      .then(res => {
        return resolve(res.data);
      })
      .catch(err => {
        return resolve({error: true, stack: err});
      });
    });
  }
};

export default Users;
