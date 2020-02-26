import React, { useState } from 'react';
import {
  Form,
  Row,
  Col,
  Input,
  Button,
} from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import { history } from '../../../App';
import { RouteComponentProps } from 'react-router-dom';
import http from '../../../util/http';
import Content from '../../../components/Content';

interface Props extends RouteComponentProps, FormComponentProps {}

const CreateForm = (props: Props): JSX.Element => {
  const { getFieldDecorator } = props.form;
  const [createLoading, setCreateLoading] = useState<boolean>(false);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    props.form.validateFields((err: any, values: any) => {
      if (!err) {
        const { url, comment } = values;
        setCreateLoading(true);
        http
          .post('/api/links', { url, comment })
          .then(res => {
            setCreateLoading(false);
            if (res) { props.form.setFieldsValue({
              url: '',
              comment: '',
            }); }
          });
      }
    });
  };

  const validateUrl = (rule: any, value: any, callback: any) => {
    // eslint-disable-next-line no-useless-escape
    const urlChecker = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/g;

    if (!urlChecker.test(props.form.getFieldValue('url'))) {
      callback('请输入合法的URL');
    } else {
      callback();
    }
  };

  return (
    <Content title="创建探测链接">
      <Row>
        <Col xxl={6} xl={8} lg={10} md={18} sm={24} xs={24}>
          <Form onSubmit={handleSubmit}>
            <Form.Item label="原始链接">
              {getFieldDecorator('url', {
                rules: [
                  {
                    required: true,
                    message: '请输入原始链接',
                  },
                  {
                    max: 200,
                    message: '超过最大长度限制',
                  },
                  {
                    validator: validateUrl,
                  },
                ],
              })(<Input size="large" />)}
            </Form.Item>
            <Form.Item label="链接的描述">
              {getFieldDecorator('comment', {
                rules: [
                  {
                    max: 1000,
                    message: '长度不能超过1000个字符',
                  },
                ],
              })(<Input.TextArea autosize={{ minRows: 2 }} />)}
            </Form.Item>
            <Form.Item>
              <Button type="primary"
                htmlType="submit"
                loading={createLoading}
              >
                生成探测链接
              </Button>&nbsp;&nbsp;
              <Button type="ghost"
                onClick={() => history.goBack()}
              >
                取消
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </Content>
  );
};

const Create = Form.create()(CreateForm);
export default Create;
