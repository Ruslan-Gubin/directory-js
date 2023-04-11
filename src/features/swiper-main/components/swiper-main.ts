import { createArrImages } from '../helpers/createArrImages';
import { IObjectImage } from '../types/IObjectImage';
import styles from '../styles/swiper-main.css?inline';

class SwiperMain extends HTMLElement {
  root: HTMLDivElement
  activeImageRoot: HTMLDivElement
  imageList: HTMLDivElement
  images: IObjectImage[]

  constructor() {
    super()
    const shadow = this.attachShadow({mode: 'open'})
    this.root = document.createElement('div')
    this.root.classList.add('root')
    const style = document.createElement('style')
    style.insertAdjacentText('beforeend', styles)

    this.images = []
    this.activeImageRoot = document.createElement('div')
    this.activeImageRoot.classList.add('swiper-active-root')
    this.imageList = document.createElement('div')
    this.imageList.classList.add('swiper-image-list')
    
    
    shadow.append(style)
    shadow.append(this.root)
  }
  
  render() {
    if ( !this.activeImageRoot.getAttribute('active-id')) {
      this.setActiveImage({img: this.images[0].img, id: this.images[0].id})
    }
   
      this.insertImagesList()
      this.root.insertAdjacentElement('beforeend', this.activeImageRoot)
      this.root.insertAdjacentElement('beforeend', this.imageList)

      Array.from(this.imageList.children).forEach((img: HTMLImageElement,_, imagesArray) => {
        img.addEventListener('mouseenter', (e: MouseEvent) => this.changeActiveImg(e, img, imagesArray))
      })
     
  }

 private changeActiveImg(e: MouseEvent, currentImage: HTMLImageElement, imagesArray) {
    e.stopPropagation()

    const img = currentImage.getAttribute('src')
    const id = currentImage.getAttribute('id')

    const rootId = this.activeImageRoot.getAttribute('active-id')
    if (id === rootId) return;

    this.updateActiveImage({img, id })

    Array.from(imagesArray).forEach((item: HTMLImageElement) => {
      if (item.classList.contains('active')) {
        item.classList.remove('active')
      }
    })
    currentImage.classList.add('active')
  }

  private updateActiveImage({img, id}) {
   const activeImage = Array.from(this.activeImageRoot.children)[0]
   activeImage.setAttribute('src', `${img}`)
   this.activeImageRoot.setAttribute('active-id', `${id}`)
  }

  private  setActiveImage({ img, id } ) {
     const imgActive = document.createElement('img')
     imgActive.setAttribute('src', `${img}`)  
     imgActive.setAttribute('alt', 'active img')  
     imgActive.setAttribute('class', 'swiper-active-img')
     this.activeImageRoot.insertAdjacentElement('beforeend', imgActive)
     this.activeImageRoot.setAttribute('active-id', `${id}`)
  }
  


  private insertImagesList() {
    if (!this.images) return;
    if (this.images.length === 1) return;

    this.images.forEach(imgObj => {
      const imgElement = document.createElement('img')
      imgElement.setAttribute('class', 'swiper-list-img')
      imgElement.setAttribute('src', `${imgObj.img}`)
      imgElement.setAttribute('alt', 'swiper image')
      imgElement.setAttribute('id', `${imgObj.id}`)
      if (imgObj.active) {
        imgElement.classList.add('active')  
      }
      this.imageList.insertAdjacentElement('beforeend', imgElement)
    })
  }

   renderImages(images: string[]) {
    this.images = createArrImages(images)
  }
  
  connectedCallback() {
    this.render()
  }

}

customElements.define('swiper-main', SwiperMain)