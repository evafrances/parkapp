import http from './BaseService';

const getParkings = () => http.get('/parkings')

export default {
  getParkings
}


