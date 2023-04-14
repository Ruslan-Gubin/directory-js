import { textAreaMainTemplate } from '../../template/textAreaMainTemplate';
import styles from './textarea-main.scss?inline';


class TextareaMain extends HTMLElement {
  textarea: HTMLInputElement
  label: HTMLLabelElement

  constructor() {
    super();
    const shadow = this.attachShadow({ mode: "open" });
    
    const style = document.createElement("style");
    style.insertAdjacentText('beforeend', styles)
    shadow.append(style);
    
    shadow.append(textAreaMainTemplate.content.cloneNode(true))

    this.textarea = this.shadowRoot.querySelector('.textarea')
    this.label = this.shadowRoot.querySelector('.label') 
  }
  
  render() {

    this.textarea.addEventListener('focus',(e) => this.focusEventInput(e, this.textarea))
  }

  focusEventInput(e, textarea: HTMLInputElement) {
    e.preventDefault()
    if (textarea.value === 'Введите не меньше 3 символов') {
      textarea.value = ''
      textarea.classList.remove('error-text')
    }
  }

  static  get observedAttributes() {
    return ['label', 'name', 'id', 'size', 'error', 'valueText'];
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    switch (name) {
        case "label":
          this.label.setAttribute('label', `${newValue}`)
          this.label.innerHTML = newValue
        break;
      case "name":
        this.textarea.setAttribute('name', `${newValue}`)
        break;
      case "id":
        this.textarea.setAttribute('id', `${newValue}`)
        this.label.setAttribute('for', `${newValue}`)
        break;
      case "size":
        this.textarea.setAttribute('size', `${newValue}`)
        this.textarea.classList.add(`${newValue}`)
        break;
      case "error":
        this.updateErrorAttribute(newValue)
        break;
      case "valueText":
        this.label.innerHTML = newValue
        console.log('11111111')
        break;
    }
  }

  updateErrorAttribute(value: string) {
    if (value) {
      this.label.innerHTML = value
      this.label.classList.add('error-text')
    } else {

      this.label.innerHTML = this.label.getAttribute('label')
      this.label.classList.remove('error-text')
    }
  }

  connectedCallback() {
    this.render();
  }

}

customElements.define("textarea-main", TextareaMain);