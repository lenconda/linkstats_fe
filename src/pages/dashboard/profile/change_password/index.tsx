import React, { useEffect, useState } from 'react';
import http from '../../../../util/http';
import {
  Row,
  Col,
  Input,
  Button,
  Form,
} from 'antd';
import { history } from '../../../../App';
import Content from '../../../../components/Content';
import { FormComponentProps } from 'antd/lib/form';
import { RouteComponentProps } from 'react-router-dom';

interface Props extends FormComponentProps, RouteComponentProps {}

const ChangePasswordForm = (props: Props): JSX.Element => {
  const [changepwLoading, setChangepwLoading] = useState<boolean>(false);

  useEffect(() => {
    http.get('/api/profile/info');
  }, []);

  const { getFieldDecorator } = props.form;

  const handleSubmit = (e: any) => {
    e.preventDefault();
    props.form.validateFields((err: any, values: any) => {
      if (!err) {
        setChangepwLoading(true);
        http
          .post('/api/profile/change_password', {
            old: values.old,
            new: values.new,
          })
          .then(res => {
            setChangepwLoading(false);
          });
      }
    });
  };

  const compareToFirstPassword = (rule: any, value: any, callback: any) => {
    const { form } = props;
    if (value && value !== form.getFieldValue('new')) {
      callback('两次输入的密码不一致');
    } else {
      callback();
    }
  };

  return (
    <Content title="修改密码">
      <Row>
        <Col xxl={6} xl={8} lg={10} md={18} sm={24} xs={24}>
          <Form onSubmit={handleSubmit}>
            <Form.Item label="旧密码">
              {getFieldDecorator('old', {
                rules: [{ required: true, message: '请输入旧密码' }],
              })(<Input type="password" />)}
            </Form.Item>
            <Form.Item label="新密码">
              {getFieldDecorator('new', {
                rules: [
                  {
                    required: true,
                    message: '请输入新密码',
                  },
                  {
                    max: 18,
                    message: '长度不能超过18个字符',
                  },
                ],
              })(<Input type="password" />)}
            </Form.Item>
            <Form.Item label="确认新密码">
              {getFieldDecorator('confirm', {
                rules: [
                  {
                    required: true,
                    message: '请确认新密码',
                  },
                  {
                    max: 18,
                    message: '长度不能超过18个字符',
                  },
                  {
                    validator: compareToFirstPassword,
                  },
                ],
              })(<Input type="password" />)}
            </Form.Item>
            <Form.Item>
              <Button type="primary"
                htmlType="submit"
                loading={changepwLoading}
                disabled={
                  !props.form.getFieldValue('old')
                        || !props.form.getFieldValue('new')
                        || !props.form.getFieldValue('confirm')
                }
              >
                保存更改
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

const ChangePassword = Form.create()(ChangePasswordForm);
export default ChangePassword;
