import React from 'react'
import http from '../../util/http'
import {
  Layout,
  Menu,
  Icon
} from 'antd'
import './Dashboard.css'
import { Link } from 'react-router-dom'

const { Header, Content, Footer, Sider } = Layout

const Dashboard: React.FC = (props: any): JSX.Element => {
  return (
      <Layout style={{height: '100%'}}>
        <Sider
            breakpoint={'lg'}
            collapsedWidth={'0'}
            className={'sidebar'}
        >
          <div className={'logo'}>
            LinkStats, Inc.
          </div>
          <Menu theme={'dark'} mode={'inline'} selectedKeys={[props.location.pathname]}>
            <Menu.Item key={'/dashboard/links'}>
              <Link to={'/dashboard/links'}>
                <Icon type="file-text" theme="filled"/>
                <span className={'nav-text'}>链接列表</span>
              </Link>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Header style={{background: '#fff', padding: 0}}/>
          <Content style={{margin: '24px 16px 0'}}>
            <div className={'content'}>content</div>
          </Content>
          <Footer style={{textAlign: 'center'}}>
            ©️{new Date().getFullYear()} LinkStats, Inc. 了解我们的
            <a href={'https://legal.linkstats.cc/privacy_polity'} target={'_blank'}>隐私政策</a>
          </Footer>
        </Layout>
      </Layout>
  )
}

export default Dashboard
