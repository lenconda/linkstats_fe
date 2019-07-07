import React, { useState } from 'react'
import {
  Form,
  Row,
  Col,
  Input,
  Button
} from 'antd'
import { history } from '../../../App'
import http from '../../../util/http'

const CreateForm = (props: any): JSX.Element => {
  const { getFieldDecorator } = props.form
  const [createLoading, setCreateLoading] = useState<boolean>(false)

  const handleSubmit = (e: any) => {
    e.preventDefault()
    props.form.validateFields((err: any, values: any) => {
      if (!err) {
        const { url, comment } = values
        setCreateLoading(true)
        http
        .post('/api/links', { url, comment })
        .then(res => {
          setCreateLoading(false)
          if (res)
            props.form.setFieldsValue({
              url: '',
              comment: ''
            })
        })
      }
    })
  }

  return (
    <Row>
      <Col xxl={6} xl={8} lg={10} md={18} sm={24} xs={24}>
        <Form onSubmit={handleSubmit}>
          <Form.Item label={'原始链接'}>
            {getFieldDecorator('url', {
              rules: [
                { 
                  required: true,
                  message: '请输入原始链接'
                },
                {
                  max: 200,
                  message: '超过最大长度限制'
                }
              ]
            })(
                <Input/>,
            )}
          </Form.Item>
          <Form.Item label={'链接的描述'}>
            {getFieldDecorator('comment', {
              rules: [
                {
                  max: 1000,
                  message: '长度不能超过1000个字符'
                }
              ]
            })(
                <Input.TextArea autosize={{ minRows: 2 }}/>,
            )}
          </Form.Item>
          <Form.Item>
            <Button type={'primary'}
                    htmlType={'submit'}
                    loading={createLoading}
            >
              生成探测链接
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

const Create = Form.create()(CreateForm)
export default Create
