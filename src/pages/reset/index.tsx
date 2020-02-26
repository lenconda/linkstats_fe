import React, { useState } from 'react';
import {
  Button,
  Input,
  Row,
  Col,
  Card,
  Icon,
  Form,
} from 'antd';
import './index.less';
import qs from 'query-string';
import http from '../../util/http';
import { history } from '../../App';
import {
  Link,
  RouteComponentProps,
} from 'react-router-dom';
import { FormComponentProps } from 'antd/lib/form';

interface Props extends RouteComponentProps, FormComponentProps {}

const ResetForm = (props: Props): JSX.Element => {
  const [loading, setLoading] = useState<boolean>(false);

  const { getFieldDecorator } = props.form;
  const search = JSON.parse(JSON.stringify(qs.parse(props.location.search)));
  const params = {
    user: search.user || '',
    code: search.code || '',
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    props.form.validateFields((err: any, values: any) => {
      if (!err) {
        const data = {
          ...params,
          password: values.password,
        };
        setLoading(true);
        http
          .post('/api/auth/reset', data)
          .then(res => {
            setLoading(false);
            if (res) { history.push('/signin') }
          });
      }
    });
  };

  const compareToFirstPassword = (rule: any, value: any, callback: any) => {
    const { form } = props;
    if (value && value !== form.getFieldValue('password')) {
      callback('两次输入的密码不一致');
    } else {
      callback();
    }
  };

  return (
    <Row className="signin-box-wrapper">
      <Col xs={24} sm={16} md={14} lg={10} xl={8} xxl={6}>
        <Card
          title="重置密码"
          className="info-card slideIn"
        >
          <Form onSubmit={handleSubmit} className="login-form">
            <Form.Item hasFeedback={true}>
              {getFieldDecorator('password', {
                rules: [
                  {
                    required: true,
                    message: '请输入你的密码',
                  },
                  {
                    max: 18,
                    message: '长度不能超过18个字符',
                  },
                ],
              })(<Input
                prefix={<Icon type="lock" style={{ color: 'rgba(0, 0, 0, .25)' }} />}
                type="password"
                size="large"
                placeholder="密码"
              />)}
            </Form.Item>
            <Form.Item hasFeedback={true}>
              {getFieldDecorator('confirm', {
                rules: [
                  {
                    required: true,
                    message: '请输入你的密码',
                  },
                  {
                    max: 18,
                    message: '长度不能超过18个字符',
                  },
                  {
                    validator: compareToFirstPassword,
                  }],
              })(<Input
                prefix={<Icon type="lock" style={{ color: 'rgba(0, 0, 0, .25)' }} />}
                type="password"
                size="large"
                placeholder="确认密码"
              />)}
            </Form.Item>
            <Form.Item>
              <section>
                <Button type="primary"
                  block={true}
                  loading={loading}
                  htmlType="submit"
                  className="login-form-button"
                  size="large"
                >
                  重置密码
                </Button>
              </section>
            </Form.Item>
          </Form>
        </Card>
        <br />
        <Link to="/signin">&larr; 返回登录页</Link>
      </Col>
    </Row>
  );
};

const Reset = Form.create({ name: 'reset' })(ResetForm);

export default Reset;
