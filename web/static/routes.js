import React from 'react';
import Route from 'react-router/lib/Route';
import IndexRoute from 'react-router/lib/IndexRoute';
import IndexRedirect from 'react-router/lib/IndexRedirect';

import App from './containers/App';
import AllPosts from './containers/AllPosts';
import PostDetail from './containers/PostDetail';

export default (
  <Route path="/" component={App}>
    <IndexRedirect to="home"  />

    <Route path="home" component={AllPosts}  />
    <Route path="posts/:postId" component={PostDetail}  />
  </Route>
);
