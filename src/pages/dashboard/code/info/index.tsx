import React, { useState, useEffect } from 'react';
import http from '../../../../util/http';
import Content from '../../../../components/Content';
import {
  Row,
  Col,
} from 'antd';

const Info = (): JSX.Element => {
  const [loading, setLoading] = useState<boolean>(false);
  const [uuid, setUuid] = useState<string>('');

  useEffect(() => {
    setLoading(true);
    http
      .get('/api/profile/info')
      .then(res => {
        setLoading(false);
        if (res) { setUuid(res.data.data.uuid) }
      });
  }, []);

  return (
    <Content loading={loading} title="探测代码">
      <p>
        这是针对某个站点的全局探测代码。它实现了和探测链接相似的功能，但不需要经过探测跳转但过程而直接记录被探测者的信息。
        请复制此代码，并将其作为一段脚本粘贴进一段HTML代码的头部中。
      </p>
      <Row>
        <Col xxl={12} xl={12} lg={24} md={24} sm={24} xs={24}>
          <pre style={{ color: '#333' }}>
            &lt;script src=&quot;https://linkstats.lenconda.top/js/code.js&quot;&gt;&lt;/script&gt;
            <br />
            &lt;script&gt;
            <br />
            &nbsp;&nbsp;window.send(&quot;{uuid}&quot;, window.location.href);
            <br />
            &lt;/script&gt;
          </pre>
        </Col>
      </Row>
    </Content>
  );
};

export default Info;
