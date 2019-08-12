import http from './BaseService';


const getParkings = () => http.get('/parkings')
const getYourPark = (id) => http.get(`/parkings/${id}`)
const getFavPark = () => {
  return http.get('parkings/fav')}
const addFavorite = (id, name) => http.get(`/parkings/${id}/fav/${name}`)
const editFavorite = (id, name) => http.put(`/parkings/${id}/fav`, { name })


export default {
  getParkings,
  getYourPark,
  addFavorite,
  getFavPark,
  editFavorite
}


