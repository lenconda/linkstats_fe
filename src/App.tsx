import React, { Suspense } from 'react'
import './App.css'
import {
  Router,
  Route
} from 'react-router-dom'
import { createHashHistory } from 'history'
const Login = React.lazy(() => import('./pages/login/Login'))
const Root = React.lazy(() => import('./pages/Root'))

export const history = createHashHistory()

const App: React.FC = (props): JSX.Element =>
    <div className="App">
      <Suspense fallback={null}>
        <Router history={history}>
          <Route path={'/'} exact={true} component={Root}/>
          <Route path={'/login'} component={Login}/>
        </Router>
      </Suspense>
    </div>

export default App
