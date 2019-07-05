import React, { useEffect } from 'react'
import {
  message
} from 'antd'
import qs from 'query-string'
import http from '../../util/http'

const Redirect = (props: any): JSX.Element => {
  document.title = '跳转中...'

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return <div>正在跳转...</div>
}

export default Redirect
