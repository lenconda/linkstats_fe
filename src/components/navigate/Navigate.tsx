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
    '/dashboard/records': '访问记录'
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
