import { inputMainTemplate } from '../../template/inputMainTemplate';
import styles from './input-main.css?inline';


class InputMain extends HTMLElement {
  input: HTMLInputElement
  label: HTMLLabelElement

  constructor() {
    super();
    const shadow = this.attachShadow({ mode: "open" });

    const style = document.createElement("style");
    style.insertAdjacentText('beforeend', styles)
    shadow.append(style);

    shadow.append(inputMainTemplate.content.cloneNode(true))

    this.label = this.shadowRoot.querySelector('.label')
    this.input = this.shadowRoot.querySelector('.main-input')
  }

  render() {
    this.input.addEventListener('focus',(e) => this.focusEventInput(e, this.input))
  }

  focusEventInput(e: FocusEvent, input: HTMLInputElement) {
    const shadow = this.shadowRoot
    const root = shadow.querySelector('.root')
    e.preventDefault()
    if (input.value === 'Введите не меньше 3 символов') {
      input.value = ''
      input.classList.remove('error-text')
      root.removeAttribute('error')
    }
  }

  static  get observedAttributes() {
    return ['label', 'name', 'type', 'id', 'size', 'error', 'valueText'];
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {

    switch (name) {
        case "label":
        this.label.setAttribute('label', `${newValue}`)
        this.label.innerHTML = newValue
        break;
      case "name":
        this.input.setAttribute('name', `${newValue}`)
        break;
      case "type":
        this.input.setAttribute('type', `${newValue}`)
        break;
      case "id":
        this.input.setAttribute('id', `${newValue}`)
        this.label.setAttribute('for', `${newValue}`)
        break;
      case "size":
        this.input.setAttribute('size', `${newValue}`)
        this.shadowRoot.querySelector('.root').classList.add(`${newValue}`)
        break;
      case "error":
        this.updateErrorAttribute(newValue)
        break;
      case "valueText":
        // this.input.value = newValue
        // this.label.innerHTML = newValue
        console.log(newValue)
        // this.render()
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

customElements.define("input-main", InputMain);
