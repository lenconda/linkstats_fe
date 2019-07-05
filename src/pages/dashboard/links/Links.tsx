import React, { useState, useEffect } from 'react'
import http from '../../../util/http'
import {
  Button,
  Icon,
  Table,
  Divider,
  Typography,
  Modal,
  message,
  Popconfirm,
  Input
} from 'antd'
import moment from 'moment'
import qs from 'query-string'
import { history } from '../../../App'
import './Links.css'
import Loading from '../../../components/loading/Loading'

interface Item {
  uuid: string
  createTime: number
  originalUrl: string
  shorternUrl: string
  qrCode: string
}

const Links = (props: any): JSX.Element => {
  const [data, setData] = useState<Item[]>([])
  const [count, setCount] = useState<number>(0)
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [selection, setSelection] = useState<string[]>([])
  const [newLink, setNewLink] = useState<string>('')
  const [visible, setVisible] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)
  const [createLoading, setCreateLoading] = useState<boolean>(false)
  const [deleteLoading, setDeleteLoading] = useState<boolean>(false)

  // eslint-disable-next-line no-useless-escape
  const urlChecker = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/g
  
  const page = parseInt(JSON.parse(JSON.stringify(qs.parse(props.location.search))).page) || 1
  const fetch = () => {
    setLoading(true)
    http
    .get(`/api/links?page=${page}`)
    .then(res => {
      if (res) {
        setData(res.data.data.items)
        setCount(res.data.data.count)
        setLoading(false)
      }
    })
  }

  useEffect(() => {
    setCurrentPage(page)
    fetch()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page])

  const handlePageChange = (page: any, pageSize: any) => {
    history.push(`/dashboard/links?page=${page}`)
  }

  const viewQRCode = (imgSrc: string) => {
    Modal.info({
      content: (
          <img src={imgSrc} width={'100%'} alt={'QR Code'}/>
      ),
      maskClosable: true,
      okText: '确定',
      icon: null,
      width: 320
    })
  }

  const handleDeleteLink = () => {
    Modal.confirm({
      title: `确定要删除这${selection.length}个链接吗？`,
      okText: '确定',
      cancelText: '取消',
      okButtonProps: {
        loading: deleteLoading
      },
      onOk: () => {
        deleteLink(selection)
      }
    })
  }

  const deleteLink = (links: string[]) => {
    setDeleteLoading(true)
    http
    .delete('/api/links', {
      data: { links }
    })
    .then(res => {
      setDeleteLoading(false)
      if (res) {
        selection.splice(0, selection.length)
        setSelection(selection)
        fetch()
      }
    })
  }

  const handleCreateLink = (url: string) => {
    setCreateLoading(true)
    http
    .post('/api/links', { url })
    .then(res => {
      setCreateLoading(false)
      if (res) {
        setNewLink('')
        fetch()
        setVisible(false)
      }
    })
  }

  const columns = [
    {
      title: '链接ID',
      dataIndex: 'uuid',
      key: 'uuid',
      sorter: (alpha: any, beta: any) => alpha.uuid.localeCompare(beta.uuid)
    },
    {
      title: '原链接',
      dataIndex: 'originalUrl',
      key: 'originalUrl',
      sorter: (alpha: any, beta: any) => alpha.originalUrl.localeCompare(beta.originalUrl),
      render: (text: string) => <a href={text} target={'_blank'}>{text}</a>
    },
    {
      title: '转换链接',
      dataIndex: 'shorternUrl',
      key: 'shorternUrl',
      sorter: (alpha: any, beta: any) => alpha.shorternUrl.localeCompare(beta.shorternUrl),
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
      render: (text: string) => moment(text).format('YY-MM-DD HH:mm:ss')
    },
    {
      title: '操作',
      dataIndex: '',
      render: (text: any, record: any) =>
          <div>
            <Button style={{padding: 0}}
                    type={'link'} 
                    onClick={() => viewQRCode(record.qrCode)}
            >
              <Typography.Text><Icon type="qrcode"/>&nbsp;二维码</Typography.Text>
            </Button>
            <Divider type={'vertical'}/>
            <Popconfirm title={'你确定要删除这个链接吗？'}
                        okText={'确定'}
                        cancelText={'取消'}
                        onConfirm={() => deleteLink([record.uuid])}
            >
              <Button type={'link'} style={{padding: 0}}>
                <Typography.Text type={'danger'}><Icon type="delete"/>&nbsp;删除</Typography.Text>
              </Button>
            </Popconfirm>
          </div>
    }
  ]

  return (
      <main className={'table-content'}>
        <Button type={'primary'} onClick={() => setVisible(true)}>
          <Icon type="file-add" />&nbsp;创建链接
        </Button>&nbsp;&nbsp;
        {
          selection.length !== 0 ?
              <Button type={'danger'} onClick={handleDeleteLink}>
                <Icon type="delete" />&nbsp;删除{selection.length}项
              </Button> : null
        }
        <Table columns={columns}
               dataSource={data}
               loading={{
                 tip: '加载中...',
                 spinning: loading,
                 indicator: <Loading/>
               }}
               pagination={{
                 total: count,
                 pageSize: 10,
                 current: currentPage
               }}
               rowKey={record => record.uuid}
               onChange={(page, size) => handlePageChange(page.current, size)}
               style={{marginTop: 20}}
               rowSelection={{
                 onChange: (rows: any[]) => setSelection(rows)
               }}
        />
        <Modal title={'创建一个新的链接'}
               visible={visible}
               confirmLoading={createLoading}
               onOk={() => {
                 if (!newLink) {
                   message.error('请将URL填写完整')
                   return
                 }
                 if (!urlChecker.test(newLink)) {
                   message.error('请输入合法的URL')
                   return
                 }
                 handleCreateLink(newLink)
               }}
               onCancel={() => setVisible(false)}
        >
          <Input type={'text'}
                 value={newLink}
                 placeholder={'合法的URL，如 https://www.google.com'}
                 onChange={e => setNewLink(e.target.value)}
          />
        </Modal>
      </main>
  )
}

export default Links
