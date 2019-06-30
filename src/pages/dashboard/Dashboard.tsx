import React from 'react'
import http from '../../util/http'

const Dashboard: React.FC = (): JSX.Element => {
  http.get('/api/profile/info')

  return <div></div>
}

export default Dashboard
