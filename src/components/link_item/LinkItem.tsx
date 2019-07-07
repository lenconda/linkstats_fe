import React from 'react'
import {
  Icon,
  Typography,
  Button,
  Divider
} from 'antd'
import moment from 'moment'
import './LinkItem.css'

const {
  Text,
  Title,
  Paragraph
} = Typography

interface LinkItemProps {
  uuid: string
  createTime: number
  updateTime?: number
  comment: string
  onDetail: (uuid: string) => any
}

const LinkItem = (props: LinkItemProps): JSX.Element => {
  return (
    <section>
      <Title level={4} ellipsis={true}>{props.uuid}</Title>
      <Text ellipsis={true}>
        <Text className={'time'}>
          <Icon type={'calendar'} theme={'filled'}/>&nbsp;
          {moment(props.createTime).format('YY-MM-DD HH:mm:ss')}
        </Text>
        {
          props.updateTime
          ? <Text className={'time'}>
              <Icon type={'edit'} theme={'filled'}/>&nbsp;
              {moment(props.createTime).format('YY-MM-DD HH:mm:ss')}
            </Text>
          : null
        }
      </Text>
      <br/>
      <Paragraph className={'comment'}>
        {props.comment || '暂无描述。'}
      </Paragraph>
      <br/>
      <Button type={'ghost'} 
              size={'small'} 
              className={'detail-button'}
              onClick={() => props.onDetail(props.uuid)}
      >
        查看详情&nbsp;&rarr;
      </Button>
      <Divider/>
    </section>
  )
}

export default LinkItem
