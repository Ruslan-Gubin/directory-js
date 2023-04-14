import styles from './modal-container.css?inline';

class ModalContainer extends HTMLElement {
  root: HTMLElement
  constructor() {
    super()

    const shadow = this.attachShadow({mode: 'open'})
    const style = document.createElement('style')
    style.insertAdjacentText('afterbegin', styles)
    this.root = document.createElement('section')
    this.root.classList.add('root')

    shadow.append(style)
    shadow.append( this.root)
  }

  render() {
    
  }

  static get observedAttributes() {
    return ["size"];
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
   switch(name) {
    case 'size':
    this.root.classList.add(newValue)
    break;
   }
  }

  connectedCallback() {
    this.render();
  }

}

customElements.define('modal-container', ModalContainer)