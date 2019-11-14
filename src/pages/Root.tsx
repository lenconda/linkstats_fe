import React from 'react'
import {
  Divider,
  Icon,
  Button,
  Typography
} from 'antd'
import './Root.css'
import { history } from '../App'

const {
  Title
} = Typography

const Root: React.FC = (): JSX.Element =>
    <div className={'root-container'}>
      <div>
        <Title level={1} className={'title'}>
          <img src={'/logo.svg'} alt={'logo'} height={32}/>
          <Divider type={'vertical'}/>
          LinkStats
        </Title>
        <p>轻量的链接访问数据记录工具</p>
        <span>
          <a href="/docs" target={'_blank'}><Icon type="file-text" />&nbsp;文档</a>
          <Divider type={'vertical'}/>
          <a href="https://github.com/lenconda" target={'_blank'}><Icon type="github" />&nbsp;GitHub</a>
          <Divider type={'vertical'}/>
          <a href="https://github.com/lenconda/linkstats/issues" target={'_blank'}>
            <Icon type="question-circle" />&nbsp;常见问题
          </a>
        </span>
        <div style={{marginTop: 50}}>
          <Button
              type={'primary'}
              shape={'round'}
              block={true}
              size={'large'} onClick={() => history.push('/dashboard')}>
            <Icon type="rocket" theme="filled" />&nbsp;开始使用
          </Button>
        </div>
      </div>
    </div>

export default Root
