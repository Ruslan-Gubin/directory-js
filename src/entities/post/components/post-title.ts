import styles from '../styles/post-title.css?inline';

class PostTitle extends HTMLElement {
  size: string;
  titleText: string;

  constructor() {
    super();
    const shadow = this.attachShadow({ mode: "open" });
    const titleEl = document.createElement("h2");
    titleEl.setAttribute("class", "post-title");
    const style = document.createElement("style");
    style.innerHTML = styles;

    this.size = "";
    this.titleText = "";

    shadow.append(style);
    shadow.append(titleEl);
  }

  render() {
    const shadow = this.shadowRoot;
    const titleEl = shadow.querySelector(".post-title");
    titleEl.setAttribute("size", `${this.size}`);
    const size = titleEl.getAttribute("size");

    if (size === "small") {
      titleEl.classList.add("title-small");
    }
  }

  static get observedAttributes() {
    return ["size", "titletext"];
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    switch (name) {
      case "size":
        if (newValue === 'big') {
          this.shadowRoot.querySelector('h2').classList.add(`${newValue}`)
        }
        this.updateSize(newValue);
        break;
      case "titletext":
        this.updateTitleText(newValue);
        break;
    }
  }

  updateSize(value: string) {
    this.size = value;
    this.render();
  }

  updateTitleText(value: string) {
    const shadow = this.shadowRoot;
    const titleElement = shadow.querySelector(".post-title");
    titleElement.innerHTML = value
    this.titleText = value
  }

  connectedCallback() {
    this.render();
  }
}

customElements.define("post-title", PostTitle);
