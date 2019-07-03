import React from 'react'
import http from '../../../../util/http'
import {
  Row,
  Col,
  Input,
  Button,
  Form
} from 'antd'
import { history } from '../../../../App'

const ChangePasswordForm = (props: any): JSX.Element => {
  const { getFieldDecorator } = props.form

  const handleSubmit = (e: any) => {
    e.preventDefault()
    props.form.validateFields((err: any, values: any) => {
      if (!err) {
        http
        .post('/api/profile/change_password', {
          old: values.old,
          new: values.new
        })
      }
    })
  }

  const compareToFirstPassword = (rule: any, value: any, callback: any) => {
    const { form } = props
    if (value && value !== form.getFieldValue('new')) {
      callback('两次输入的密码不一致')
    } else {
      callback()
    }
  }

  return (
    <Row>
      <Col xxl={6} xl={8} lg={10} md={18} sm={24} xs={24}>
        <Form onSubmit={handleSubmit}>
          <Form.Item label={'旧密码'}>
            {getFieldDecorator('old', {
              rules: [{ required: true, message: '请输入旧密码' }],
            })(
                <Input type={'password'}/>,
            )}
          </Form.Item>
          <Form.Item label={'新密码'}>
            {getFieldDecorator('new', {
              rules: [{ required: true, message: '请输入新密码' }],
            })(
                <Input type={'password'}/>,
            )}
          </Form.Item>
          <Form.Item label={'确认新密码'}>
            {getFieldDecorator('confirm', {
              rules: [
                { required: true, message: '请确认新密码' },
                { validator: compareToFirstPassword }
              ],
            })(
                <Input type={'password'}/>,
            )}
          </Form.Item>
          <Form.Item>
            <Button type={'primary'}
                    htmlType={'submit'}
                    disabled={
                      !props.form.getFieldValue('old') 
                      || !props.form.getFieldValue('new')
                      || !props.form.getFieldValue('confirm')
                    }
            >
              保存更改
            </Button>&nbsp;&nbsp;
            <Button type={'ghost'}
                    onClick={() => history.goBack()}
            >
              取消
            </Button>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  )
}

const ChangePassword = Form.create()(ChangePasswordForm)
export default ChangePassword
