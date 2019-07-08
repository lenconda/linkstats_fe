import React from 'react'
import { Breadcrumb } from 'antd'
import { Link } from 'react-router-dom'

interface Props {
  pathname: string
}

const Navigate = (props: Props): JSX.Element => {
  const pathSnippets = props.pathname.split('/').filter(i => i)

  const breadcrumbNameMap: any = {
    '/dashboard': '控制台',
    '/dashboard/links': '链接列表',
    '/dashboard/records': '访问记录',
    '/dashboard/record': '访问记录',
    '/dashboard/record/detail': '详细信息',
    '/dashboard/profile': '账户管理',
    '/dashboard/profile/detail': '我的资料',
    '/dashboard/profile/changepw': '修改密码',
    '/dashboard/create': '创建探测链接',
    '/dashboard/link': '链接列表',
    '/dashboard/link/detail': '探测链接的详细信息'
  }

  const breadcrumbItems = pathSnippets.map((_, index) => {
    const url = `/${pathSnippets.slice(0, index + 1).join('/')}`
    return (
        <Breadcrumb.Item key={url}>
          <Link to={url}>{breadcrumbNameMap[url]}</Link>
        </Breadcrumb.Item>
    )
  })

  return <Breadcrumb>{breadcrumbItems}</Breadcrumb>
}

export default Navigate
