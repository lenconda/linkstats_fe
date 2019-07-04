import React, { useState, useEffect } from 'react'
import http from '../../../../util/http'
import {
  Form,
  Input,
  Button,
  Spin,
  Row,
  Col
} from 'antd'
import { history } from '../../../../App'
import Content from '../../../../components/content/Content'

const DetailForm = (props: any): JSX.Element => {
  const { getFieldDecorator } = props.form
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    setLoading(true)
    http
    .get('/api/profile/info')
    .then(res => {
      if (res) {
        setLoading(false)
        props.form.setFieldsValue(res.data.data)
      }
    })
  }, [])

  const handleSubmit = (e: any) => {
    e.preventDefault()
    props.form.validateFields((err: any, values: any) => {
      if (!err)
        http.post('/api/profile/update', values)
    })
  }

  return (
    <Content loading={loading}>
      <Row>
        <Col xxl={6} xl={8} lg={10} md={18} sm={24} xs={24}>
          <Form onSubmit={handleSubmit}>
            <Form.Item label={'邮箱'}>
              {getFieldDecorator('email', {
                rules: [{ required: true, }],
              })(
                  <Input disabled={true}/>,
              )}
            </Form.Item>
            <Form.Item label={'昵称'}>
              {getFieldDecorator('name', {
                rules: [{ required: true, message: '请输入你的昵称' }],
              })(
                  <Input/>,
              )}
            </Form.Item>
            <Form.Item label={'邮政编码'} hasFeedback={true}>
              {getFieldDecorator('zipCode', {
                rules: [{ required: false, message: '请输入所在地的邮政编码' }],
                initialValue: ''
              })(
                  <Input/>,
              )}
            </Form.Item>
            <Form.Item label={'地址'} hasFeedback={true}>
              {getFieldDecorator('address', {
                rules: [{ required: false, message: '请输入地址' }],
                initialValue: ''
              })(
                  <Input/>,
              )}
            </Form.Item>
            <Form.Item label={'城市'} hasFeedback={true}>
              {getFieldDecorator('city', {
                rules: [{ required: false, message: '请输入所在城市' }],
                initialValue: ''
              })(
                  <Input/>,
              )}
            </Form.Item>
            <Form.Item label={'州/省/自治区'} hasFeedback={true}>
              {getFieldDecorator('region', {
                rules: [{ required: false, message: '请输入所在州/省/自治区' }],
                initialValue: ''
              })(
                  <Input/>,
              )}
            </Form.Item>
            <Form.Item label={'国家/地区'} hasFeedback={true}>
              {getFieldDecorator('country', {
                rules: [{ required: false, message: '请输入所在国家/地区' }],
                initialValue: ''
              })(
                  <Input/>,
              )}
            </Form.Item>
            <Form.Item>
              <Button type={'primary'}
                      htmlType={'submit'}
                      disabled={!props.form.getFieldValue('name')}
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
    </Content>
  )
}

const Detail = Form.create()(DetailForm)
export default Detail
