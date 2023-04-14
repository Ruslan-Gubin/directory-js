import styles from './input-search.css?inline';


class InputSearch extends HTMLElement {
 placeholder: string

  constructor() {
    super() 
    const shadow = this.attachShadow({mode: 'open'})
    const input = document.createElement('input')
    input.classList.add('input-search')
    const style = document.createElement('style')
    this.placeholder = '';
    style.textContent = styles

    shadow.append(input)
    shadow.append(style)
  }

  render() {
    const shadow = this.shadowRoot
    const input = shadow.querySelector('.input-search')
    input.setAttribute('placeholder', `${this.placeholder}`)


    input.addEventListener('focus', (e: FocusEvent) => {
      e.preventDefault()
      input.classList.add('active')
    })
    
    input.addEventListener('blur', (e: FocusEvent) => {
      e.preventDefault()
      input.classList.remove('active')
    })
  }

  static get observedAttributes() {
    return ['placeholder']
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    switch (name) {
      case 'placeholder': 
      this.updatePlaceholder(newValue)
        break;
    }
  }

  updatePlaceholder(newValue: string) {
    this.placeholder = newValue
    this.render()
  }

  connectedCallback() {
    this.render()
  }

}

customElements.define('input-search', InputSearch)