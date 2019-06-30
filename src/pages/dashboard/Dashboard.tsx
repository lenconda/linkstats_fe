import React from 'react'
import http from '../../util/http'

const Dashboard: React.FC = (): JSX.Element => {
  http.get('/api/record/export')
      .then(res => console.log(res.data))

  return <div></div>
}

export default Dashboard
