import React, { useState, useEffect } from 'react'
import qs from 'query-string'
import {
  Typography,
  Divider,
  Collapse,
  Button
} from 'antd'
import http from '../../../../util/http'
import moment from 'moment'
import { history } from '../../../../App'
import Content from '../../../../components/content/Content'
import './Detail.css'
import { 
  Link,
  RouteComponentProps 
} from 'react-router-dom'

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

interface ProxyInfo {
  remoteAddr: string
  httpVia: string
  httpXForwardedFor: string
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

interface Props extends RouteComponentProps {}

const Detail = (props: Props): JSX.Element => {
  const [loading, setLoading] = useState<boolean>(false)
  const [linkInfo, setLinkInfo] = useState<Partial<LinkInfo>>({})
  const [basicInfo, setBasicInfo] = useState<Partial<Detail>>({})
  const [locationInfo, setLocationInfo] = useState<Partial<IPInfo>>({})
  const [deviceInfo, setDeviceInfo] = useState<Partial<HardwareInfo>>({})
  const [osInfo, setOsInfo] = useState<Partial<SoftwareInfo>>({})
  const [proxyInfo, setProxyInfo] = useState<Partial<ProxyInfo>>({})
  const [browserInfo, setBrowserInfo] = useState<Partial<SoftwareInfo>>({})
  const [engineInfo, setEngineInfo] = useState<Partial<SoftwareInfo>>({})

  const uuid = JSON.parse(JSON.stringify(qs.parse(props.location.search))).uuid || undefined
  const fetch = () => {
    setLoading(true)
    http
    .get(`/api/record/detail/${uuid}`)
    .then(res => {
      setLoading(false)
      if (res) {
        setBasicInfo(res.data.data)
        setLocationInfo(res.data.data.ipLocation)
        setDeviceInfo(res.data.data.device)
        setOsInfo(res.data.data.os)
        setProxyInfo(res.data.data.proxy)
        setBrowserInfo(res.data.data.browser)
        setEngineInfo(res.data.data.engine)
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.location.search])

  return (
    <Content loading={loading}
             title={'访问记录的详细信息'}
             controls={
               <div>
                 <Button type={'ghost'}
                         icon={'double-left'}
                         onClick={() => history.goBack()}
                 >
                   返回
                 </Button>
               </div>
             }
    >
      <div className={'information-container'}>
        <Title level={4}>
          基本信息
        </Title>
        <Divider/>
        <Paragraph>
          <Text>
            <Text strong>记录ID: </Text>
            <Text copyable={true}>{basicInfo.uuid}</Text>
          </Text>
          <br/>
          <Text>
            <Text strong>IP地址: </Text>
            <Text copyable={true}>{basicInfo.ip}</Text>
          </Text>
          <br/>
          <Text>
            <Text strong>访问时间: </Text>{moment(basicInfo.createTime).format('YY-MM-DD HH:mm:ss')}
          </Text>
        </Paragraph>
        <Title level={4}>
          基于IP的地理信息
        </Title>
        <Divider/>
        <Paragraph>
          <Text>
            <Text strong>国家/地区: </Text>
            <Text copyable={true}>{locationInfo.country || 'Unknown'}</Text>
          </Text>
          <br/>
          <Text>
            <Text strong>国家/地区代码: </Text>
            <Text copyable={true}>{locationInfo.countryCode || 'Unknown'}</Text>
          </Text>
          <br/>
          <Text>
            <Text strong>州/省/自治区: </Text>
            <Text copyable={true}>{locationInfo.region || 'Unknown'}</Text>
          </Text>
          <br/>
          <Text>
            <Text strong>城市: </Text>
            <Text copyable={true}>{locationInfo.city || 'Unknown'}</Text>
          </Text>
          <br/>
          <Text>
            <Text strong>经度: </Text>
            <Text copyable={true}>{locationInfo.longitude || 'Unknown'}</Text>
          </Text>
          <br/>
          <Text>
            <Text strong>纬度: </Text>
            <Text copyable={true}>{locationInfo.latitude || 'Unknown'}</Text>
          </Text>
        </Paragraph>
        <Title level={4}>
          代理信息
        </Title>
        <Divider/>
        <Paragraph>
          <Text>
            <Text strong>REMOTE_ADDR: </Text>
            <Text copyable={true}>{proxyInfo.remoteAddr || 'null'}</Text>
          </Text>
          <br/>
          <Text>
            <Text strong>HTTP_VIA: </Text>
            <Text copyable={true}>{proxyInfo.httpVia || 'null'}</Text>
          </Text>
          <br/>
          <Text>
            <Text strong>HTTP_X_FORWARDED_FOR: </Text>
            <Text copyable={true}>{proxyInfo.httpXForwardedFor || 'null'}</Text>
          </Text>
        </Paragraph>
        <Title level={4}>
          User-Agent
        </Title>
        <Divider/>
        <Paragraph>
          <Text code copyable={true}>{basicInfo.userAgent}</Text>
        </Paragraph>
        <Title level={4}>
          设备及软件信息
        </Title>
        <Divider/>
        <Paragraph>
          <Collapse defaultActiveKey={['browser', 'os', 'device', 'engine']}>
            <Panel header={'浏览器'} key={'browser'}>
              <Text>
                <Text strong>名称: </Text>{browserInfo.name || 'Unknown'}
              </Text>
              <br/>
              <Text>
                <Text strong>版本: </Text>{browserInfo.version || 'Unknown'}
              </Text>
            </Panel>
            <Panel header={'操作系统'} key={'os'}>
              <Text>
                <Text strong>名称: </Text>{osInfo.name || 'Unknown'}
              </Text>
              <br/>
              <Text>
                <Text strong>版本: </Text>{osInfo.version || 'Unknown'}
              </Text>
            </Panel>
            <Panel header={'渲染引擎'} key={'engine'}>
              <Text>
                <Text strong>名称: </Text>{engineInfo.name || 'Unknown'}
              </Text>
              <br/>
              <Text>
                <Text strong>版本: </Text>{engineInfo.version || 'Unknown'}
              </Text>
            </Panel>
            <Panel header={'设备'} key={'device'}>
              <Text>
                <Text strong>类型: </Text>{deviceInfo.type || 'Unknown'}
              </Text>
              <br/>
              <Text>
                <Text strong>模型: </Text>{deviceInfo.model || 'Unknown'}
              </Text>
              <br/>
              <Text>
                <Text strong>生产商: </Text>{deviceInfo.manufacturer || 'Unknown'}
              </Text>
            </Panel>
          </Collapse>
        </Paragraph>
        <Title level={4}>
          链接信息
        </Title>
        <Divider/>
        <Paragraph>
          <Text>
            <Text strong>探测链接ID: </Text>
            <Text copyable={true}>
              <Link to={`/dashboard/link/detail?uuid=${basicInfo.belongs}`}>{basicInfo.belongs}</Link>
            </Text>
          </Text>
          <br/>
          <Text>
            <Text strong>原链接: </Text>
            <Text copyable={true}>{linkInfo.originalUrl}</Text>
          </Text>
          <br/>
          <Text>
            <Text strong>探测链接: </Text>
            <Text copyable={true}>{linkInfo.shorternUrl}</Text>
          </Text>
          <br/>
          <Text>
            <Text strong>创建日期: </Text>{moment(linkInfo.createTime).format('YY-MM-DD HH:mm:ss')}
          </Text>
          <br/>
          {
            linkInfo.qrCode
            ? <Text>
                <Text strong>二维码: </Text>
                <br/>
                <img src={linkInfo.qrCode} alt={'QR Code'} width={120} height={120}/>
              </Text>
            : null
          }
        </Paragraph>
      </div>
      <br/>
      <Button type={'ghost'}
              icon={'double-left'}
              onClick={() => history.goBack()}
      >
        返回
      </Button>
    </Content>

  )
}

export default Detail
