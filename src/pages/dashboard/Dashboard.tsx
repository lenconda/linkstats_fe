import React, { Suspense } from 'react'
import Navigate from '../../components/navigate/Navigate'
import {
  Layout,
  Menu,
  Icon
} from 'antd'
import './Dashboard.css'
import {
  Link,
  Switch,
  Route,
  Redirect
} from 'react-router-dom'

const Links = React.lazy(() => import('./links/Links'))
const Records = React.lazy(() => import('./records/Records'))
const Detail = React.lazy(() => import('./records/detail/Detail'))

const { Header, Content, Sider } = Layout

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
            <Menu.Item key={'/dashboard/records'}>
              <Link to={'/dashboard/records'}>
                <Icon type="unordered-list" />
                <span className={'nav-text'}>访问记录</span>
              </Link>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout style={{overflowY: 'auto'}}>
          <Header className={'header'}>
            <Navigate pathname={props.location.pathname}/>
          </Header>
          <Content style={{margin: '24px 16px 0'}}>
            <div className={'content'}>
              <Suspense fallback={null}>
                <Switch>
                  <Route path={'/dashboard/links'} component={Links}/>
                  <Route path={'/dashboard/records'} component={Records}/>
                  <Route path={'/dashboard/record/detail'} component={Detail}/>
                  <Redirect to={'/dashboard/links'}/>
                </Switch>
              </Suspense>
            </div>
          </Content>
        </Layout>
      </Layout>
  )
}

export default Dashboard
