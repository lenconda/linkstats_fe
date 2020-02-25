import React, { useState, useEffect } from 'react';
import qs from 'query-string';
import http from '../../../../util/http';
import {
  Form,
  Row,
  Col,
  Modal,
  Button,
  Input,
  Divider,
  Typography,
} from 'antd';
import Content from '../../../../components/Content';
import { history } from '../../../../App';
import './index.less';
import moment from 'moment';
import { FormComponentProps } from 'antd/lib/form';
import { RouteComponentProps } from 'react-router-dom';

const {
  Text,
  Paragraph,
} = Typography;

interface Record {
  createTime: number;
  updateTime?: number;
  originalUrl: string;
  shorternUrl: string;
  comment: string;
  qrCode: string;
}

interface Props extends FormComponentProps, RouteComponentProps {}

const DetailForm = (props: Props): JSX.Element => {
  const { getFieldDecorator } = props.form;
  const uuid = JSON.parse(JSON.stringify(qs.parse(props.location.search))).uuid || undefined;

  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<Partial<Record>>({});
  const [updating, setUpdating] = useState<boolean>(false);
  const [deleting, setDeleting] = useState<boolean>(false);

  const fetch = () => {
    setLoading(true);
    http
      .get(`/api/links/${uuid}`)
      .then(res => {
        setLoading(false);
        if (res) {
          setData(res.data.data);
          props.form.setFieldsValue({
            originalUrl: res.data.data.originalUrl,
            comment: res.data.data.comment,
          });
        }
      });
  };

  const updateLink = (updates: any) => {
    setUpdating(true);
    http
      .put(`/api/links/${uuid}`, { updates })
      .then(res => {
        setUpdating(false);
        if (res) { fetch() }
      });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    props.form.validateFields((err: any, values: any) => {
      if (!err) {
        updateLink(values);
      }
    });
  };

  const handleDeleteLink = () => {
    setDeleting(true);
    http
      .delete('/api/links', { data: { links: [uuid] }})
      .then(res => {
        setDeleting(false);
        if (res) { history.goBack() }
      });
  };

  const validateUrl = (rule: any, value: any, callback: any) => {
    // eslint-disable-next-line no-useless-escape
    const urlChecker = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/g;

    if (!urlChecker.test(props.form.getFieldValue('originalUrl'))) {
      callback('请输入合法的URL');
    } else { callback() }
  };

  useEffect(() => {
    fetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [uuid]);

  return (
    <Row>
      <Col xxl={12} xl={12} md={12} sm={24} xs={24}>
        <Content title="链接信息" className="detail-card" loading={loading}>
          <Row>
            <Col span={12}>
              <Text type="secondary">UUID</Text>
            </Col>
            <Col span={12} className="info-item">
              <Text copyable code>{uuid}</Text>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <Text type="secondary">原始URL</Text>
            </Col>
            <Col span={12} className="info-item">
              <Text copyable>{data.originalUrl}</Text>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <Text type="secondary">探测链接</Text>
            </Col>
            <Col span={12} className="info-item">
              <Text copyable>{data.shorternUrl}</Text>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <Text type="secondary">创建时间</Text>
            </Col>
            <Col span={12} className="info-item">
              <Text>{moment(data.createTime).format('YY-MM-DD HH:mm:ss')}</Text>
            </Col>
          </Row>
          {
            data.updateTime
              ? <Row>
                <Col span={12}>
                  <Text type="secondary">更新时间</Text>
                </Col>
                <Col span={12} className="info-item">
                  <Text>{moment(data.updateTime).format('YY-MM-DD HH:mm:ss')}</Text>
                </Col>
              </Row>
              : null
          }
        </Content>
        <Content title="更新信息" className="detail-card" loading={loading}>
          <Form onSubmit={handleSubmit}>
            <Form.Item label="原始链接">
              {getFieldDecorator('originalUrl', {
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
              })(<Input />)}
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
                loading={updating}
              >
                保存修改
              </Button>&nbsp;&nbsp;
              <Button type="ghost"
                onClick={() => history.goBack()}
              >
                取消
              </Button>
            </Form.Item>
          </Form>
        </Content>
      </Col>
      <Col xxl={12} xl={12} md={12} sm={24} xs={24}>
        <Content title="操作" className="detail-card">
          <Button type="primary"
            icon="bulb"
            onClick={() => history.push('/dashboard/create')}
          >
            创建一个新链接...
          </Button>
          <Divider />
          <Row>
            <Col span={12}>
              <Text strong>删除链接</Text>
              <Paragraph>
                一旦删除，操作将无法挽回
              </Paragraph>
            </Col>
            <Col span={12} style={{ textAlign: 'right' }}>
              <Button type="danger"
                icon="delete"
                onClick={() => {
                  Modal.confirm({
                    title: '确实要删除这个探测链接吗？',
                    content: '此操作将不可恢复',
                    okText: '确定',
                    cancelText: '取消',
                    okButtonProps: {
                      loading: deleting,
                    },
                    onOk: () => handleDeleteLink(),
                    onCancel: () => {},
                  });
                }}
              >
                删除这个链接...
              </Button>
            </Col>
          </Row>
        </Content>
      </Col>
    </Row>
  );
};

const Detail = Form.create()(DetailForm);
export default Detail;
