import React from 'react'
import {
  Spin,
  Icon,
  Typography,
  Divider
} from 'antd'
import './Content.css'

const {
  Title,
  Text
} = Typography

interface ContentProps {
  children?: React.ReactNode
  loading?: boolean
  tip?: string
  title?: string
  controls?: React.ReactNode[] | React.ReactNode
}

const Content = (props: ContentProps): JSX.Element => 
  <Spin spinning={props.loading || false}
        tip={props.tip || '加载中...'}
        indicator={<Icon type={'loading'} spin/>}
  >
    {
      props.title
      ? <div className={'title-divider'}>
          <div className={'title-wrapper'}>
            <Title level={3}
                 ellipsis={true}
                 className={'content-title'}
            >
              <Text ellipsis={true} strong>
                {props.title}
              </Text>
              {
                props.controls || null
              }
            </Title>
          </div>
          <Divider/>
        </div>  
      : null
    }
    <div className={'content-wrapper'}>
      {props.children}
    </div>
  </Spin>

export default Content
