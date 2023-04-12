// const apiServer = 'https://web-compomponents.onrender.com/api';
// const apiServer = import.meta.env.DEV ? 'http://localhost:4444/api' : 'http://localhost:4444';

import { BACKEND_URL } from "../constants/urlServer";


const apiServer = BACKEND_URL


const baseFetch = <T>(url: string, config = {}, params?: {}): Promise<T> => {
  return new Promise((resolve, reject) => {
      try{

          // const token = window.sessionStorage.getItem(appConstants.storage.keys.token)
          const defaultHeaders = {
            'Content-Type': 'application/json;charset=utf-8'
        }

      //   if(token){
      //     defaultHeaders['Authorization'] = `Bearer ${token}`
      // }

      const _config = {
        headers: {
            ...defaultHeaders
        },
        ...config
    }

          if(params){
              _config['body'] = JSON.stringify(params)
          }

          window.fetch(`${apiServer}${url}`, { 
            ..._config 
          })
          .then(response => response.json())
          .then(resolve, reject)
          
      } catch(e) {
          reject(e)
      }
  })
}

const fetchGet = <T>(url: string, config): Promise<T> => {
  return baseFetch(url, config)
}

const fetchPost = (url: string, params = {}, config = {}) => {
  return baseFetch(url, {
      ...config,
      method: 'POST'
  }, params)
}

const fetchPut = (url, params = {}, config = {}) => {
  return baseFetch(url, {
    method: 'PUT',
      ...config,
  }, params)
}

const fetchPatch = (url, params = {}, config = {}) => {
  return baseFetch(url, {
    method: 'PATCH',
      ...config,
  }, params)
}

const fetchDelete = (url, params = {}, config = {}) => {
  return baseFetch(url, {
    method: 'DELETE',
      ...config,
  }, params)
}

export default {
  get: fetchGet,
  post: fetchPost,
  put: fetchPut,
  patch: fetchPatch,
  delete: fetchDelete,
}