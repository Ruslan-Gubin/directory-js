import { imagesFormTemplate } from "../template/imagesFormTemplate"
import styles from '../style/imagesFormStyles.css?inline'

class AddImagesForm extends HTMLElement {
  imagesAlt: string[]

  constructor() {
    super()
    const shadow = this.attachShadow({mode: 'open'})
    const template = imagesFormTemplate.cloneNode(true)
    const style = document.createElement('style')

    style.innerHTML = styles

    this.imagesAlt = []

    shadow.append(style)
    shadow.append(template)
  }

  render() {
    const wrapper = this.getWrapper()
    const addImageIcon = wrapper.querySelector('.add-image')
    const fileElement = wrapper.querySelector('input')
    
    addImageIcon.addEventListener('click', () =>  fileElement.click())

    fileElement.addEventListener('change', async (e) => {
      e.preventDefault()
    this.addImages(e)
  })

  wrapper.addEventListener('click', (e: MouseEvent) => {
    const targetElement: any = e.target
    if (targetElement.tagName === 'IMG' && targetElement.alt !== 'Add image') {
      this.removeImage(targetElement, targetElement.alt)
    }
  })

  }

  /** добавляем img */
 addImages(e) {
  const file: File = e.target.files ? e.target.files[0] : false;
  const name = file.name
  const checkAlt = this.imagesAlt.some(item => item === name)
  if (!checkAlt && this.imagesAlt.length < 5) {
  const render = new FileReader();
  render.readAsDataURL(file);
  render.onloadend = () => {
    if (render.result) {
      const img: string =  String(render.result)
      this.addImagesDom(img, name)
    }
  }
}
}

getWrapper() {
  const shadow = this.shadowRoot
  return shadow.querySelector('.create-post-files')
}

/** удаляем изображение */
removeImage(element: Element, alt: string) {
  const imagesElements = this.getWrapper()
  imagesElements.removeChild(element)
  this.imagesAlt = this.imagesAlt.filter(item => item !== alt)
  this.checkImageCount()
}

/** работа с img */
addImagesDom(src: string, alt: string) {
  const images = this.getWrapper()
  const newImage = document.createElement('img')
  newImage.setAttribute('src', `${src}`)
  newImage.setAttribute('alt', `${alt}`)
  images.insertAdjacentElement('afterbegin', newImage)
  this.imagesAlt.push(alt)
  this.checkImageCount()
}

/**проверка надо ли убрать кнопку добавить фото */
checkImageCount() {
  const images = this.getWrapper()

  const imgArr = images.querySelectorAll('img')


const addImageIcon = Array.from(imgArr).find(item => item.alt === 'Add image')

  if (this.imagesAlt.length > 4) {
    addImageIcon.setAttribute('hidden', 'true')
    } else {
    addImageIcon.removeAttribute('hidden')
    }

}


 connectedCallback() {
    this.render();
  }

}

customElements.define('images-form', AddImagesForm)
