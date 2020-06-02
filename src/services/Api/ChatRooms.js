import Auth from '../Auth';
const API_URL =  process.env.REACT_APP_API_URI;

export default {

  getChatRooms: (params = null) => {
    let apiUrl = process.env.REACT_APP_API_URI;
    return Auth.axios().get(`${apiUrl}/chatrooms`, params)
    .then(res => {
      return Promise.resolve(res.data);
    }).catch(err => {
      return Promise.reject(err.message);
    })
  },

  createChatRoom: (data) => {
    // console.log(data);
    // return Promise.resolve(data);
    Auth.axios().post(`${API_URL}/chatrooms/create`, data)
    .then(res => {
      return Promise.resolve(res.data);
    }).catch(err => {
      return Promise.reject(err.message);
    });
  }
}
