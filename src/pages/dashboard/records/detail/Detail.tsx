import React, { useState, useEffect } from 'react'
import qs from 'query-string'
import {
  Typography,
  Icon,
  Divider,
  Collapse,
  Button,
  Spin
} from 'antd'
import http from '../../../../util/http'
import moment from 'moment'
import { history } from '../../../../App'

interface SoftwareInfo {
  name: string
  version: string
  _id: string
}

interface HardwareInfo {
  type: string
  manufacturer: string
  model: string
  _id: string
}

interface IPInfo {
  country: string
  countryCode: string
  region: string
  city: string
  latitude: string
  longitude: string
}

interface Detail {
  _id: string
  __v: number
  uuid: string
  belongs: string
  ip: string
  userAgent: string
  createTime: number
}

interface LinkInfo {
  createTime: number
  originalUrl: string
  shorternUrl: string
  qrCode: string
}

const {
  Title,
  Text,
  Paragraph
} = Typography
const { Panel } = Collapse

const Detail = (props: any): JSX.Element => {
  const [loading, setLoading] = useState<boolean>(false)
  const [linkInfo, setLinkInfo] = useState<Partial<LinkInfo>>({})
  const [basicInfo, setBasicInfo] = useState<Partial<Detail>>({})
  const [locationInfo, setLocationInfo] = useState<Partial<IPInfo>>({})
  const [deviceInfo, setDeviceInfo] = useState<Partial<HardwareInfo>>({})
  const [osInfo, setOsInfo] = useState<Partial<SoftwareInfo>>({})
  const [browserInfo, setBrowserInfo] = useState<Partial<SoftwareInfo>>({})
  const [engineInfo, setEngineInfo] = useState<Partial<SoftwareInfo>>({})

  const uuid = JSON.parse(JSON.stringify(qs.parse(props.location.search))).uuid || undefined
  const fetch = () => {
    setLoading(true)
    http
    .get(`/api/record/detail/${uuid}`)
    .then(res => {
      if (res) {
        setBasicInfo(res.data.data)
        setLocationInfo(res.data.data.ipLocation)
        setDeviceInfo(res.data.data.device)
        setOsInfo(res.data.data.os)
        setBrowserInfo(res.data.data.browser)
        setEngineInfo(res.data.data.engine)
        setLoading(false)
        http
        .get(`/api/links/${res.data.data.belongs}`)
        .then(res => {
          if (res)
            setLinkInfo(res.data.data)
        })
      }
    })
  }

  useEffect(() => {
    fetch()
  }, [props.location.search])

  return (
      loading ? <Spin/> :
        <div>
          <Title level={3} ellipsis={true}
                 style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
            <Text ellipsis={true} strong>
              <Icon type={'info-circle'}/>&nbsp;
              访问记录的详细信息
            </Text>
            <Button type={'ghost'}
                    icon={'double-left'}
                    onClick={() => history.goBack()}
            >
              返回
            </Button>
          </Title>
          <Divider/>
          <Title level={4} ellipsis={true}>
            基本信息
          </Title>
          <Divider/>
          <Paragraph ellipsis={true}>
            <Text ellipsis={true}>
              <Text strong>记录ID: </Text>
              <Text copyable={true}>{basicInfo.uuid}</Text>
            </Text>
            <br/>
            <Text ellipsis={true}>
              <Text strong>IP地址: </Text>
              <Text copyable={true}>{basicInfo.ip}</Text>
            </Text>
            <br/>
            <Text ellipsis={true}>
              <Text strong>访问时间: </Text>{moment(basicInfo.createTime).format('YY-MM-DD HH:mm:ss')}
            </Text>
          </Paragraph>
          <Title level={4} ellipsis={true}>
            基于IP的地理信息
          </Title>
          <Divider/>
          <Paragraph ellipsis={true}>
            <Text ellipsis={true}>
              <Text strong>国家/地区: </Text>
              <Text copyable={true}>{locationInfo.country || 'Unknown'}</Text>
            </Text>
            <br/>
            <Text ellipsis={true}>
              <Text strong>国家/地区代码: </Text>
              <Text copyable={true}>{locationInfo.countryCode || 'Unknown'}</Text>
            </Text>
            <br/>
            <Text ellipsis={true}>
              <Text strong>州/省/自治区: </Text>
              <Text copyable={true}>{locationInfo.region || 'Unknown'}</Text>
            </Text>
            <br/>
            <Text ellipsis={true}>
              <Text strong>城市: </Text>
              <Text copyable={true}>{locationInfo.city || 'Unknown'}</Text>
            </Text>
            <br/>
            <Text ellipsis={true}>
              <Text strong>经度: </Text>
              <Text copyable={true}>{locationInfo.longitude || 'Unknown'}</Text>
            </Text>
            <br/>
            <Text ellipsis={true}>
              <Text strong>纬度: </Text>
              <Text copyable={true}>{locationInfo.latitude || 'Unknown'}</Text>
            </Text>
          </Paragraph>
          <Title level={4} ellipsis={true}>
            User-Agent
          </Title>
          <Divider/>
          <Paragraph ellipsis={true}>
            <Text code copyable={true} ellipsis={true}>{basicInfo.userAgent}</Text>
          </Paragraph>
          <Title level={4} ellipsis={true}>
            设备及软件信息
          </Title>
          <Divider/>
          <Paragraph ellipsis={true}>
            <Collapse defaultActiveKey={['browser', 'os', 'device', 'engine']}>
              <Panel header={'浏览器'} key={'browser'}>
                <Text ellipsis={true}>
                  <Text strong>名称: </Text>{browserInfo.name || 'Unknown'}
                </Text>
                <br/>
                <Text ellipsis={true}>
                  <Text strong>版本: </Text>{browserInfo.version || 'Unknown'}
                </Text>
              </Panel>
              <Panel header={'操作系统'} key={'os'}>
                <Text ellipsis={true}>
                  <Text strong>名称: </Text>{osInfo.name || 'Unknown'}
                </Text>
                <br/>
                <Text ellipsis={true}>
                  <Text strong>版本: </Text>{osInfo.version || 'Unknown'}
                </Text>
              </Panel>
              <Panel header={'渲染引擎'} key={'engine'}>
                <Text ellipsis={true}>
                  <Text strong>名称: </Text>{engineInfo.name || 'Unknown'}
                </Text>
                <br/>
                <Text ellipsis={true}>
                  <Text strong>版本: </Text>{engineInfo.version || 'Unknown'}
                </Text>
              </Panel>
              <Panel header={'设备'} key={'device'}>
                <Text ellipsis={true}>
                  <Text strong>类型: </Text>{deviceInfo.type || 'Unknown'}
                </Text>
                <br/>
                <Text ellipsis={true}>
                  <Text strong>模型: </Text>{deviceInfo.model || 'Unknown'}
                </Text>
                <br/>
                <Text ellipsis={true}>
                  <Text strong>生产商: </Text>{deviceInfo.manufacturer || 'Unknown'}
                </Text>
              </Panel>
            </Collapse>
          </Paragraph>
          <Title level={4} ellipsis={true}>
            链接信息
          </Title>
          <Divider/>
          <Paragraph>
            <Text ellipsis={true}>
              <Text strong>链接ID: </Text>
              <Text copyable={true}>{basicInfo.belongs}</Text>
            </Text>
            <br/>
            <Text ellipsis={true}>
              <Text strong>原链接: </Text>
              <Text copyable={true}>{linkInfo.originalUrl}</Text>
            </Text>
            <br/>
            <Text ellipsis={true}>
              <Text strong>转换链接: </Text>
              <Text copyable={true}>{linkInfo.shorternUrl}</Text>
            </Text>
            <br/>
            <Text ellipsis={true}>
              <Text strong>创建日期: </Text>{moment(linkInfo.createTime).format('YY-MM-DD HH:mm:ss')}
            </Text>
            <br/>
            <Text ellipsis={true}>
              <Text strong>二维码: </Text>
              <br/>
              <img src={linkInfo.qrCode} alt={'QR Code'} width={120} height={120}/>
            </Text>
          </Paragraph>
          <br/>
          <Button type={'ghost'}
                  icon={'double-left'}
                  onClick={() => history.goBack()}
          >
            返回
          </Button>
        </div>

  )
}

export default Detail
