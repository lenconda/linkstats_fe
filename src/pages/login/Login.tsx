import React, { useState } from 'react'
import {
  Button,
  Input,
  Row,
  Col,
  Card,
  Icon,
  Form,
  Checkbox
} from 'antd'
import queryString from 'query-string'
import './Login.css'

const LoginForm: React.FC = (props: any): JSX.Element => {
  const { getFieldDecorator } = props.form

  const [email, setEmail] = useState('')

  const handleSubmit = (e: any) => {
    e.preventDefault()
    props.form.validateFields((err: any, values: any) => {
      if (!err) {
        console.log('Received values of form: ', values)
      }
    })
  }

  return (
      <Row className={'login-box-wrapper'}>
        <Col xs={24} sm={16} md={14} lg={10} xl={6}>
          <Card title={'验证你的凭据'}
                type={'inner'}
                style={{textAlign: 'left'}}
                actions={[<a onClick={() => console.log(email)}>忘记密码</a>, <a>注册一个账户</a>]}
          >
            <Form onSubmit={handleSubmit} className={'login-form'}>
              <Form.Item>
                {getFieldDecorator('username', {
                  rules: [{ required: true, message: '请输入你的邮箱地址' }],
                })(
                    <Input
                        prefix={<Icon type={'user'} style={{ color: 'rgba(0,0,0,.25)' }} />}
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
                        prefix={<Icon type={'lock'} style={{ color: 'rgba(0,0,0,.25)' }} />}
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
                  <Button type={'primary'} block={true} htmlType={'submit'} className={'login-form-button'}>
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
