import React, { useState, useEffect } from 'react'
import moment from 'moment'
import http from '../../../util/http'
import qs from 'query-string'
import {
  Table,
  Button,
  Modal,
  Divider,
  Typography,
  Icon,
  Popconfirm
} from 'antd'
import { Link } from 'react-router-dom'
import { history } from '../../../App'
import './Records.css'
import download from 'js-file-download'

interface RecordItem {
  uuid: string
  belongs: string
  ip: string
  country: string
  device: string
  createTime: number
}

const Records = (props: any): JSX.Element => {
  const [data, setData] = useState<RecordItem[]>([])
  const [count, setCount] = useState<number>(0)
  const [loading, setLoading] = useState<boolean>(false)
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [selection, setSelection] = useState<string[]>([])

  const page = parseInt(JSON.parse(JSON.stringify(qs.parse(props.location.search))).page) || 1
  const uuid = JSON.parse(JSON.stringify(qs.parse(props.location.search))).uuid || ''
  const fetch = () => {
    setLoading(true)
    http
    .get(`/api/record?page=${page}${uuid ? `&uuid=${uuid}` : ''}`)
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
  }, [props.location.search])

  const handlePageChange = (page: any, pageSize: any) => {
    history.push(`/dashboard/records?page=${page}${uuid ? `&uuid=${uuid}` : ''}`)
  }

  const handleDownload = () => {
    http
    .get(`/api/record/export${uuid ? `?link=${uuid}` : ''}`)
    .then(res => {
      if (res)
        download(res.data.data, `${Date.parse(new Date().toString())}.csv`)
    })
  }

  const deleteRecords = (records: string[]) => {
    http
    .delete('/api/record', {
      data: {
        records
      }
    })
    .then(res => {
      if (res) {
        setSelection([])
        fetch()
      }
    })
  }

  const handleDeleteRecord = () => {
    Modal.confirm({
      title: `确定要删除这${selection.length}条记录吗？`,
      okText: '确定',
      cancelText: '取消',
      onOk: () => deleteRecords(selection)
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
      title: '对应链接',
      dataIndex: 'belongs',
      key: 'belongs',
      sorter: (alpha: any, beta: any) => alpha.belongs.localeCompare(beta.belongs),
      render: ((text: any, record: any) => <Link to={`/dashboard/records?uuid=${record.belongs}`}>{record.belongs}</Link>)
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
            <Link to={`/dashboard/record/detail?uuid=${record.uuid}`}>
              <Icon type={'info-circle'}/>&nbsp;详情
            </Link>
            <Divider type={'vertical'}/>
            <Popconfirm title={'你确定要删除这个链接吗？'}
                        okText={'确定'}
                        cancelText={'取消'}
                        onConfirm={() => deleteRecords([record.uuid])}
            >
              <a>
                <Typography.Text type={'danger'}><Icon type="delete"/>&nbsp;删除</Typography.Text>
              </a>
            </Popconfirm>
          </div>
    }
  ]

  return (
      <main className="table-content">
        <Button type={'primary'} icon={'download'} onClick={handleDownload}>导出记录</Button>&nbsp;&nbsp;
        {
          selection.length === 0 ? null :
              <Button type={'danger'}
                      icon={'delete'}
                      onClick={() => handleDeleteRecord()}
              >
                删除{selection.length}项
              </Button>
        }
        <Table columns={columns}
               loading={loading}
               dataSource={data}
               pagination={{
                 current: currentPage,
                 total: count,
                 pageSize: 10
               }}
               style={{marginTop: 20}}
               rowKey={record => record.uuid}
               onChange={(page, size) => handlePageChange(page.current, size)}
               rowSelection={{
                 onChange: (rows: any[]) => setSelection(rows)
               }}
        />
      </main>
  )
}

export default Records
