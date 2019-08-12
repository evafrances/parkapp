import http from './BaseService';

const postMail = (body) => http.post('/apply', body)

export default {
  postMail
}