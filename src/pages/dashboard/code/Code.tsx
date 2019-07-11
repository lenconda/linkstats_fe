import React, { Suspense } from 'react'
import {
  Route, 
  Redirect,
  Switch
} from 'react-router-dom'

const Info = React.lazy(() => import('./info/Info'))
const Records = React.lazy(() => import('./records/Records'))

const Code = (props: any): JSX.Element => {
  return (
    <div>
      <Suspense fallback={null}>
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
