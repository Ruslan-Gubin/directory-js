import appConstants from "../../../app/constants/appConstants";
import { routes } from "../../../app/providers/routesWithPages";
import { goTo } from "../../../app/router";
import { LINKS } from "../constants/links";
import { navHeaderTemplate } from "../template/nav-header-template";
import styles from "../styles/nav-header-styles.css?inline";

class NavHeader extends HTMLElement {
  searchType: string;

  constructor() {
    super();
    const shadow = this.attachShadow({ mode: "open" });
    const template = navHeaderTemplate.content.cloneNode(true);
    this.searchType = appConstants.search.types.javascript;
    const style = document.createElement("style");

    style.textContent = styles;
    shadow.append(style);
    shadow.append(template);
  }

  updatePlaceholder() {
    const shadow = this.shadowRoot;
    const input = shadow.querySelector("input-search");
    input.setAttribute("placeholder", `Search ${this.searchType}...`);
  }

  render() {
    const shadow = this.shadowRoot;
    const wrapper = shadow.querySelector(".nav-header");
    const shadowInput = shadow.querySelector("input-search").shadowRoot;
    const input = shadowInput.querySelector("input");
    const searchGlass = shadow.querySelector("search-glass").shadowRoot;
    const searchButton = searchGlass.querySelector(".search-glass");

    searchButton.addEventListener("click", (e: MouseEvent) => {
      e.preventDefault();
      this.searchActiveHandle(input);
    });

    input.addEventListener("focus", (e: FocusEvent) => {
      e.preventDefault();
      searchButton.classList.add("active");
    });

    input.addEventListener("blur", (e: FocusEvent) => {
      e.preventDefault();
      searchButton.classList.remove("active");
    });

    input.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        this.searchActiveHandle(input);
      }
    });

    this.searchType = this.getAttribute("type")
      ? this.getAttribute("type")
      : appConstants.search.types.javascript;

    const { pathname } = new URL(window.location.href);

    const findLink = LINKS.find((item) => item.href === pathname);

    if (findLink) {
      const linkElement = shadow.querySelector(`.${findLink.class}`);
      linkElement.setAttribute("selected", "true");
    }
  }

  searchActiveHandle(input: HTMLInputElement) {
    if (input.value) {
      window.localStorage.setItem("search", input.value);
      const location = window.location.pathname;
      goTo(location);
      window.localStorage.setItem("search", "");
    }
  }

  static get observedAttributes() {
    return ["type"];
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    if (name === "type") {
      this.searchType = newValue;
      this.updatePlaceholder();
    }
  }

  connectedCallback() {
    this.render();
  }
}

customElements.define("nav-header", NavHeader);
