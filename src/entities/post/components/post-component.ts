import { getAllAtribute } from "../../../shared/libs/utils/getAllAtribute";
import { postAttributeNames } from "../constants/postAttributeNames";
import styles from '../styles/post-component.css?inline';
import { postTemplate } from "../template/post-template";
import { IPostAttributeNames } from "../types/IPostAttributeNames";

class PostComponent extends HTMLElement {
  size: string;
  
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: "open" });
    const wrapper = postTemplate.content.cloneNode(true);
    const style = document.createElement("style");
    style.insertAdjacentText('beforeend', styles)
    
    this.size = '';
    
    shadow.appendChild(style);
    shadow.appendChild(wrapper);
  }
  
 async render() {
    const shadow = this.shadowRoot;

    const { image, text, title } =  getAllAtribute<IPostAttributeNames>(this, ...postAttributeNames )
 
    const imageElement = shadow.querySelector("post-image");
    imageElement.setAttribute("src", `${image}`);
    imageElement.setAttribute("alt", `post image`);
    imageElement.setAttribute("size", `${this.size}`);
    
    const postTitle = shadow.querySelector('post-title')
    postTitle.setAttribute('titletext', `${title}`)
    postTitle.setAttribute('size', `${this.size}`)
  
    if (this.size !== 'small') {
      const postButtons = document.createElement('post-buttons')
      shadow.append(postButtons)
    }
  }
  
  static get observedAttributes() {
    return ['size'];
  }
  
  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    switch (name) {
      case "size":
        this.size = newValue;
        break;
    }
  }
  
  connectedCallback() {
    this.render();
  }
}

customElements.define("post-component", PostComponent);
