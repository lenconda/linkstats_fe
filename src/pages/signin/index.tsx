import React, { useState, useEffect } from 'react';
import {
  Button,
  Input,
  Row,
  Col,
  Card,
  Icon,
  Form,
  Checkbox,
  message,
} from 'antd';
import {
  Link,
  RouteComponentProps,
} from 'react-router-dom';
import qs from 'query-string';
import { Base64 } from 'js-base64';
import http from '../../util/http';
import { history } from '../../App';
import { FormComponentProps } from 'antd/lib/form';

interface Props extends RouteComponentProps, FormComponentProps {}

const LoginForm = (props: Props): JSX.Element => {
  const { getFieldDecorator } = props.form;
  const search = JSON.parse(JSON.stringify(qs.parse(props.location.search)));
  const params = {
    action: search.action || '',
    user: search.user || '',
    code: search.code || '',
    redirect: search.redirect || '',
  };

  const [email, setEmail] = useState<string>('');
  const [loginLoading, setLoginLoading] = useState<boolean>(false);

  useEffect(() => {
    if (params.action === 'active' && params.user && params.code) {
      const query = {
        user: params.user,
        code: params.code,
      };
      http.get('/api/auth/active', { params: query });
    }
  }, []);

  useEffect(() => {
    http
      .get('/api/profile/info')
      .then(res => {
        if (res) { history.goBack() }
      });
  }, [props.location.pathname]);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    props.form.validateFields((err: any, values: any) => {
      if (!err) {
        const { email, password, remember } = values;
        localStorage.setItem('persist', remember);
        setLoginLoading(true);
        http
          .post('/api/auth/login', { email, password })
          .then(res => {
            setLoginLoading(false);
            if (res) {
              remember
                ? localStorage.setItem('token', res.data.data.token)
                : sessionStorage.setItem('token', res.data.data.token);
              history.push(params.redirect ? Base64.decode(params.redirect) : '/dashboard');
            }
          });
      }
    });
  };

  const handleForgotPassword = () => {
    if (!email) {
      message.warn('请填写邮箱地址');
      return;
    }

    const query = {
      user: email,
    };
    http.get('/api/auth/forgot', { params: query });
  };

  return (
    <Row className="form-box-wrapper">
      <Col xs={24} sm={16} md={14} lg={10} xl={8} xxl={6}>
        <Card title="验证你的凭据"
          className="info-card slideIn"
        >
          <Form onSubmit={handleSubmit} className="login-form">
            <Form.Item>
              {getFieldDecorator('email', {
                rules: [{ required: true, message: '请输入你的邮箱地址' }],
              })(<Input
                size="large"
                prefix={<Icon type="user" style={{ color: 'rgba(0, 0, 0, .25)' }} />}
                placeholder="邮箱地址"
                onChange={e => setEmail(e.target.value)}
              />)}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('password', {
                rules: [{ required: true, message: '请输入你的密码' }],
              })(<Input
                size="large"
                prefix={<Icon type="lock" style={{ color: 'rgba(0, 0, 0, .25)' }} />}
                type="password"
                placeholder="密码"
              />)}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('remember', {
                valuePropName: 'checked',
                initialValue: true,
              })(<Checkbox>使我保持登录状态</Checkbox>)}
              <>
                <Button type="primary"
                  loading={loginLoading}
                  block={true}
                  size="large"
                  htmlType="submit"
                  className="login-form-button"
                >
                  登录
                </Button>
              </>
            </Form.Item>
            <Form.Item>
              <Button
                type="link"
                onClick={() => handleForgotPassword()}
              >
                忘记密码
              </Button>
              <br />
              <Button
                type="link"
                onClick={() => history.push('/signup')}
              >
                创建一个账户 &rarr;
              </Button>
            </Form.Item>
          </Form>
        </Card>
        <br />
        <Link to="/">&larr; 返回首页</Link>
      </Col>
    </Row>
  );
};

const Login = Form.create({ name: 'login' })(LoginForm);

export default Login;
