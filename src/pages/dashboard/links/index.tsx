import React, { useState, useEffect } from 'react';
import http from '../../../util/http';
import {
  Button,
  Pagination,
} from 'antd';
import qs from 'query-string';
import { history } from '../../../App';
import './index.less';
import Content from '../../../components/Content';
import LinkItem from '../../../components/LinkItem';
import { RouteComponentProps } from 'react-router-dom';

interface Item {
  uuid: string;
  createTime: number;
  updateTime: number;
  comment: string;
  originalUrl: string;
  shorternUrl: string;
  qrCode: string;
}

interface Props extends RouteComponentProps {}

const Links = (props: Props): JSX.Element => {
  const [data, setData] = useState<Item[]>([]);
  const [count, setCount] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);

  const page = parseInt(JSON.parse(JSON.stringify(qs.parse(props.location.search))).page, 10) || 1;
  const size = parseInt(JSON.parse(JSON.stringify(qs.parse(props.location.search))).size, 10) || 10;
  const fetch = () => {
    setLoading(true);
    http
      .get(`/api/links?page=${page}&size=${size}`)
      .then(res => {
        if (res) {
          setData(res.data.data.items);
          setCount(res.data.data.count);
          setLoading(false);
        }
      });
  };

  useEffect(() => {
    setCurrentPage(page);
    fetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, size]);

  const handlePageChange = (page: any, pageSize: any) => {
    history.push(`/dashboard/links?page=${page}&size=${size}`);
  };

  const handleViewDetail = (uuid: string) => {
    history.push(`/dashboard/link/detail?uuid=${uuid}`);
  };

  return (
    <Content loading={loading}
      title="生成的链接列表"
      controls={
        <div>
          <Button type="primary"
            icon="bulb"
            onClick={() => history.push('/dashboard/create')}
          >
            创建链接
          </Button>
        </div>
      }
    >
      {
        data.map((value, index) => (
          <LinkItem uuid={value.uuid}
            key={index}
            createTime={value.createTime}
            updateTime={value.updateTime}
            comment={value.comment}
            onDetail={handleViewDetail}
          />
        ))
      }
      <Pagination current={currentPage} total={count} pageSize={size} onChange={handlePageChange} />
    </Content>
  );
};

export default Links;
