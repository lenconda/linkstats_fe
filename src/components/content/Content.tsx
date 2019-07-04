import React from 'react'
import {
  Spin,
  Icon
} from 'antd'

interface ContentProps {
  children?: React.ReactNode
  loading: boolean
  tip?: string
}

const Content = (props: ContentProps): JSX.Element => 
  <Spin spinning={props.loading}
        tip={props.tip || '加载中...'}
        indicator={<Icon type={'loading'} spin/>}
  >
    {props.children}
  </Spin>

export default Content
