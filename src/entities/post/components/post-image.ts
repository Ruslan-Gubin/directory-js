import styles from '../styles/post-image.css?inline';

class PostImage extends HTMLElement {
  image: string;
  alt: string;
  size: string;

  constructor() {
    super();
    const shadow = this.attachShadow({ mode: "open" });
    const imgElement = document.createElement("img");
    imgElement.setAttribute("class", "post-img");

    this.size = "";

    const style = document.createElement("style");

    style.innerHTML = styles;

    shadow.append(style);
    shadow.append(imgElement);
  }

  render() {
    const shadow = this.shadowRoot;
    const imgElement = shadow.querySelector(".post-img");
    imgElement.setAttribute("size", `${this.size}`);
    const size = imgElement.getAttribute("size");

    if (size === "small") {
      imgElement.classList.add("small");
    } else {
      imgElement.classList.remove("small");
    }

    
  }

  static get observedAttributes() {
    return ["src", "alt", "size"];
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    switch (name) {
      case "src":
        this.updateSrc(newValue);
        break;
      case "alt":
        this.updateAlt(newValue);
        break;
      case "size":
        this.updateSize(newValue);
        break;
    }
  }

  updateSrc(value: string) {
    const shadow = this.shadowRoot;
    const imgElement = shadow.querySelector("img");
    imgElement.setAttribute("src", `${value}`);
  }

  updateAlt(value: string) {
    const shadow = this.shadowRoot;
    const imgElement = shadow.querySelector("img");
    imgElement.setAttribute("alt", `${value}`);
  }

  updateSize(value: string) {
    this.size = value;
    this.render();
  }

  connectedCallback() {
    this.render();
  }
}

customElements.define("post-image", PostImage);
