import { radioInputTemplate } from '../../template/radioInputTemplate';
import { IRadioButtons } from '../../types/IRadioButtons';
import styles from './radio-input.css?inline';

class RadioInput extends HTMLElement {
  label: HTMLLabelElement
  input: HTMLInputElement
  root: HTMLDivElement
  radionButtons: IRadioButtons[]

  constructor() {
    super()
    const shadow = this.attachShadow({mode: 'open'})
    const style = document.createElement('style')
    style.insertAdjacentText('beforeend', styles)
    shadow.append(style)
    shadow.append(radioInputTemplate.content.cloneNode(true))

    this.radionButtons = []

    this.root = this.shadowRoot.querySelector('.radio-input-container')
    this.label = this.shadowRoot.querySelector('.radio-input-label')
    this.input = this.shadowRoot.querySelector('.radio-input')
  }

  render() {
   
    
   
  }

  static  get observedAttributes() {
    return ['id', 'name', 'value','selected',];
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {

    switch (name) {
        case "value":
          this.input.setAttribute('value', `${newValue}`)
          this.label.innerHTML = newValue
        break;
        case "id":
          this.input.setAttribute('id', `${newValue}`)
          this.label.setAttribute('for', `${newValue}`)
          break;
      case "name":
        this.input.setAttribute('name', `${newValue}`)
        break;
      case "selected":
        if (newValue === 'true') {
          this.root.classList.add('active')
        }  else {
          this.root.classList.remove('active')
        }
    
        break;
     
    }
  }

  connectedCallback() {
    this.render()
  }

}

customElements.define('radio-input', RadioInput)