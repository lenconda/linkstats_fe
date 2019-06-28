import React from 'react'
import './App.css'
import {
  Switch,
  Router,
  Route,
  Redirect
} from 'react-router-dom'
import { createHashHistory } from 'history'

export const history = createHashHistory()

const App: React.FC = (props): JSX.Element =>
    <div className="App">
      <Router history={history}>
        <Switch>
          <Route />
          <Redirect to={'/dashboard'}/>
        </Switch>
      </Router>
    </div>

export default App
