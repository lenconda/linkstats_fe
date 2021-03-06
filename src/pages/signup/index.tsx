import React, { useState } from 'react';
import {
  Button,
  Input,
  Row,
  Col,
  Card,
  Icon,
  Form,
  Checkbox,
} from 'antd';
import http from '../../util/http';
import {
  Link,
  RouteComponentProps,
} from 'react-router-dom';
import { FormComponentProps } from 'antd/lib/form';

interface Props extends RouteComponentProps, FormComponentProps {}

const SigninForm = (props: Props): JSX.Element => {
  const [loading, setLoading] = useState<boolean>(false);

  const { getFieldDecorator } = props.form;

  const handleSubmit = (e: any) => {
    e.preventDefault();
    props.form.validateFields((err: any, values: any) => {
      const { name, email, password } = values;
      if (!err) {
        setLoading(true);
        http
          .post('/api/auth/register', { email, name, password })
          .then(res => {
            setLoading(false);
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
    <Row className="form-box-wrapper">
      <Col xs={24} sm={16} md={14} lg={10} xl={8} xxl={6}>
        <Card
          title="创建一个账户"
          className="info-card slideIn"
        >
          <Form onSubmit={handleSubmit} className="login-form">
            <Form.Item label="邮箱地址">
              {getFieldDecorator('email', {
                rules: [
                  {
                    required: true,
                    message: '请输入你的邮箱地址',
                  },
                  {
                    max: 32,
                    message: '长度不能超过32个字符',
                  },
                ],
              })(<Input
                prefix={<Icon type="mail" style={{ color: 'rgba(0, 0, 0, .25)' }} />}
                placeholder="邮箱地址"
                size="large"
              />)}
            </Form.Item>
            <Form.Item label="昵称">
              {getFieldDecorator('name', {
                rules: [
                  {
                    required: true,
                    message: '请输入你的昵称',
                  },
                  {
                    max: 20,
                    message: '长度不能超过20个字符',
                  },
                ],
              })(<Input
                prefix={<Icon type="user" style={{ color: 'rgba(0, 0, 0, .25)' }} />}
                placeholder="昵称"
                size="large"
              />)}
            </Form.Item>
            <Form.Item label="密码" hasFeedback={true}>
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
            <Form.Item label="确认密码" hasFeedback={true}>
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
                size="large"
                prefix={<Icon type="lock" style={{ color: 'rgba(0, 0, 0, .25)' }} />}
                type="password"
                placeholder="确认密码"
              />)}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('agree', {
                valuePropName: 'agree',
                initialValue: false,
              })(<Checkbox>已同意
                <a href="/license" target="_blank">用户协议</a>和
                <a href="/privacy_polity" target="_blank">隐私政策</a>
              </Checkbox>)}
              <section>
                <Button type="primary"
                  block={true}
                  loading={loading}
                  size="large"
                  htmlType="submit"
                  className="login-form-button"
                  disabled={!props.form.getFieldValue('agree')}
                >
                  创建账户
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

const Signin = Form.create({ name: 'signin' })(SigninForm);

export default Signin;
