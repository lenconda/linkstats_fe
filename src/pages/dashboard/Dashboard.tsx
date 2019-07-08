import React, { Suspense } from 'react'
import Navigate from '../../components/navigate/Navigate'
import {
  Layout,
  Menu,
  Icon,
  Tooltip,
  Dropdown
} from 'antd'
import './Dashboard.css'
import {
  Link,
  Switch,
  Route,
  Redirect
} from 'react-router-dom'
import { history } from '../../App'

const Links = React.lazy(() => import('./links/Links'))
const Records = React.lazy(() => import('./records/Records'))
const Detail = React.lazy(() => import('./records/detail/Detail'))

const ProfileDetail = React.lazy(() => import('./profile/detail/Detail'))
const ProfileChangepw = React.lazy(() => import('./profile/change_password/ChangePassword'))

const LinkDetail = React.lazy(() => import('./links/detail/Detail'))

const Create = React.lazy(() => import('./create/Create'))

const { Header, Content, Sider } = Layout

const Dashboard: React.FC = (props: any): JSX.Element => {
  const menu = (
      <Menu>
        <Menu.Item key={'links'}>
          <Link to={'/dashboard/links'}>
            <Icon type={'file-text'} theme={'filled'}/>&nbsp;链接列表
          </Link>
        </Menu.Item>
        <Menu.Item key={'records'}>
          <Link to={'/dashboard/records'}>
            <Icon type={'unordered-list'}/>&nbsp;访问记录
          </Link>
        </Menu.Item>
        <Menu.Divider/>
        <Menu.Item key={'detail'}>
          <Link to={'/dashboard/profile/detail'}>
            <Icon type={'idcard'} theme={'filled'}/>&nbsp;我的资料
          </Link>
        </Menu.Item>
        <Menu.Item key={'changepw'}>
          <Link to={'/dashboard/profile/changepw'}>
            <Icon type={'lock'} theme={'filled'}/>&nbsp;修改密码
          </Link>
        </Menu.Item>
        <Menu.Divider/>
        <Menu.Item key={'signout'} onClick={() => handleSignout()}>
          <Icon type={'logout'}/>&nbsp;退出登录
        </Menu.Item>
      </Menu>
  )

  const handleSignout = () => {
    localStorage.removeItem('token')
    sessionStorage.removeItem('token')
    history.push('/login')
  }

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
          <Menu theme={'dark'} mode={'inline'}
                selectedKeys={[props.location.pathname]}
          >
            <Menu.Item key={'/dashboard/create'}>
              <Link to={'/dashboard/create'}>
                <Icon type="bulb" theme="filled"/>
                <span className={'nav-text'}>创建链接</span>
              </Link>
            </Menu.Item>
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
            <Menu.SubMenu title={<div><Icon type={'user'}/>&nbsp;账户管理</div>}>
              <Menu.Item key={'/dashboard/profile/detail'}>
                <Link to={'/dashboard/profile/detail'}>
                  <span className={'nav-text'}>我的资料</span>
                </Link>
              </Menu.Item>
              <Menu.Item key={'/dashboard/profile/changepw'}>
                <Link to={'/dashboard/profile/changepw'}>
                  <span className={'nav-text'}>修改密码</span>
                </Link>
              </Menu.Item>
              <Menu.Item onClick={() => handleSignout()}>
                <span className={'nav-text'}>退出登录</span>
              </Menu.Item>
            </Menu.SubMenu>
          </Menu>
        </Sider>
        <Layout style={{overflowY: 'auto'}}>
          <Header className={'header'}>
            <Navigate pathname={props.location.pathname}/>
            <div className={'header-controls'}>
              <Tooltip placement={'bottom'} title={'创建探测链接'}>
                <Link to={'/dashboard/create'} className={'create-link'}>
                  <Icon type={'bulb'} theme={'filled'}/>
                </Link>
              </Tooltip>
              <Dropdown overlay={menu} trigger={['click']} className={'dropdown'}>
                <img src={'/user.svg'} alt={'user-logo'} height={30}/>
              </Dropdown>
            </div>
          </Header>
          <Content style={{margin: '24px 16px 0'}}>
            <div className={'content'}>
              <Suspense fallback={null}>
                <Switch>
                  <Route path={'/dashboard/create'} component={Create}/>
                  <Route path={'/dashboard/links'} component={Links}/>
                  <Route path={'/dashboard/records'} component={Records}/>
                  <Route path={'/dashboard/record/detail'} component={Detail}/>
                  <Route path={'/dashboard/profile/detail'} component={ProfileDetail}/>
                  <Route path={'/dashboard/link/detail'} component={LinkDetail}/>
                  <Route path={'/dashboard/profile/changepw'} component={ProfileChangepw}/>
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
