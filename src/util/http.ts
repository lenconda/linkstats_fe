import axios from 'axios'
import { history } from '../App'
import { message } from 'antd'
import { Base64 } from 'js-base64'

axios.defaults.timeout = 3600000
axios.interceptors.request.use(config => {
  config.headers = {
    Authorization:
        `Bearer ${localStorage.getItem('token') || sessionStorage.getItem('token')}`
  }
  return config
})
axios.interceptors.response.use((response: any) => {
  if (response.data.token)
    if (!!JSON.parse(localStorage.getItem('persist') || 'false')) {
      localStorage.setItem('token', response.data.token)
    } else {
      sessionStorage.setItem('token', response.data.token)
    }

  if (response.data.data &&
      Object.prototype.toString.call(response.data.data) === "[object String]")
    message.success(response.data.data)
  return response
}, error => {
  if (error.response.status === 401) {
    localStorage.removeItem('token')
    const { pathname, search, hash } = history.location
    history.push(`/login?return=${Base64.encode(`${pathname}${search}${hash}`)}`)
  } else {
    if (error.response.data.message)
      message.error(error.response.data.message)
  }
})

export default axios
