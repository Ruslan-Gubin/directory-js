import { goTo } from "../../../app/router"
import { IPost } from "../../../app/types/IPost"
import { getAllAtribute } from "../../../shared/libs/utils/getAllAtribute"
import { getCategoryPosts } from "../api/getSearchPostsApi"
import { getPostCash,  postsCategory,  setPostCash } from "../service/posts"
import { IPostListAttribute } from "../types/IPostListAttribute"
import { postsListTemplate } from "../template/posts-list-template"

import styles from '../style/posts-list-styles.css?inline';


class PostList extends HTMLElement {
  searchText: string;

  constructor() {
    super()
    const shadow = this.attachShadow({ mode: 'open' })
    const template = postsListTemplate.content.cloneNode(true)
    const style = document.createElement('style')

    style.innerHTML = styles
    this.searchText = window.localStorage.getItem('search')

    shadow.append(template)
    shadow.append(style)
  }

 async render() {
    const shadow = this.shadowRoot
    const ulElement = shadow.querySelector('.posts-list-container')
    const buttonAddPost = shadow.querySelector('main-button')
    const buttonElement = buttonAddPost.shadowRoot.querySelector('.main-button')
   
    buttonElement.addEventListener('click', (e: MouseEvent) => {
      e.stopPropagation()
    sessionStorage.removeItem('updatePost')
      goTo('/create')
    })

    const { category } = getAllAtribute<IPostListAttribute>(this, 'category')

    const url = `/post/?category=${category}&searchValue=${this.searchText}`

    if (!postsCategory.has(url)) {
      const posts: IPost[] | any = await getCategoryPosts(url)
      setPostCash(url, posts)
    } 
    
    getPostCash(url).map((post: IPost) => {
      const postEl = document.createElement('post-component')
      postEl.classList.add('posts-list-item')
      postEl.setAttribute('id', `${post._id}`)
      postEl.setAttribute('url', `${url}`)
      postEl.setAttribute('size', 'small')
      postEl.setAttribute('image', `${post.image[0].url}`)
      postEl.setAttribute('title', `${post.title}`)

      
      postEl.addEventListener('click', (e) => {
        e.stopPropagation()
        this.goPostRoute(post._id)
      })

      ulElement.insertAdjacentElement('beforeend', postEl)
    })
  

  }

  goPostRoute(id: string) {
    goTo(`/post/${id}`)
  }

  static get observedAttributes() {
    return [];
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    switch(name) {
      
        }
    
  }

  connectedCallback() {
    this.render();
  }


}

customElements.define('posts-list', PostList)