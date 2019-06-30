import React from 'react'
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
import './Signin.css'

const SigninForm: React.FC = (props: any): JSX.Element => {
  const { getFieldDecorator } = props.form

  const handleSubmit = (e: any) => {
    e.preventDefault()
    props.form.validateFields((err: any, values: any) => {
      if (!err) {
        console.log(values)
      }
    })
  }

  const compareToFirstPassword = (rule: any, value: any, callback: any) => {
    const { form } = props
    if (value && value !== form.getFieldValue('password')) {
      callback('两次输入的密码不一致')
    } else {
      callback()
    }
  }

  return (
      <Row className={'signin-box-wrapper'}>
        <Col xs={24} sm={16} md={14} lg={10} xl={6} xxl={5}>
          <Card title={'创建一个账户'}
                type={'inner'}
                style={{textAlign: 'left'}}
          >
            <Form onSubmit={handleSubmit} className={'login-form'}>
              <Form.Item label={'邮箱地址'}>
                {getFieldDecorator('email', {
                  rules: [{ required: true, message: '请输入你的邮箱地址' }],
                })(
                    <Input
                        prefix={<Icon type={'mail'} style={{color: 'rgba(0, 0, 0, .25)'}}/>}
                        placeholder={'邮箱地址'}
                    />,
                )}
              </Form.Item>
              <Form.Item label={'昵称'}>
                {getFieldDecorator('username', {
                  rules: [{ required: true, message: '请输入你的昵称' }],
                })(
                    <Input
                        prefix={<Icon type={'user'} style={{color: 'rgba(0, 0, 0, .25)'}}/>}
                        placeholder={'昵称'}
                    />,
                )}
              </Form.Item>
              <Form.Item label={'密码'} hasFeedback={true}>
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
              <Form.Item label={'确认密码'} hasFeedback={true}>
                {getFieldDecorator('confirm', {
                  rules: [
                      {
                        required: true,
                        message: '请输入你的密码'
                      },
                      {
                        validator: compareToFirstPassword
                      }],
                })(
                    <Input
                        prefix={<Icon type={'lock'} style={{color: 'rgba(0, 0, 0, .25)'}}/>}
                        type={'password'}
                        placeholder={'确认密码'}
                    />,
                )}
              </Form.Item>
              <Form.Item>
                {getFieldDecorator('agree', {
                  valuePropName: 'agree',
                  initialValue: false,
                })(<Checkbox>已同意<a>用户协议</a>和<a>隐私政策</a></Checkbox>)}
                <section>
                  <Button type={'primary'}
                          block={true}
                          htmlType={'submit'}
                          className={'login-form-button'}
                          disabled={!props.form.getFieldValue('agree')}
                  >
                    创建账户
                  </Button>
                </section>
              </Form.Item>
            </Form>
          </Card>
        </Col>
      </Row>
  )
}

const Signin = Form.create({name: 'login'})(SigninForm)

export default Signin
