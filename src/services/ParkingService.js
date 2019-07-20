import http from './BaseService';

const getParkings = () => http.get('/parkings')
const getYourPark = (id) => http.get(`/parkings/${id}`)
const getFavPark = () => http.get('parkings/fav')
const addFavorite = (parkings) => http.get(`/parkings/${parkings}/fav`)
const editFavorite = (id, name) => http.put(`/parkings/${id}/fav`, { name })

export default {
  getParkings,
  getYourPark,
  addFavorite,
  getFavPark,
  editFavorite
}


