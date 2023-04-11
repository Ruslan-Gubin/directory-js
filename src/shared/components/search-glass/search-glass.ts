import { searchGlassStyles } from "./search-glass-styles"



class SearchGlass extends HTMLElement {

  constructor() {
    super() 
    const shadow = this.attachShadow({mode: 'open'})

    const wrapper = document.createElement('div')
    wrapper.classList.add('search-glass')

    const style = document.createElement('style')
    style.textContent = searchGlassStyles
    shadow.append(wrapper)
    shadow.append(style)
  }

  render() {
    const shadow = this.shadowRoot
    const wrapper = shadow.querySelector('.search-glass')
    const firstElement = document.createElement('div')
    const lastElement = document.createElement('div')
    firstElement.classList.add('search-firstElement')
    lastElement.classList.add('search-lastElement')
    wrapper.append(firstElement)
    wrapper.append(lastElement)
  }

static get setActive() {
  return 'value'
  console.log('value')
    // const shadow = this.shadowRoot
    // const wrapper = shadow.querySelector('.search-glass')
    // wrapper.classList.add('active')
    // this.render()
  }

  connectedCallback() {
    this.render()
  }

}

customElements.define('search-glass', SearchGlass)