import styles from './main-button-style.css?inline';


class MainButton extends HTMLElement {
  size: string

  constructor() {
    super()
    const shadow = this.attachShadow({ mode: 'open' })
    const button = document.createElement('button')
    button.setAttribute('class', 'main-button')

    const style = document.createElement('style')
    style.innerHTML = styles

    shadow.append(style)
    shadow.append(button)
  }

  render() {
    const shadow = this.shadowRoot
    const button = shadow.querySelector('button')
 
  }

  static get observedAttributes() {
    return ["size", 'text', 'color'];
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    switch (name) {
      case "size":
        this.updateSize(newValue)
        break;
      case "text":
        this.updatebuttonText(newValue)
        break;
      case "color":
        this.updateColor(newValue)
        break;
    }
  }

  updateSize(value: string) {
    const shadow = this.shadowRoot
    const button = shadow.querySelector('button')
      button.classList.add(value)
  }

  updatebuttonText(value: string) {
    const shadow = this.shadowRoot
    const button = shadow.querySelector('button')
    button.textContent = value
  }
  
  updateColor(value: string) {
    const shadow = this.shadowRoot
    const button = shadow.querySelector('button')
    button.classList.add(value)
  }

  connectedCallback() {
    this.render()
  }
  

}

customElements.define('main-button', MainButton)