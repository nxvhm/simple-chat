import axios from 'axios';

export default class Auth {

  setToken = (token) => {
    localStorage.setItem('token', token);
  }

  getToken = () => {
    return localStorage.getItem('token');
  }

  logout = () => {
    localStorage.removeItem('token');
  }

  login = (url, data) => {
    return axios.post(url, data)
    .then(this._checkStatus)
    .then(response => {
      if (response.data.token) {
        this.setToken(response.data.token);
      }
      return Promise.resolve(response.data);
    });
  }

  test = () => {
    alert('test');
  }

  _checkStatus = response => {
    // raises an error in case response status is not a success
    if (response.status >= 200 && response.status < 300) {
      // Success status lies between 200 to 300
      return response;
    } else {
      var error = new Error(response.statusText);
      error.response = response;
      throw error;
    }
  };

};
