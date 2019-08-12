import http from './BaseService';

const register = user => http.post('/register', user)
.then(res => Promise.resolve(res.data));

const authenticate = credentials => http.post(`/authenticate`, credentials)
.then(res => Promise.resolve(res.data))

const logout = () => http.post(`/logout`)
const editProfile = (body) => http.put(`/update`, body)

const getUser = () => http.get('/profile')
  .then((response)=>{
    console.log(response)
    return response
  })
export default {
  register,
  authenticate,
  editProfile,
  logout, 
  getUser
}