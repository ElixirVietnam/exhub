import React from 'react';
import Route from 'react-router/lib/Route';
import IndexRoute from 'react-router/lib/IndexRoute';
import IndexRedirect from 'react-router/lib/IndexRedirect';

import App from './containers/App';
import SignIn from './containers/Account/SignIn';
import SignUp from './containers/Account/SignUp';
import Dashboard from './containers/Dashboard';

import ListUser from './containers/User/ListUser';
import EditUser from './containers/User/EditUser';
import CreateUser from './containers/User/CreateUser';
import UserProfile from './containers/User/UserProfile';

import ListAllEntry from './containers/Entry/ListAllEntry';
import ListUserEntry from './containers/Entry/ListUserEntry';
import EditEntry from './containers/Entry/EditEntry';
import CreateUserEntry from './containers/Entry/CreateUserEntry';
import ListCurrentUserEntry from './containers/Entry/ListCurrentUserEntry';
import EditCurrentUserEntry from './containers/Entry/EditCurrentUserEntry';
import CreateCurrentUserEntry from './containers/Entry/CreateCurrentUserEntry';

import ListAllReport from './containers/Report/ListAllReport';
import ListUserReport from './containers/Report/ListUserReport';
import EditReport from './containers/Report/EditReport';
import ListCurrentUserReport from './containers/Report/ListCurrentUserReport';
import EditCurrentUserReport from './containers/Report/EditCurrentUserReport';

export default (
  <Route path="/" component={App}>

    <IndexRedirect to="dashboard"  />
    <Route path="signup" component={SignUp}  />
    <Route path="signin" component={SignIn}  />
    <Route path="dashboard" component={Dashboard}  />

    <Route path="users">
      <IndexRoute component={ListUser} />
      <Route path="me">
        <IndexRoute component={UserProfile} />
        <Route path="entries">
          <IndexRoute component={ListCurrentUserEntry} />
          <Route path=":entryId" component={EditCurrentUserEntry}  />
        </Route>
        <Route path="reports">
          <IndexRoute component={ListCurrentUserReport} />
          <Route path=":reportId" component={EditCurrentUserReport}  />
        </Route>
      </Route>
      <Route path="create" component={CreateUser} />
      <Route path=":userId">
        <IndexRoute component={EditUser} />
        <Route path="entries">
          <IndexRoute component={ListUserEntry} />
          <Route path="create" component={CreateUserEntry} />
        </Route>
        <Route path="reports" component={ListUserReport} />
      </Route>
    </Route>

    <Route path="entries">
      <IndexRoute component={ListAllEntry} />
      <Route path="create" component={CreateCurrentUserEntry} />
      <Route path=":entryId" component={EditEntry}  />
    </Route>

    <Route path="reports">
      <IndexRoute component={ListAllReport} />
      <Route path=":reportId" component={EditReport}  />
    </Route>
  </Route>
);
