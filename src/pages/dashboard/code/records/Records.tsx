import React, { useState, useEffect } from 'react'
import moment from 'moment'
import http from '../../../../util/http'
import qs from 'query-string'
import {
  Table,
  Button,
  Icon
} from 'antd'
import { Link, RouteComponentProps } from 'react-router-dom'
import { history } from '../../../../App'
import download from 'js-file-download'
import Loading from '../../../../components/loading/Loading'
import Content from '../../../../components/content/Content'
import './Record.css'

interface RecordItem {
  uuid: string
  belongs: string
  href: string
  ip: string
  country: string
  device: string
  createTime: number
}

interface Props extends RouteComponentProps {}

const Records = (props: Props): JSX.Element => {
  const [data, setData] = useState<RecordItem[]>([])
  const [count, setCount] = useState<number>(0)
  const [loading, setLoading] = useState<boolean>(false)
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [downloadLoading, setDownloadLoading] = useState<boolean>(false)

  const page = parseInt(JSON.parse(JSON.stringify(qs.parse(props.location.search))).page) || 1
  const size = parseInt(JSON.parse(JSON.stringify(qs.parse(props.location.search))).size) || 10
  const fetch = () => {
    setLoading(true)
    http
    .get(`/api/code/record?page=${page}&size=${size}`)
    .then(res => {
      if (res) {
        setLoading(false)
        setData(res.data.data.items)
        setCount(res.data.data.count)
      }
    })
  }
  useEffect(() => {
    setCurrentPage(page)
    fetch()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, size])

  const handlePageChange = (page: any, pageSize: any) => {
    console.log(page)
    history.push(`/dashboard/code/records?page=${page}&size=${size}`)
  }

  const handleDownload = () => {
    setDownloadLoading(true)
    http
    .get(`/api/code/record/export`)
    .then(res => {
      setDownloadLoading(false)
      if (res) {
        setDownloadLoading(false)
        download(res.data.data.text, `${Date.parse(new Date().toString())}.csv`)
      }
    })
  }

  const columns = [
    {
      title: '记录ID',
      dataIndex: 'uuid',
      key: 'uuid',
      sorter: (alpha: any, beta: any) => alpha.uuid.localeCompare(beta.uuid)
    },
    {
      title: '来源',
      dataIndex: 'href',
      key: 'href',
      sorter: (alpha: any, beta: any) => alpha.href.localeCompare(beta.href)
    },
    {
      title: 'IP地址',
      dataIndex: 'ip',
      key: 'ip',
      sorter: (alpha: any, beta: any) => alpha.ip.localeCompare(beta.ip),
      render: (text: any) => text ? text : 'unknown'
    },
    {
      title: '国家/地区',
      dataIndex: 'country',
      key: 'country',
      sorter: (alpha: any, beta: any) => alpha.country.localeCompare(beta.country),
      render: (text: any) => text ? text : 'unknown'
    },
    {
      title: '设备类型',
      dataIndex: 'device',
      key: 'device',
      sorter: (alpha: any, beta: any) => alpha.device.localeCompare(beta.device),
      render: (text: any) => text ? text : 'unknown'
    },
    {
      title: '访问时间',
      dataIndex: 'createTime',
      key: 'createTime',
      sorter: (alpha: any, beta: any) => {
        if (alpha.createTime === beta.createTime)
          return 0
        return alpha.createTime > beta.createTime ? -1 : 1
      },
      render: (text: any, record: any) => moment(record.createTime).format('YY-MM-DD HH:mm:ss')
    },
    {
      title: '操作',
      dataIndex: '',
      render: (text: any, record: any) =>
          <div>
            <Link to={`/dashboard/record/detail?uuid=${record.uuid}&src=code`}>
              <Icon type={'info-circle'}/>&nbsp;详情
            </Link>
          </div>
    }
  ]

  return (
    <Content title={'探测代码的访问记录'}
             controls={
               <div>
                <Button type={'primary'} loading={downloadLoading} icon={'download'} onClick={handleDownload}>导出记录</Button>
               </div>
             }
    >
      <main className="table-content">
        <Table columns={columns}
               loading={{
                 tip: '加载中...',
                 spinning: loading,
                 indicator: <Loading/>
               }}
               dataSource={data}
               pagination={{
                 current: currentPage,
                 total: count,
                 pageSize: 10
               }}
               style={{marginTop: 20}}
               rowKey={record => record.uuid}
               onChange={(page, size) => handlePageChange(page.current, size)}
        />
      </main>
    </Content>
  )
}

export default Records
