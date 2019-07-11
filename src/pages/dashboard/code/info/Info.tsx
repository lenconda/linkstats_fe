import React, { useState, useEffect } from 'react'
import http from '../../../../util/http'
import Content from '../../../../components/content/Content'
import {
  Row,
  Col
} from 'antd'

const Info = (): JSX.Element => {
  const [loading, setLoading] = useState<boolean>(false)
  const [uuid, setUuid] = useState<string>('')

  useEffect(() => {
    setLoading(true)
    http
    .get('/api/profile/info')
    .then(res => {
      setLoading(false)
      if (res)
        setUuid(res.data.data.uuid)
    })
  }, [])

  return (
    <Content loading={loading}>
      <Row>
        <Col xxl={6} xl={8} lg={10} md={18} sm={24} xs={24}>
          <pre>
            
          </pre>
        </Col>
      </Row>
    </Content>
  )
}

export default Info
