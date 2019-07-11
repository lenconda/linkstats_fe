import React, { Suspense } from 'react'
import {
  Route, 
  Redirect,
  Switch
} from 'react-router-dom'
import {
  Spin,
  Icon
} from 'antd'

const Info = React.lazy(() => import('./info/Info'))
const Records = React.lazy(() => import('./records/Records'))

const Code = (props: any): JSX.Element => {
  return (
    <div>
      <Suspense fallback={<Spin indicator={<Icon type={'loading'} spin={true}/>}/>}>
        <Switch>
          <Route path={'/dashboard/code/info'} component={Info}/>
          <Route path={'/dashboard/code/records'} component={Records}/>
          <Redirect to={'/dashboard/code/info'}/>
        </Switch>
      </Suspense>
    </div>
  )
}

export default Code
