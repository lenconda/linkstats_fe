import React, { Suspense, useEffect } from 'react'
import Navigate from '../../components/navigate/Navigate'
import {
  Layout,
  Menu,
  Icon,
  Tooltip,
  Spin,
  Dropdown
} from 'antd'
import './Dashboard.css'
import {
  Link,
  Switch,
  Route,
  Redirect,
  RouteComponentProps
} from 'react-router-dom'
import { history } from '../../App'
import routesMap from '../../routes.json'

const Home = React.lazy(() => import('./home/Home'))

const Links = React.lazy(() => import('./links/Links'))
const Records = React.lazy(() => import('./records/Records'))
const Detail = React.lazy(() => import('./records/detail/Detail'))

const ProfileDetail = React.lazy(() => import('./profile/detail/Detail'))
const ProfileChangepw = React.lazy(() => import('./profile/change_password/ChangePassword'))

const LinkDetail = React.lazy(() => import('./links/detail/Detail'))

const Create = React.lazy(() => import('./create/Create'))

const Code = React.lazy(() => import('./code/Code'))

const { Header, Content, Sider } = Layout

interface Props extends RouteComponentProps {}

const Dashboard = (props: Props): JSX.Element => {
  useEffect(() => {
    const map: any = routesMap
    const path: string = JSON.parse(JSON.stringify(props.location)).pathname || ''
    document.title = `${map[path]} | LinkStats` || 'LinkStats'
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.location.pathname])

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
      <Menu.Item key={'info'}>
        <Link to={'/dashboard/code/info'}>
          <Icon type="code" theme="filled" />&nbsp;探测代码
        </Link>
      </Menu.Item>
      <Menu.Item key={'records'}>
        <Link to={'/dashboard/code/records'}>
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
          <Menu.Item key={'/dashboard/home'}>
            <Link to={'/dashboard/home'}>
              <Icon type="dashboard" theme="filled" />
              <span className={'nav-text'}>仪表盘</span>
            </Link>
          </Menu.Item>
          <Menu.ItemGroup title={'探测链接'}>
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
          </Menu.ItemGroup>
          <Menu.ItemGroup title={'探测代码'}>
            <Menu.Item key={'/dashboard/code/info'}>
              <Link to={'/dashboard/code/info'}>
                <Icon type="code" theme="filled" />
                <span className={'nav-text'}>探测代码</span>
              </Link>
            </Menu.Item>
            <Menu.Item key={'/dashboard/code/records'}>
              <Link to={'/dashboard/code/records'}>
                <Icon type="unordered-list" />
                <span className={'nav-text'}>访问记录</span>
              </Link>
            </Menu.Item>
          </Menu.ItemGroup>
          <Menu.ItemGroup title={'技术支持'}>
            <Menu.Item>
              <a href={'/faq'} target={'_blank'}>
                <Icon type="question-circle" theme="filled" />
                <span className={'nav-text'}>常见问题</span>
              </a>
            </Menu.Item>
          </Menu.ItemGroup>
          <Menu.ItemGroup title={'其他功能'}>
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
          </Menu.ItemGroup>
        </Menu>
      </Sider>
      <Layout style={{overflowY: 'auto'}}>
        <Header className={'header'}>
          <Navigate pathname={props.location.pathname} map={routesMap}/>
          <div className={'header-controls'}>
            <Tooltip placement={'bottom'} title={'创建探测链接'}>
              <Link to={'/dashboard/create'} className={'create-link'}>
                <Icon type={'bulb'}/>
              </Link>
            </Tooltip>
            <Tooltip placement={'bottom'} title={'我的探测代码'}>
              <Link to={'/dashboard/code/info'} className={'create-link'}>
                <Icon type={'code'}/>
              </Link>
            </Tooltip>
            <Dropdown overlay={menu} trigger={['click']} className={'dropdown'}>
              <Icon type={'user'}/>
            </Dropdown>
          </div>
        </Header>
        <Content style={{margin: '24px 16px 0'}}>
          <div className={'content'}>
            <Suspense fallback={<Spin indicator={<Icon type={'loading'} spin={true}/>}/>}>
              <Switch>
                <Route path={'/dashboard/home'} component={Home}/>
                <Route path={'/dashboard/create'} component={Create}/>
                <Route path={'/dashboard/links'} component={Links}/>
                <Route path={'/dashboard/records'} component={Records}/>
                <Route path={'/dashboard/record/detail'} component={Detail}/>
                <Route path={'/dashboard/profile/detail'} component={ProfileDetail}/>
                <Route path={'/dashboard/link/detail'} component={LinkDetail}/>
                <Route path={'/dashboard/profile/changepw'} component={ProfileChangepw}/>
                <Route path={'/dashboard/code'} component={Code}/>
                <Redirect to={'/dashboard/home'}/>
              </Switch>
            </Suspense>
          </div>
        </Content>
      </Layout>
    </Layout>
  )
}

export default Dashboard
