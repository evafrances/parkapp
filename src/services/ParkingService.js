import http from './BaseService';

const getParkings = () => http.get('/parkings')
const getYourPark = (id) => http.get(`/parkings/${id}`) 

export default {
  getParkings,
  getYourPark
}


