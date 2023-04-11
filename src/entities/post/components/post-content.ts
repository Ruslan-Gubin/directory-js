import styles from '../styles/post-text.css?inline';

class PostContent extends HTMLElement {
  size: string;
  text: string;
  textEl: HTMLPreElement

  constructor() {
    super();
    const shadow = this.attachShadow({ mode: "open" });
    this.textEl = document.createElement('pre')
    
    const style = document.createElement("style");
    style.innerHTML = styles;

    this.text = ''
    
    shadow.append(style);
    shadow.append(this.textEl);
  }
  
  render() {

    
  }

  static get observedAttributes() {
    return ["size", "text"];
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    
    switch (name) {
      case "size":
        this.textEl.classList.add(`text-${newValue}`)
        break;
      case "text":
        this.textEl.textContent = newValue
        break;
    }

  }


  connectedCallback() {
    this.render();
  }
}

customElements.define("post-content", PostContent);
