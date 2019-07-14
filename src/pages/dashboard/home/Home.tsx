import React, { useState, useEffect } from 'react'
import numeral from 'numeral'
import Content from '../../../components/content/Content'
import http from '../../../util/http'
import {
  Row,
  Col,
  Typography,
  Button,
  Card,
  Tooltip,
  Progress,
  Select
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

interface CountryCount {
  country: string
  count: number
}

const Home = (): JSX.Element => {
  const [linkCount, setLinkCount] = useState<number>(0)
  const [code, setCode] = useState<boolean>(false)
  const [userData, setUserData] = useState<Partial<UserData>>({})
  const [recordsData, setRecordsData] = useState<Partial<RecordsData>>({})
  const [basicLoading, setBasicLoading] = useState<boolean>(false)
  const [recordsLoading, setRecordsLoading] = useState<boolean>(false)
  const [countryLoading, setCountryLoading] = useState<boolean>(false)
  const [countryCount, setCountryCount] = useState<CountryCount[]>([])
  const [countryType, setCountryType] = useState<string>('link')

  useEffect(() => {
    setBasicLoading(true)
    setRecordsLoading(true)
    setCountryLoading(true)
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

  useEffect(() => {
    setCountryLoading(true)
    http
    .get(`/api/statistics/countries?src=${countryType}`)
    .then(res => {
      setCountryLoading(false)
      if (res)
        setCountryCount(res.data.data)
    })
    // eslint-disable-next-line
  }, [countryType])

  return (
    <Row>
      <Col xxl={8} xl={8} lg={8} md={24} sm={24} xs={24} className={'wrapper'}>
        <Content loading={basicLoading}>
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
        </Content>
        <Card title={'链接捕获量'} 
              className={'info-card-stats'} 
              loading={recordsLoading}
              extra={<Link to={'/dashboard/records'}>查看记录</Link>}
        >
          <Progress type={'circle'} 
                    percent={(recordsData.link || 0) / (((recordsData.link || 0) + (recordsData.code || 0)) || 1) * 100}
                    format={(percent?: number, successPercent?: number) => `${recordsData.link}次`}
          />
        </Card>
        <Card title={'代码捕获量'} 
              className={'info-card-stats'} 
              loading={recordsLoading}
              extra={<Link to={'/dashboard/code/records'}>查看记录</Link>}
        >
          <Progress type={'circle'} 
                    percent={(recordsData.code || 0) / (((recordsData.link || 0) + (recordsData.code || 0)) || 1) * 100}
                    format={(percent?: number, successPercent?: number) => `${recordsData.code}次`}
          />
        </Card>
      </Col>
      <Col xxl={8} xl={8} lg={8} md={24} sm={24} xs={24} className={'wrapper'}>
        <Card title={'使用时长'} className={'info-card'} loading={basicLoading}>
          <Typography.Title>
            {numeral(Math.round((userData.joinTime || 0) / 1000 / 60 / 60 / 24)).format('0 a')}
            <Typography.Text className={'day'}>天</Typography.Text>
          </Typography.Title>
        </Card>
        <Card title={'国家/地区'} 
              className={'info-card'} 
              loading={countryLoading}
              extra={
                <Select defaultValue={'link'} onChange={(value: string) => setCountryType(value)}>
                  <Select.Option value={'link'}>探测链接</Select.Option>
                  <Select.Option value={'code'}>探测代码</Select.Option>
                </Select>
              }
        >
          {
            countryCount.map((value, index) => (
              <Row key={index}>
                <Col span={4}>
                  <Typography.Text className={'country-name'}>{value.country || '未知'}</Typography.Text>
                </Col>
                <Col span={20}>
                  <Tooltip title={`${value.count}条记录`}>
                    <Progress percent={Math.round(value.count / (countryType === 'link' ? (recordsData.link || 1) : (recordsData.code || 1)) * 100)}/>
                  </Tooltip>
                </Col>
              </Row>
            ))
          } 
        </Card>
      </Col>
      <Col xxl={8} xl={8} lg={8} md={24} sm={24} xs={24} className={'wrapper'}>
        <Card title={'探测链接'} 
              className={'info-card'}
              loading={basicLoading}
              extra={<Link to={'/dashboard/links'}>查看链接</Link>}
        >
          <Typography.Title>{linkCount}<Typography.Text className={'day'}>条</Typography.Text></Typography.Title>
          <br/>
          <Typography.Text ellipsis><Link to={'/dashboard/create'}>创建探测链接</Link></Typography.Text>
        </Card>
        <Card title={'探测代码'} 
              className={'info-card'} 
              loading={basicLoading}
              extra={<Link to={'/dashboard/code/info'}>查看代码</Link>}
        >
          <Typography.Title>{code ? '已' : '未'}启用</Typography.Title>
        </Card>
      </Col>
    </Row>
  )
}

export default Home
