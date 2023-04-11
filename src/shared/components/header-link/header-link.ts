import { goTo } from '../../../app/router';
import { headerLinkStyles } from './styles';


class HeaderLink extends HTMLElement {
 public selected: boolean
 href: string

  constructor() {
    super() 
    const shadow = this.attachShadow({mode: 'open'})
    const link = document.createElement('a')
    const style = document.createElement('style')
    link.classList.add('header-link')
    this.selected = false;
    this.href = link.href
    style.textContent = headerLinkStyles

    shadow.append(link)
    shadow.append(style)
  }

  render() {
    const shadow = this.shadowRoot
    const href = this.getAttribute('href')
    const link = shadow.querySelector('a')
    link.setAttribute('selected', `${this.selected}`)
    link.href = href;
    link.textContent = this.getAttribute('text')
    link.addEventListener('click', this.onClick)
  }

  onClick(e) {
    e.preventDefault()
    if (!this.selected) {
      const { pathname } = new URL(this.href)
      goTo(pathname)
    }
  }

  static get observedAttributes() {
    return ['selected']
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    switch (name) {
      case 'selected': 
      this.updateSelected()
        break;
    }

  }

  updateSelected() {
      const shadow = this.shadowRoot
      const element = shadow.querySelector('a')
      element.classList.add('active')
      this.selected = true
  }

  connectedCallback() {
    this.render()
  }

}

customElements.define('header-link', HeaderLink)
