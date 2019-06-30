import React, { useState, useEffect } from 'react'
import {
  Button,
  Input,
  Row,
  Col,
  Card,
  Icon,
  Form,
  Checkbox,
  message
} from 'antd'
import { Link } from 'react-router-dom'
import qs from 'query-string'
import { Base64 } from 'js-base64'
import './Login.css'
import http from '../../util/http'
import { history } from '../../App'

const LoginForm: React.FC = (props: any): JSX.Element => {
  const { getFieldDecorator } = props.form
  const search = JSON.parse(JSON.stringify(qs.parse(props.location.search)))
  const params = {
    action: search.action || '',
    user: search.user || '',
    code: search.code || '',
    redirect: search.redirect || ''
  }

  const [email, setEmail] = useState<string>('')

  useEffect(() => {
    if (params.action === 'active' && params.user && params.code) {
        http.get(`/api/auth/active`,
            {
              params: {
                user: params.user,
                code: params.code
              }})
    }
  }, [])

  const handleSubmit = (e: any) => {
    e.preventDefault()
    props.form.validateFields((err: any, values: any) => {
      if (!err) {
        const { email, password, remember } = values
        localStorage.setItem('persist', remember)
        http.post('/api/auth/login', { email, password })
            .then(
                res => {
                  if (res) {
                    remember
                        ? localStorage.setItem('token', res.data.data.token)
                        : sessionStorage.setItem('token', res.data.data.token)
                    history.push(params.redirect ? Base64.decode(params.redirect) : '/dashboard')
                  }
                })
      }
    })
  }

  const handleForgotPassword = () => {
    if (!email) {
      message.warn('请填写邮箱地址')
      return
    }
    http.get('/api/auth/forgot', {
      params: {
        user: email
      }
    })
  }

  return (
      <Row className={'login-box-wrapper'}>
        <Col xs={24} sm={16} md={14} lg={10} xl={6} xxl={5}>
          <Card title={'验证你的凭据'}
                type={'inner'}
                style={{textAlign: 'left'}}
                actions={[<a onClick={() => handleForgotPassword()}>忘记密码</a>, <Link to={'/signin'}>创建一个账户</Link>]}
          >
            <Form onSubmit={handleSubmit} className={'login-form'}>
              <Form.Item>
                {getFieldDecorator('email', {
                  rules: [{ required: true, message: '请输入你的邮箱地址' }],
                })(
                    <Input
                        prefix={<Icon type={'user'} style={{color: 'rgba(0, 0, 0, .25)'}}/>}
                        placeholder={'邮箱地址'}
                        onChange={e => setEmail(e.target.value)}
                    />,
                )}
              </Form.Item>
              <Form.Item>
                {getFieldDecorator('password', {
                  rules: [{ required: true, message: '请输入你的密码' }],
                })(
                    <Input
                        prefix={<Icon type={'lock'} style={{color: 'rgba(0, 0, 0, .25)'}}/>}
                        type={'password'}
                        placeholder={'密码'}
                    />,
                )}
              </Form.Item>
              <Form.Item>
                {getFieldDecorator('remember', {
                  valuePropName: 'checked',
                  initialValue: true,
                })(<Checkbox>使我保持登录状态</Checkbox>)}
                <section>
                  <Button type={'primary'}
                          block={true}
                          htmlType={'submit'}
                          className={'login-form-button'}
                  >
                    登录
                  </Button>
                </section>
              </Form.Item>
            </Form>
          </Card>
        </Col>
      </Row>
  )
}

const Login = Form.create({name: 'login'})(LoginForm)

export default Login
