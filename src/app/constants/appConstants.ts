import { IAppConstants } from "../types/IAppConstants"


const appConstants: IAppConstants = {
  routes: {
    index: '/',
    javascript: '/javascript',
    react: '/reactjs',
    functions: '/functions',
    createPost: '/create',
    postDetails: '/post/:id',
    // posts: '/posts',
    // usersSearch: '/users/query/:query',
    // users: '/users',
    // user: '/user/:user',
    // userPosts: '/user/:user/posts',
    // userComments: '/user/:user/comments',
  },
  search: {
    types: {
      javascript: 'javascript',
      react: 'reactjs',
      functions: 'functions',
    }
  },
  lists: {
    types: {
      javascript: 'javascript',
      react: 'reactjs',
      functions: 'functions',
    }
}
}

export default appConstants