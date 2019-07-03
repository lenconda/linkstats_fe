import React, { useEffect } from 'react'
import {
  message
} from 'antd'
import qs from 'query-string'
import http from '../../util/http'

const Redirect = (props: any): JSX.Element => {
  const to = JSON.parse(JSON.stringify(qs.parse(props.location.search))).to || ''

  useEffect(() => {
    http
    .get(`/api/redirect/${to}`)
    .then(res => {
      if (res && res.data.data.href)
        window.location.href = res.data.data.href
      else
        message.error('参数错误')
    })
  }, [])

  return <div></div>
}

export default Redirect
