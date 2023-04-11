import { getImages } from "../libs/helpers/getImages";
import { IbodyOptions } from "../../addImagesForm/types/IbodyOptions";
import { createPostTemplate } from "../template/createPostTemplate";
import { validCreatedPost } from "../libs/helpers/validCreatedPost";
import { createPostApi } from "../api/createPostApi";
import { validLenghtInput } from "../libs/helpers/validLenghtInput";
import { createPostRadioButtons } from "../constants/createPostRadio";
import { goTo } from "../../../app/router";
import { IPost } from "../../../app/types/IPost";
import { postsCategory } from "../../../widgets/posts-list/service/posts";

import styles from "../styles/create-post.css?inline";

class CreatePost extends HTMLElement {
  textArea: HTMLElement
  inputMain: HTMLElement
  radioInputs
  form: HTMLFormElement
  labelTitle: string
  labelText: string
  size: string
  disabled: boolean

  constructor() {
    super();
    const shadow = this.attachShadow({ mode: "open" });
    const template = createPostTemplate.cloneNode(true);

    const style = document.createElement("style");
    style.innerHTML = styles;
    
    shadow.append(style);
    shadow.append(template);
    
    
    this.labelTitle = 'Title'
    this.labelText = 'Text'
    this.size = 'average'
    this.disabled = false
    
    this.form = shadow.querySelector(".create-post-form");
    this.radioInputs = document.createElement('radio-inputs');
    this.radioInputs.propsRadioButtons = createPostRadioButtons
    this.textArea = document.createElement('textarea-main');
    this.inputMain = document.createElement('input-main');
  }
  
  async render() {
    const shadow = this.shadowRoot;
    const buttons = shadow.querySelector(".create-post-buttons");
    
    this.form.insertAdjacentElement('afterbegin', this.radioInputs)
    this.form.insertAdjacentElement('afterbegin',this.setTexareaText())
    this.form.insertAdjacentElement('afterbegin',this.setInputTitle())

    Array.from(buttons.children).forEach((item) => {
      const check = item.getAttribute("color");
      switch (check) {
        case "blue":
          item.addEventListener("click", (e: MouseEvent) => {
            e.preventDefault();
            this.submitForm();
          });
          break;
        case "red":
          item.addEventListener("click", (e: MouseEvent) => {
            e.preventDefault();
            this.cancelSubmit()
          });
          break;
      }
    });
  }



  setTexareaText() {
    this.textArea.setAttribute('label', `${this.labelText}`)
    this.textArea.setAttribute('size', `${this.size}`)
    this.textArea.setAttribute('name', 'text')
    this.textArea.setAttribute('id', `text-area`)
    return this.textArea
  }

  setInputTitle() {
    this.inputMain.setAttribute('label', `${this.labelTitle}`)
    this.inputMain.setAttribute('size', `${this.size}`)
    this.inputMain.setAttribute('id', 'text-title')
    this.inputMain.setAttribute('type', 'text')
    this.inputMain.setAttribute('name', 'text-title')
    return this.inputMain
  }

  async submitForm() {
    if (this.disabled) return;
  
    const shadow = this.shadowRoot;
    const form: any = shadow.querySelector(".create-post-form");
    
    const titleValue: HTMLInputElement = this.inputMain.shadowRoot.querySelector('.main-input')
    const textArea: HTMLInputElement = this.textArea.shadowRoot.querySelector('.textarea')
    const categoryValue: string = this.radioInputs.valueSelected
  

    const shadowImages = shadow.querySelector("images-form").shadowRoot;
    const imageArray = shadowImages.querySelector(".create-post-files");

    const bodyOptions: IbodyOptions = {
      category: categoryValue,
      title: titleValue.value,
      text: textArea.value,
      images: getImages(imageArray),
    };


  validLenghtInput(titleValue.value, this.inputMain)
  validLenghtInput(textArea.value, this.textArea)


  if (!validCreatedPost(bodyOptions)) return;

  this.disabled = true

  
  await createPostApi(bodyOptions)
      .then( async (data: IPost) => {
        if (data) {
          await  this.cancelSubmit()
          goTo(`/post/${data._id}`)
          postsCategory.clear()
          this.disabled = false
        }
      })
      .catch((error) => {
        console.log(error)
        this.disabled = false
      });
  }

  cancelSubmit() {
    const shadow = this.shadowRoot;
    const titleValue: HTMLInputElement = this.inputMain.shadowRoot.querySelector('.main-input')
    const textArea: HTMLInputElement = this.textArea.shadowRoot.querySelector('.textarea')
    titleValue.value = ''
    textArea.value = ''
    const shadowImages = shadow.querySelector("images-form").shadowRoot;
    const imageArray = shadowImages.querySelector(".create-post-files");
    Array.from(imageArray.children).forEach(img => {
      if (!img.classList.contains('add-image')){
        img.remove()
      }
    })
  }

  connectedCallback() {
    this.render();
  }
}

customElements.define("create-post", CreatePost);
