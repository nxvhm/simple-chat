import Auth from '../Auth';

export default {
  getChatRooms: (params = null) => {
    let apiUrl = process.env.REACT_APP_API_URI;

    Auth.axios().get(`${apiUrl}/chatrooms`, params)
    .then(res => {
      return Promise.resolve(res.data);
    }).catch(err => {
      return Promise.reject(err.message);
    })
  }
}
