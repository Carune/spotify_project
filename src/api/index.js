import axios from 'axios'

const api = axios.create({
  baseURL: '/api'  // vue.config.js의 프록시 설정과 일치
})

export default api 