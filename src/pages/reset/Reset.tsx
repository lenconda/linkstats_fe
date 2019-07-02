import React from 'react'
import {
  Button,
  Input,
  Row,
  Col,
  Card,
  Icon,
  Form
} from 'antd'
import './Reset.css'
import qs from 'query-string'
import http from '../../util/http'
import { history } from '../../App'

const ResetForm: React.FC = (props: any): JSX.Element => {
  const { getFieldDecorator } = props.form
  const search = JSON.parse(JSON.stringify(qs.parse(props.location.search)))
  const params = {
    user: search.user || '',
    code: search.code || ''
  }

  const handleSubmit = (e: any) => {
    e.preventDefault()
    props.form.validateFields((err: any, values: any) => {
      if (!err) {
        const data = {
            ...params,
          password: values.password
        }
        http.post('/api/auth/reset', data)
            .then(res => {
              if (res)
                history.push('/login')
            })
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
          <Card title={'重置密码'}
                type={'inner'}
          >
            <Form onSubmit={handleSubmit} className={'login-form'}>
              <Form.Item hasFeedback={true}>
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
              <Form.Item hasFeedback={true}>
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
                <section>
                  <Button type={'primary'}
                          block={true}
                          htmlType={'submit'}
                          className={'login-form-button'}
                  >
                    重置密码
                  </Button>
                </section>
              </Form.Item>
            </Form>
          </Card>
        </Col>
      </Row>
  )
}

const Reset = Form.create({name: 'reset'})(ResetForm)

export default Reset
