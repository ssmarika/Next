// if we shift the server we can simply change the value of base url
// so that we do not need to change the url in all the places where the address has been mentioned while hitting the api

import axios from 'axios';

// this code is copied from axios instance docs
const $axios = axios.create({
  baseURL: 'http://localhost:8080',
  // baseURL: 'https://784d-182-93-83-71.ngrok-free.app',
});

// Add a request interceptor
$axios.interceptors.request.use(function (config) {
  // get token from local storage
  const token = window.localStorage.getItem('token');

  // if token, add token to header
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default $axios;
