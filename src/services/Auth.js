import axios from 'axios';
import decode from "jwt-decode";

const Auth = {

  setToken: (token) => {
    localStorage.setItem('token', token);
  },

  getToken: () => {
    return localStorage.getItem('token');
  },

  /**
   * Remove token item from localStorage
   * @param void
   * @return void
   */
  logout: () => {
    localStorage.removeItem('token');
  },

  /**
   * Perform login attempt. Save jwt token in local storage
   * on success
   * @param {String} url Login Endpoint
   * @param {Object} Login credentials {email, pass}
   * @return {Promise} containig response data
   */
  login: (url, data) => {
    return axios.post(url, data)
    .then(Auth._checkStatus)
    .then(response => {
      if (response.data.token) {
        Auth.setToken(response.data.token);
      }
      return Promise.resolve(response.data);
    });
  },

  /**
   * Check if there's a logged in user in the app
   * @param {void}
   * @return  {boolean}
   */
  check: () => {
    let token = Auth.getToken();

    try {
      let userData = decode(token);

      return (userData.exp > Date.now() / 1000) ? true : false;

    } catch (error) {
      console.log("Token expired/invalid or not provided");
      return false;
    }

  },
  /**
   * Get User Data
   * @param void
   * @return {Object}
   */
  user: () => {
    try {
      return decode(Auth.getToken());
    } catch(error) {
      return {};
    }
  },

  _checkStatus: response => {
    // raises an error in case response status is not a success
    if (response.status >= 200 && response.status < 300) {
      // Success status lies between 200 to 300
      return response;
    } else {
      var error = new Error(response.statusText);
      error.response = response;
      throw error;
    }
  }

};

export default Auth;
