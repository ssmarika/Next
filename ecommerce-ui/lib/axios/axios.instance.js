// if we shift the server we can simply change the value of base url
// so that we do not need to change the url in all the places where the address has been mentioned while hitting the api

import axios from 'axios';

// this code is copied from axios instance docs
const $axios = axios.create({
  baseURL: 'http://localhost:8080',
});

export default $axios;
