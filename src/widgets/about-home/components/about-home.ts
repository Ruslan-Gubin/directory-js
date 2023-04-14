import { homeText } from '../constants/homeText';
import styles from '../styles/about-home.css?inline';

class AboutHome extends HTMLElement {
  modalRoot: HTMLElement

  constructor() {
    super()

   const shadow = this.attachShadow({mode: 'open'})

   const style = document.createElement('style')
   style.insertAdjacentText('beforeend', styles)
   shadow.append(style)

   const root = document.createElement('div')
   root.classList.add('root')

   const modal = document.createElement('modal-container')
   modal.classList.add('small')
   this.modalRoot = modal.shadowRoot.querySelector('.root')
   

   root.append(modal)
   shadow.append(root)
  }

  setModalContent() {
    const text = document.createElement('pre')
    text.classList.add('text')
    text.innerHTML = homeText.modal
    this.modalRoot.append(text)
  }

  render() {
      this.setModalContent()
  }

  static get observedAttributes() {
    return ["type"];
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    if (name === "type") {
  
   
    }
  }

  connectedCallback() {
    this.render();
  }


}

customElements.define('about-home', AboutHome)