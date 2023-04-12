import { goTo } from "../../../app/router";
import { IPost } from "../../../app/types/IPost";
import { removePostId } from "../api/removePostId";
import { getPostIdCash } from "../service/postService";
import styles from "../styles/post-details.css?inline";

class PostDetails extends HTMLElement {
  postImages: [];
  postSwiper;
  root: HTMLDivElement;
  postId: string;
  post: IPost;

  constructor() {
    super();
    const shadow = this.attachShadow({ mode: "open" });
    this.root = document.createElement("div");
    this.root.classList.add("root");
    const style = document.createElement("style");
    style.insertAdjacentText("beforeend", styles);

    this.postImages = [];
    this.postSwiper = document.createElement("swiper-main");
    this.postId = "";
    this.post = null;
    
    shadow.append(style);
    shadow.append(this.root);
  }

  async render() {
    this.post = await getPostIdCash(this.postId);
 
    const postButtons = document.createElement('post-buttons')
    const buttonContainer = postButtons.shadowRoot.querySelector('.post-buttons-container')
    this.root.insertAdjacentElement("beforeend", postButtons);
    
    
    const postTitle = document.createElement('post-title')
    postTitle.setAttribute('titletext', `${this.post.title}`)
    postTitle.setAttribute('size', 'big')
    this.root.insertAdjacentElement("beforeend", postTitle);
    
    
    const images = this.post.image.map((item) => item.url);
    this.postSwiper.renderImages(images);
    this.root.insertAdjacentElement("beforeend", this.postSwiper);
    
    
    const postText = document.createElement('post-content')
    postText.setAttribute('text', `${this.post.text}`)
    postText.setAttribute('size', 'big')
    this.root.insertAdjacentElement("beforeend", postText);

   
    Array.from(buttonContainer.children).forEach(btn => {
      switch(btn.getAttribute('text')) {
        case 'update':
         btn.addEventListener('click', (e: MouseEvent) => this.updateClickPost(e))
         break;
         case 'delete':
          btn.addEventListener('click', (e: MouseEvent) => this.removeClickPost(e))
          break;
      }
     
    })

  }

  updateClickPost(e: MouseEvent) {
    e.preventDefault()
    goTo(`/create`)
  }

  removeClickPost(e: MouseEvent) {
    e.preventDefault()
    const removeReuestOptions = {
      id: this.postId,
      images: this.post.image.map(item => item.public_id)
    }
    removePostId(removeReuestOptions)
    .then(response => {
      if (response) {
        goTo(`/`)
      }
    })
    .catch(error => console.log(error))
  }

  static get observedAttributes() {
    return ["id"];
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    switch (name) {
      case "id":
        this.postId = newValue;
        break;
    }
  }

  connectedCallback() {
    this.render();
  }
}

customElements.define("post-details", PostDetails);
