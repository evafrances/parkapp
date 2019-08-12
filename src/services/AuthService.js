import http from './BaseService';

const register = user => http.post('/register', user)
.then(res => Promise.resolve(res.data));

const authenticate = credentials => http.post(`/authenticate`, credentials)
.then(res => Promise.resolve(res.data))

const logout = () => http.post(`/logout`)

export default {
  register,
  authenticate,
  logout
}