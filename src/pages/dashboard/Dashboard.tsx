import React from 'react'
import Navigate from '../../components/navigate/Navigate'
import {
  Layout,
  Menu,
  Icon,
  Divider
} from 'antd'
import './Dashboard.css'
import {
  Link,
  Switch,
  Route,
  Redirect
} from 'react-router-dom'

const Links = React.lazy(() => import('./links/Links'))

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
          </Menu>
        </Sider>
        <Layout style={{overflowY: 'auto'}}>
          <Header className={'header'}>
            <Navigate pathname={props.location.pathname}/>
          </Header>
          <Content style={{margin: '24px 16px 0'}}>
            <div className={'content'}>
              <Switch>
                <Route path={'/dashboard/links'} component={Links}/>
                <Redirect to={'/dashboard/links'}/>
              </Switch>
            </div>
          </Content>
        </Layout>
      </Layout>
  )
}

export default Dashboard
