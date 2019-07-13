import React, { useState, useEffect } from 'react'
import numeral from 'numeral'
import Content from '../../../components/content/Content'
import http from '../../../util/http'
import {
  Row,
  Col,
  Typography,
  Button,
  Progress
} from 'antd'
import './Home.css'
import { history } from '../../../App'
import { Link } from 'react-router-dom'

interface UserData {
  email: string
  name: string
  joinTime: number
}

interface RecordsData {
  link: number
  code: number
}

const Home = (): JSX.Element => {
  const [linkCount, setLinkCount] = useState<number>(0)
  const [code, setCode] = useState<boolean>(false)
  const [userData, setUserData] = useState<Partial<UserData>>({})
  const [recordsData, setRecordsData] = useState<Partial<RecordsData>>({})
  const [basicLoading, setBasicLoading] = useState<boolean>(false)
  const [recordsLoading, setRecordsLoading] = useState<boolean>(false)

  useEffect(() => {
    setBasicLoading(true)
    setRecordsLoading(true)
    http
    .get('/api/statistics/records')
    .then(res => {
      setRecordsLoading(false)
      if (res) {
        setRecordsData(res.data.data)
      }
    })
    http
    .get('/api/statistics/basic')
    .then(res => {
      setBasicLoading(false)
      if (res) {
        setUserData(res.data.data.user)
        setCode(res.data.data.code)
        setLinkCount(res.data.data.linkCount)
      }
    })
  }, [])

  return (
    <div>
      <Content loading={basicLoading}>
        <Row>
          <Col xxl={6} xl={6} lg={6} md={24} sm={24} xs={24} className={'wrapper'}>
            <div className={'info-container'}>
              <img src={'/user.svg'} alt={'avatar'} className={'avatar'}/>
              <Typography.Text strong ellipsis>{userData.name}</Typography.Text>
              <Typography.Text type={'secondary'} ellipsis>{userData.email}</Typography.Text>
              <Button size={'small'} 
                      type={'primary'}
                      className={'edit-profile'} 
                      onClick={() => history.push('/dashboard/profile/detail')}
              >
                编辑个人资料
              </Button>
            </div>
          </Col>
          <Col xxl={6} xl={6} lg={6} md={24} sm={24} xs={24} className={'wrapper'}>
            <Typography.Text type={'secondary'} ellipsis>使用时长</Typography.Text>
            <Typography.Title>
              {numeral(Math.round((userData.joinTime || 0) / 1000 / 60 / 60 / 24)).format('0 a')}
              <Typography.Text className={'day'}>天</Typography.Text>
            </Typography.Title>
          </Col>
          <Col xxl={6} xl={6} lg={6} md={24} sm={24} xs={24} className={'wrapper'}>
            <Typography.Text type={'secondary'} ellipsis>探测链接</Typography.Text>
            <Typography.Title>{linkCount}<Typography.Text className={'day'}>条</Typography.Text></Typography.Title>
            <Link to={'/dashboard/links'}>查看链接...</Link>
            <br/>
            <Typography.Text ellipsis>
              <Link to={'/dashboard/create'}>创建探测链接...</Link>
            </Typography.Text>
          </Col>
          <Col xxl={6} xl={6} lg={6} md={24} sm={24} xs={24} className={'wrapper'}>
            <Typography.Text type={'secondary'} ellipsis>探测代码</Typography.Text>
            <Typography.Title>{code ? '已' : '未'}启用</Typography.Title>
            <Link to={'/dashboard/code/info'}>查看代码...</Link>
          </Col>
        </Row>
      </Content>
      <Row>
        <Col span={24}>
          <Content title={'捕获数据'} loading={recordsLoading}>
            <Row>
              <Col xxl={8} xl={8} lg={8} md={24} sm={24} xs={24}>
                <Typography.Text type={'secondary'} ellipsis>捕获总量</Typography.Text>
                <Typography.Title>{((recordsData.link || 0) + (recordsData.code || 0))}<Typography.Text className={'day'}>次</Typography.Text></Typography.Title>
              </Col>
              <Col xxl={8} xl={8} lg={8} md={24} sm={24} xs={24}>
                <Typography.Text type={'secondary'} ellipsis>链接捕获总量</Typography.Text>
                <br/><br/>
                <Progress type={'circle'} 
                          percent={(recordsData.link || 0) / (((recordsData.link || 0) + (recordsData.code || 0)) || 1) * 100}
                          format={(percent?: number, successPercent?: number) => `${recordsData.link}次`}
                />
                <br/><br/>
                <Link to={'/dashboard/records'}>查看记录...</Link>
              </Col>
              <Col xxl={8} xl={8} lg={8} md={24} sm={24} xs={24}>
                <Typography.Text type={'secondary'} ellipsis>代码捕获总量</Typography.Text>
                <br/><br/>
                <Progress type={'circle'} 
                          percent={(recordsData.code || 0) / (((recordsData.link || 0) + (recordsData.code || 0)) || 1) * 100}
                          format={(percent?: number, successPercent?: number) => `${recordsData.code}次`}
                />
                <br/><br/>
                <Link to={'/dashboard/code/records'}>查看记录...</Link>
              </Col>
            </Row>
          </Content>
        </Col>
      </Row>
    </div>
  )
}

export default Home
