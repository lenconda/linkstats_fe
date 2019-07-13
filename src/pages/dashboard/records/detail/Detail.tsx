import React, { useState, useEffect } from 'react'
import qs from 'query-string'
import {
  Typography,
  Row,
  Col
} from 'antd'
import http from '../../../../util/http'
import moment from 'moment'
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
  href?: string
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
  Text
} = Typography

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
  const src = JSON.parse(JSON.stringify(qs.parse(props.location.search))).src || 'link'
  const fetch = () => {
    setLoading(true)
    http
    .get(`/api/${src === 'code' ? 'code/' : ''}record/detail/${uuid}`)
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
        if (src !== 'code')
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
    <Row>
      <Col xxl={12} xl={12} md={12} sm={24} xs={24}>
        <Content title={'基本信息'} className={'detail-card'} loading={loading}>
          <Row>
            <Col span={12}>
              <Text type={'secondary'}>记录ID</Text>
            </Col>
            <Col span={12} className={'info-item'}>
              <Text copyable code>{basicInfo.uuid}</Text>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <Text type={'secondary'}>IP地址</Text>
            </Col>
            <Col span={12} className={'info-item'}>
              <Text copyable>{basicInfo.ip}</Text>
            </Col>
          </Row>
          {
            src === 'code'
            ? <Row>
                <Col span={12}>
                  <Text type={'secondary'}>来源</Text>
                </Col>
                <Col span={12} className={'info-item'}>
                  <Text copyable>{basicInfo.href || 'Unknown'}</Text>
                </Col>
              </Row>
            : null
          }
          <Row>
            <Col span={12}>
              <Text type={'secondary'}>访问时间</Text>
            </Col>
            <Col span={12} className={'info-item'}>
              <Text>{moment(basicInfo.createTime).format('YY-MM-DD HH:mm:ss')}</Text>
            </Col>
          </Row>
        </Content>
        <Content title={'基于IP的地理信息'} className={'detail-card'} loading={loading}>
          <Row>
            <Col span={12}>
              <Text type={'secondary'}>国家/地区</Text>
            </Col>
            <Col span={12} className={'info-item'}>
              <Text>{locationInfo.country || 'Unknown'}</Text>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <Text type={'secondary'}>国家/地区代码</Text>
            </Col>
            <Col span={12} className={'info-item'}>
              <Text>{locationInfo.countryCode || 'Unknown'}</Text>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <Text type={'secondary'}>州/省/自治区</Text>
            </Col>
            <Col span={12} className={'info-item'}>
              <Text>{locationInfo.region || 'Unknown'}</Text>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <Text type={'secondary'}>城市</Text>
            </Col>
            <Col span={12} className={'info-item'}>
              <Text>{locationInfo.city || 'Unknown'}</Text>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <Text type={'secondary'}>经度</Text>
            </Col>
            <Col span={12} className={'info-item'}>
              <Text>{locationInfo.longitude || 'Unknown'}</Text>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <Text type={'secondary'}>纬度</Text>
            </Col>
            <Col span={12} className={'info-item'}>
              <Text>{locationInfo.latitude || 'Unknown'}</Text>
            </Col>
          </Row>
        </Content>
        <Content title={'代理信息'} className={'detail-card'} loading={loading}>
          <Row>
            <Col span={12}>
              <Text type={'secondary'}>REMOTE_ADDR</Text>
            </Col>
            <Col span={12} className={'info-item'}>
              <Text copyable>{proxyInfo.remoteAddr || 'Unknown'}</Text>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <Text type={'secondary'}>HTTP_X_FORWARDED_FOR</Text>
            </Col>
            <Col span={12} className={'info-item'}>
              <Text copyable>{proxyInfo.httpXForwardedFor || 'Unknown'}</Text>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <Text type={'secondary'}>HTTP_VIA</Text>
            </Col>
            <Col span={12} className={'info-item'}>
              <Text copyable>{proxyInfo.httpVia || 'Unknown'}</Text>
            </Col>
          </Row>
        </Content>
        <Content title={'User-Agent'} className={'detail-card'} loading={loading}>
          <code>{basicInfo.userAgent}</code>
        </Content>
        {
          src === 'link'
          ? <Content title={'链接信息'} className={'detail-card'} loading={loading}>
              <Row>
                <Col span={12}>
                  <Text type={'secondary'}>探测链接ID</Text>
                </Col>
                <Col span={12} className={'info-item'}>
                  <Text copyable={true} code>
                    <Link to={`/dashboard/link/detail?uuid=${basicInfo.belongs}`}>{basicInfo.belongs}</Link>
                  </Text>
                </Col>
              </Row>
              <Row>
                <Col span={12}>
                  <Text type={'secondary'}>原链接</Text>
                </Col>
                <Col span={12} className={'info-item'}>
                  <Text copyable code>{linkInfo.originalUrl}</Text>
                </Col>
              </Row>
              <Row>
                <Col span={12}>
                  <Text type={'secondary'}>探测链接</Text>
                </Col>
                <Col span={12} className={'info-item'}>
                  <Text copyable>{linkInfo.shorternUrl}</Text>
                </Col>
              </Row>
              <Row>
                <Col span={12}>
                  <Text type={'secondary'}>创建日期</Text>
                </Col>
                <Col span={12} className={'info-item'}>
                  <Text copyable>{moment(linkInfo.createTime).format('YY-MM-DD HH:mm:ss')}</Text>
                </Col>
              </Row>
              <Row>
                <Col span={12}>
                  <Text type={'secondary'}>探测二维码</Text>
                </Col>
                <Col span={12} className={'info-item'}>
                  <Text>
                    <img src={linkInfo.qrCode} alt={'QR Code'} width={120} height={120}/>
                  </Text>
                </Col>
              </Row>
            </Content>
          : null
        }
      </Col>
      <Col xxl={12} xl={12} md={12} sm={24} xs={24}>
        <Content title={'浏览器信息'} className={'detail-card'} loading={loading}>
          <Row>
            <Col span={12}>
              <Text type={'secondary'}>名称</Text>
            </Col>
            <Col span={12} className={'info-item'}>
              <Text>{browserInfo.name || 'Unknown'}</Text>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <Text type={'secondary'}>版本</Text>
            </Col>
            <Col span={12} className={'info-item'}>
              <Text>{browserInfo.version || 'Unknown'}</Text>
            </Col>
          </Row>
        </Content>
        <Content title={'操作系统信息'} className={'detail-card'} loading={loading}>
          <Row>
            <Col span={12}>
              <Text type={'secondary'}>名称</Text>
            </Col>
            <Col span={12} className={'info-item'}>
              <Text>{osInfo.name || 'Unknown'}</Text>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <Text type={'secondary'}>版本</Text>
            </Col>
            <Col span={12} className={'info-item'}>
              <Text>{osInfo.version || 'Unknown'}</Text>
            </Col>
          </Row>
        </Content>
        <Content title={'渲染引擎信息'} className={'detail-card'} loading={loading}>
          <Row>
            <Col span={12}>
              <Text type={'secondary'}>名称</Text>
            </Col>
            <Col span={12} className={'info-item'}>
              <Text>{engineInfo.name || 'Unknown'}</Text>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <Text type={'secondary'}>版本</Text>
            </Col>
            <Col span={12} className={'info-item'}>
              <Text>{engineInfo.version || 'Unknown'}</Text>
            </Col>
          </Row>
        </Content>
        <Content title={'硬件设备信息'} className={'detail-card'} loading={loading}>
          <Row>
            <Col span={12}>
              <Text type={'secondary'}>类型</Text>
            </Col>
            <Col span={12} className={'info-item'}>
              <Text>{deviceInfo.type || 'Unknown'}</Text>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <Text type={'secondary'}>模型</Text>
            </Col>
            <Col span={12} className={'info-item'}>
              <Text>{deviceInfo.model || 'Unknown'}</Text>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <Text type={'secondary'}>制造商</Text>
            </Col>
            <Col span={12} className={'info-item'}>
              <Text>{deviceInfo.manufacturer || 'Unknown'}</Text>
            </Col>
          </Row>
        </Content>
      </Col>
    </Row>
  )
}

export default Detail
