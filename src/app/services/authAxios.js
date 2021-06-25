import axios from 'axios';
import { now } from 'moment';


var authAxios = axios.create({
  baseURL: 'https://localhost:44392/api/',
  headers: {
    Authorization: `Bearer ${localStorage.getItem('access_token')}`
  }
});
var test = -1;
if (localStorage.getItem('access_token') != null) {
  let isRefreshing = false;
  let failedQueue = [];
  const processQueue = (error, token = null) => {
    failedQueue.forEach(prom => {
      if (error) {
        prom.reject(error);
      } else {
        prom.resolve(token);
      }
    });
    failedQueue = [];
  };
  authAxios.interceptors.response.use(
    response => {
      return response;
    },
    err => {
      const originalRequest = err.config;
      if (err.response.status === 401 && !originalRequest._retry) {
        if (isRefreshing) {
          return new Promise(function (resolve, reject) {
            failedQueue.push({ resolve, reject });
          })
            .then(token => {
              authAxios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
              originalRequest.headers['Authorization'] = 'Bearer ' + token;
              return authAxios(originalRequest);
            })
            .catch(err => {
              return Promise.reject(err);
            });
        }

        originalRequest._retry = true;
        isRefreshing = true;

        return new Promise(function (resolve, reject) {
          axios
            .post('https://localhost:44392/api/Authentication/refresh', {
              access_token: localStorage.getItem("access_token"),
              refresh_token: localStorage.getItem("refresh_token")
            })
            .then(({ data }) => {
              authAxios.defaults.headers.common['Authorization'] = 'Bearer ' + data.token;
              console.log(authAxios.defaults.headers.common['Authorization']);
              originalRequest.headers['Authorization'] = 'Bearer ' + data.token;
              localStorage.setItem("access_token", data.token)
              localStorage.setItem("refresh_token", data.refreshToken)
              authAxios = axios.create({
                baseURL: 'https://localhost:44392/api/',
                headers: {
                  Authorization: `Bearer ${data.token}`
                }
              });
              processQueue(null, data.token);
              resolve(authAxios(originalRequest));
            })
            .catch(err => {
              processQueue(err, null);
              // store.dispatch(showMessage({ message: 'Expired Token' }));
              reject(err);
            })
            .then(() => {
              isRefreshing = false;
            });
        });
      }
      return Promise.reject(err);
    }
  );}
  export default  authAxios;