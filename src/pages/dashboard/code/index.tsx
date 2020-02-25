import React, { Suspense } from 'react';
import {
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';
import Loading from '../../../components/Loading';

const Info = React.lazy(() => import('./info'));
const Records = React.lazy(() => import('./records'));

const Code = (props: any): JSX.Element => {
  return (
    <div>
      <Suspense fallback={<Loading />}>
        <Switch>
          <Route path="/dashboard/code/info" component={Info} />
          <Route path="/dashboard/code/records" component={Records} />
          <Redirect to="/dashboard/code/info" />
        </Switch>
      </Suspense>
    </div>
  );
};

export default Code;
