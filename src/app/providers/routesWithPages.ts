import appConstants from '../constants/appConstants'
import Route from 'route-parser'

import MainPage from '../../pages/main.template';
import JavaScript from '../../pages/javascript.template';
import React from '../../pages/reactjs.template';
import Functions from '../../pages/functions.template';
import CreatePost from '../../pages/createdPost.template';
import PostDetails from '../../pages/postDetails.template';


export const routes = {
  Main: new Route(appConstants.routes.index),
  JavaScript: new Route(appConstants.routes.javascript),
  React: new Route(appConstants.routes.react),
  Functions: new Route(appConstants.routes.functions),
  CreatePost: new Route(appConstants.routes.createPost),
  PostDetails: new Route(appConstants.routes.postDetails),
}

const routesWithPages = [
  { route: routes.Main, page: MainPage },
  { route: routes.JavaScript, page: JavaScript },
  { route: routes.React, page: React },
  { route: routes.Functions, page: Functions },
  { route: routes.CreatePost, page: CreatePost },
  { route: routes.PostDetails, page: PostDetails },
]

export { routesWithPages }