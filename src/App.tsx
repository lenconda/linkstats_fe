import React, { Suspense } from 'react';
import {
  Router,
  Route,
} from 'react-router-dom';
import { createHashHistory } from 'history';
import Loading from './components/Loading';
import './App.less';

const Root = React.lazy(() => import('./pages'));
const Signin = React.lazy(() => import('./pages/signin'));
const Signup = React.lazy(() => import('./pages/signup'));
const Reset = React.lazy(() => import('./pages/reset'));
const Dashboard = React.lazy(() => import('./pages/dashboard'));

export const history = createHashHistory();

const App: React.FC = (props): JSX.Element => (
  <div className="App">
    <Suspense fallback={<Loading />}>
      <Router history={history}>
        <Route path="/" exact={true} component={Root} />
        <Route path="/signin" component={Signin} />
        <Route path="/signup" component={Signup} />
        <Route path="/reset" component={Reset} />
        <Route path="/dashboard" component={Dashboard} />
      </Router>
    </Suspense>
  </div>
);

export default App;
