import React from 'react'
import numeral from 'numeral'
import Content from '../../../components/content/Content'
// import http from '../../../util/http'
import {
  Row,
  Col,
  Typography,
  Button
} from 'antd'
import './Home.css'
import { history } from '../../../App'
import { Link } from 'react-router-dom'

const Home = (): JSX.Element => {
  return (
    <div>
      <Content>
        <Row>
          <Col xxl={6} xl={6} lg={6} md={24} sm={24} xs={24} className={'wrapper'}>
            <div className={'info-container'}>
              <img src={'/user.svg'} alt={'avatar'} className={'avatar'}/>
              <Typography.Text strong ellipsis>Lenconda</Typography.Text>
              <Typography.Text type={'secondary'} ellipsis>1053464288@qq.com</Typography.Text>
              <Button size={'small'} className={'edit-profile'} onClick={() => history.push('/dashboard/profile/detail')}>编辑个人资料</Button>
            </div>
          </Col>
          <Col xxl={6} xl={6} lg={6} md={24} sm={24} xs={24} className={'wrapper'}>
            <Typography.Text type={'secondary'} ellipsis>使用时长</Typography.Text>
            <Typography.Title>{numeral(2333).format('0 a')}<Typography.Text className={'day'}>天</Typography.Text></Typography.Title>
          </Col>
          <Col xxl={6} xl={6} lg={6} md={24} sm={24} xs={24} className={'wrapper'}>
            <Typography.Text type={'secondary'} ellipsis>探测链接</Typography.Text>
            <Typography.Title>233<Typography.Text className={'day'}>条</Typography.Text></Typography.Title>
            <Link to={'/dashboard/links'}>查看链接...</Link>
            <br/>
            <Typography.Text ellipsis>
              <Link to={'/dashboard/create'}>创建一个探测链接</Link>
            </Typography.Text>
            
          </Col>
          <Col xxl={6} xl={6} lg={6} md={24} sm={24} xs={24} className={'wrapper'}>
            <Typography.Text type={'secondary'} ellipsis>探测代码</Typography.Text>
            <Typography.Title>已启用</Typography.Title>
            <Link to={'/dashboard/code/info'}>查看代码...</Link>
          </Col>
        </Row>
      </Content>
      <Row>
        <Col xxl={12} xl={12} lg={12} md={24} sm={24} xs={24} className={'linkdata'}>
          <Content title={'探测链接数据'}>
            <Row>
              <Col xxl={12} xl={12} lg={12} md={24} sm={24} xs={24}>
                <Typography.Text type={'secondary'} ellipsis>探测捕获总量</Typography.Text>
                <Typography.Title>233<Typography.Text className={'day'}>次</Typography.Text></Typography.Title>
              </Col>
              <Col xxl={12} xl={12} lg={12} md={24} sm={24} xs={24}>
                <Typography.Text type={'secondary'} ellipsis>国家/地区总量</Typography.Text>
                <Typography.Title>233<Typography.Text className={'day'}>个</Typography.Text></Typography.Title>
              </Col>
            </Row>
          </Content>
        </Col>
        <Col xxl={12} xl={12} lg={12} md={24} sm={24} xs={24} className={'codedata'}>
          <Content title={'探测代码数据'}>
            <Row>
              <Col xxl={8} xl={8} lg={8} md={24} sm={24} xs={24}>
                <Typography.Text type={'secondary'} ellipsis>探测捕获总量</Typography.Text>
                <Typography.Title>233<Typography.Text className={'day'}>次</Typography.Text></Typography.Title>
              </Col>
              <Col xxl={8} xl={8} lg={8} md={24} sm={24} xs={24}>
                <Typography.Text type={'secondary'} ellipsis>国家/地区总量</Typography.Text>
                <Typography.Title>233<Typography.Text className={'day'}>个</Typography.Text></Typography.Title>
              </Col>
              <Col xxl={8} xl={8} lg={8} md={24} sm={24} xs={24}>
                <Typography.Text type={'secondary'} ellipsis>页面来源总量</Typography.Text>
                <Typography.Title>233<Typography.Text className={'day'}>个</Typography.Text></Typography.Title>
              </Col>
            </Row>
          </Content>
        </Col>
      </Row>
    </div>
  )
}

export default Home
