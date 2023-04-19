import styles from '../style/modal-question.css?inline';

class ModalQuestion extends HTMLElement {
  wrapper: HTMLDivElement
  open: boolean
  titleText: string
  answerText: string

  constructor() {
    super()
    const shadow = this.attachShadow({mode: 'open'})
    const style = document.createElement('style')
    style.insertAdjacentText('afterbegin', styles)
    this.wrapper = document.createElement('div')
    this.wrapper.classList.add('wrapper')

    this.titleText = ''
    this.answerText = ''

    this.open = true

    shadow.append(style)
    shadow.append(this.wrapper)
  }

  render() {
      const inputTitle = document.createElement('input-main')
      inputTitle.classList.add('created-title')
      inputTitle.setAttribute('label', 'title')
      this.wrapper.append(inputTitle)
      const inputText = document.createElement('input-main')
      inputText.classList.add('created-text')
      inputText.setAttribute('label', 'text')
      this.wrapper.append(inputText)
      const buttonSend = document.createElement('main-button')
      buttonSend.classList.add('send-question')
      buttonSend.setAttribute('text', 'Send')
      buttonSend.setAttribute('color', 'blue')
      this.wrapper.append(buttonSend)
  }


  
  static get observedAttributes() {
    return ["open"];
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    switch(name) {
      case 'open': 
      console.log(newValue)
      this.open = !!newValue
      break;
    }
  }

  connectedCallback() {
    this.render();
  }
}

customElements.define('modal-question', ModalQuestion)