import styles from '../styles/post-buttons.css?inline';


class PostButtons extends HTMLElement {
  size: string

  constructor() {
    super()
    const shadow = this.attachShadow({mode: 'open'})
    const wrapper = document.createElement('div')
    wrapper.setAttribute('class', 'post-buttons-container')

    const style = document.createElement('style')
    style.innerHTML = styles

    shadow.append(style)
    shadow.append(wrapper)
  }

  render() {
    const shadow = this.shadowRoot
    const wrapper = shadow.querySelector('.post-buttons-container')

    const buttonSuccess = document.createElement('main-button')
    buttonSuccess.setAttribute('size', 'small')
    buttonSuccess.setAttribute('color', 'blue')
    buttonSuccess.setAttribute('text', 'update')
    
    const buttonCancel = document.createElement('main-button')
    buttonCancel.setAttribute('size', 'small')
    buttonCancel.setAttribute('color', 'red')
    buttonCancel.setAttribute('text', 'delete')

    wrapper.append(buttonSuccess)
    wrapper.append(buttonCancel)
  }


  static get observedAttributes() {
    return ["size"];
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    switch (name) {
      case "size":
        this.updateSize(newValue)
        break;
    }
  }

  updateSize(value: string) {
    const shadow = this.shadowRoot
    const wrapper = shadow.querySelector('button')

  }

  connectedCallback() {
    this.render()
  }
  

}

customElements.define('post-buttons', PostButtons)