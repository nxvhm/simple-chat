import axios from 'axios';
import decode from "jwt-decode";

const Auth = {

  /**
   * Save token in localstorage and set Authoraization header for it
   * @param   {String}  token  VALID JWT token
   * @return  {void}
   */
  setToken: (token) => {
    axios.defaults.headers.common = {'Authorization': `Bearer ${token}`}
    localStorage.setItem('token', token);
  },

  /**
   * Return the curernt stored jwt token if availablr
   * @return  {mixed}  String if token exists or false
   */
  getToken: () => {
    return localStorage.getItem('token');
  },
  /**
   * Verift token with the server
   * @param   string  token  [token description]
   * @return  bool
   */
  verify: (token) => {
    let apiUrl = process.env.REACT_APP_API_URI;
    axios.post(`${apiUrl}/verify`)
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
   * @return  {mixed} Object with user data if available or false
   */
  check: () => {
    let token = Auth.getToken();
    let apiUrl = process.env.REACT_APP_API_URI;

    if (!token) {
      return Promise.resolve(false);
    }

    return axios.get(`${apiUrl}/verify-token`, {params: {token}})
    .then(res => {
      let result = res.data.success ? decode(token) : false;
      if (result) {
        let expiration = new Date(result.exp*1000).getTime();
        let now = new Date().getTime();
        let minutesLeft = new Date(expiration-now).getUTCMinutes();
        console.log('expires in ', minutesLeft);
      }

      return Promise.resolve(result);
    });
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
  },
  /**
   * Get axios with setted up authorization token
   * @param void
   * @return Axios
   */
  axios: () => {
    axios.defaults.headers.common = {'Authorization': `Bearer ${Auth.getToken()}`};
    return axios;
  },

  emitExpirationEvent(minutesBefore) {
    let token = Auth.getToken();
    if (!token)
      return false;

    let claims = decode(Auth.getToken());

    if (!claims) return false;

    let expiration = new Date(claims.exp*1000).getTime();

    let now = new Date().getTime();

    if (expiration < now) {
      return false;
    }

    // Calculate minutes left to expiration
    let minutesLeft = new Date(expiration-now).getUTCMinutes();
    console.log('expires in ', minutesLeft);

    let eventMinutes = minutesLeft - minutesBefore;

    setTimeout(() => {
      document.dispatchEvent(new Event("token-expiration"));
    }, eventMinutes*60*1000);
  }


};

export default Auth;
