import React, { Suspense } from 'react'
import './App.css'
import {
  Router,
  Route
} from 'react-router-dom'
import { createHashHistory } from 'history'

const Login = React.lazy(() => import('./pages/login/Login'))
const Root = React.lazy(() => import('./pages/Root'))
const Dashboard = React.lazy(() => import('./pages/dashboard/Dashboard'))

export const history = createHashHistory()

const App: React.FC = (props): JSX.Element =>
    <div className="App">
      <Suspense fallback={null}>
        <Router history={history}>
          <Route path={'/'} exact={true} component={Root}/>
          <Route path={'/login'} component={Login}/>
          <Route path={'/dashboard'} component={Dashboard}/>
        </Router>
      </Suspense>
    </div>

export default App
