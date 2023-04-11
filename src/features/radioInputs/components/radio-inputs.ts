import { IRadioButtons } from "../../../shared/types/IRadioButtons";
import styles from "../styles/radio-inputs.css?inline";

class RadioInputs extends HTMLElement {
  container: HTMLDivElement;
  radioButtons: IRadioButtons[]
  value: string

  constructor() {
    super();

    const shadow = this.attachShadow({ mode: "open" });
    const style = document.createElement("style");
    style.insertAdjacentText("beforeend", styles);
    shadow.append(style);

    const createConteiner = document.createElement("div");
    createConteiner.setAttribute("class", "radio-inputs-container");
    shadow.append(createConteiner);

    this.radioButtons = []
    this.value = null

    this.container = shadow.querySelector(".radio-inputs-container");
  }

  render() {
    
    Array.from(this.container.children).forEach((item, _, arr) => {
      item.addEventListener("click", (e) => this.checkedInput(e, item, arr));
    });
  }
  
  set propsRadioButtons(array: IRadioButtons[]) {
    this.radioButtons = array
    this.renderRadioButtons(this.radioButtons);
  }

  get valueSelected(): string {
    return this.value
  }

  checkedInput(e: Event, item: Element, arr: Element[]) {
    e.stopPropagation();

    const targetInputElement: HTMLInputElement = item.shadowRoot.querySelector(".radio-input");

    arr.forEach((prevItem: HTMLInputElement) => {
      const prevElement: HTMLInputElement = prevItem.shadowRoot.querySelector(".radio-input");
      if (item !== prevItem) {
        prevElement.checked = false;
        prevItem.setAttribute('selected', 'false')
      } else {
        this.value = targetInputElement.value
        item.setAttribute('selected', 'true')
        targetInputElement.checked = true;
      }
    });
  }

  renderRadioButtons(radioButtotns: IRadioButtons[]) {

    radioButtotns.forEach((buttons, index) => {
      const createRadioInput = document.createElement("radio-input");
      createRadioInput.setAttribute("value", `${buttons.value}`);
      createRadioInput.setAttribute("id", `${buttons.id}`);
      createRadioInput.setAttribute("name", "category");
      createRadioInput.setAttribute("selected", `${buttons.selected}`);
      this.container.insertAdjacentElement("beforeend", createRadioInput);
      if (index === 0) {
        const firstElement: HTMLInputElement =
          createRadioInput.shadowRoot.querySelector(".radio-input");
        firstElement.checked = true;
        this.value = firstElement.value
      }
    });
  }

  connectedCallback() {
    this.render();
  }
}

customElements.define("radio-inputs", RadioInputs);
