import React from 'react';
import Route from 'react-router/lib/Route';
import IndexRoute from 'react-router/lib/IndexRoute';
import IndexRedirect from 'react-router/lib/IndexRedirect';

import App from './containers/App';
import GithubCallback from './containers/Login/GithubCallback'
import PostList from './containers/Post/PostList';
import CategoryPostList from './containers/Post/CategoryPostList';
import TagPostList from './containers/Post/TagPostList';
import PostDetail from './containers/Post/PostDetail';
import PostCreate from './containers/Post/PostCreate';

export default (
  <Route path="/" component={App}>
    <IndexRedirect to="home"  />
    <Route path="auth/github/frontend_callback" component={GithubCallback}  />
    <Route path="home" component={PostList}  />
    <Route path="posts/create" component={PostCreate}  />
    <Route path="posts/:postId" component={PostDetail}  />
    <Route path="categories/:name" component={CategoryPostList}  />
    <Route path="tags/:name" component={TagPostList}  />
  </Route>
);
