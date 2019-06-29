import React from 'react'
import {
  Button,
  Input,
  Row,
  Col,
  Divider,
  Card
} from 'antd'
import queryString from 'query-string'
import './Login.css'

const Login: React.FC = (props: any): JSX.Element => {
  return (
      <Row style={{height: '100%'}}>
        <Col xs={24} sm={24} md={12} lg={14} xl={10} className={'banner'}>
          <h1>LinkStats</h1>
        </Col>
        <Col xs={24} sm={24} md={8} lg={6} xl={4}>
          <Card>
            <p>Card content</p>
            <p>Card content</p>
            <p>Card content</p>
          </Card>
        </Col>
      </Row>
  )
}

export default Login
