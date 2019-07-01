import React, { useState, useEffect } from 'react'
import http from '../../../util/http'
import {
  Button,
  Icon,
  Table,
  Divider,
  Typography
} from 'antd'
import moment from 'moment'
import qs from 'query-string'
import { history } from '../../../App'
import './Links.css'

const Links = (props: any): JSX.Element => {
  const [data, setData] = useState([])
  const [count, setCount] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)
  const [selection, setSelection] = useState<number[]>([])

  const page = parseInt(JSON.parse(JSON.stringify(qs.parse(props.location.search))).page) || 1
  const fetch = () => {
    http.get(`/api/links?page=${page}`)
        .then(res => {
          if (res) {
            setData(res.data.data.items)
            setCount(res.data.data.count)
          }
        })
  }

  useEffect(() => {
    setCurrentPage(page)
    fetch()
  }, [props.location])

  const handlePageChange = (page: any, pageSize: any) => {
    history.push(`/dashboard/links?page=${page}`)
  }

  const columns = [
    {
      title: '链接ID',
      dataIndex: 'uuid',
      key: 'uuid',
      sorter: (alpha: any, beta: any) => alpha.uuid.localeCompare(beta.uuid),
      sortOrder: 'descend' as 'descend'
    },
    {
      title: '原链接',
      dataIndex: 'originalUrl',
      key: 'originalUrl',
      sorter: (alpha: any, beta: any) => alpha.originalUrl.localeCompare(beta.originalUrl),
      sortOrder: 'descend' as 'descend',
      render: (text: string) => <a href={text} target={'_blank'}>{text}</a>
    },
    {
      title: '转换链接',
      dataIndex: 'shorternUrl',
      key: 'shorternUrl',
      sorter: (alpha: any, beta: any) => alpha.shorternUrl.localeCompare(beta.shorternUrl),
      sortOrder: 'descend' as 'descend',
      render: (text: string) => <a href={text} target={'_blank'}>{text}</a>
    },
    {
      title: '创建日期',
      dataIndex: 'createTime',
      key: 'createTime',
      sorter: (alpha: any, beta: any) => {
        if (alpha.createTime === beta.createTime)
          return 0
        return alpha.createTime > beta.createTime ? -1 : 1
      },
      sortOrder: 'descend' as 'descend',
      render: (text: string) => moment(text).format('YY-MM-DD HH:mm:ss')
    },
    {
      title: '操作',
      dataIndex: '',
      render: () =>
          <div>
            <a><Icon type="qrcode" />&nbsp;二维码</a>
            <Divider type={'vertical'}/>
            <a>
              <Typography.Text type={'danger'}><Icon type="delete" />&nbsp;删除</Typography.Text>
            </a>
          </div>
    }
  ]

  return (
      <main className={'table-content'}>
        <Button type={'primary'}>
          <Icon type="file-add" />&nbsp;创建链接
        </Button>&nbsp;&nbsp;
        {
          selection.length > 0 ?
              <Button type={'danger'}>
                <Icon type="delete" />&nbsp;删除{selection.length}项
              </Button> : null
        }
        <Table columns={columns}
               dataSource={data}
               pagination={{
                 total: count,
                 pageSize: 10,
                 current: currentPage
               }}
               onChange={(page, size) => handlePageChange(page.current, size)}
               style={{marginTop: 20}}
               rowSelection={{
                 onChange: (rows: any[]) => setSelection(rows)
               }}
        />
      </main>
  )
}

export default Links
