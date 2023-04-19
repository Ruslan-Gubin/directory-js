import { goTo } from '../../../app/router';
import { removeQuestionApi } from '../../../features/question/api/removeQuestion';
import { getQuestionsCashe, questionCashe } from '../../../features/question/service/questionsCashe';
import styles from '../styles/question-item.css?inline';

class QuestionItem extends HTMLElement {
  wrapper: HTMLDivElement
  toggleQuestion: HTMLDivElement
  text: HTMLParagraphElement
  titleText: HTMLParagraphElement
  removeBtn
  selected
  questionId: string

  constructor() {
    super()
    const shadow = this.attachShadow({mode: 'open'})
    const style = document.createElement('style')
    style.insertAdjacentText('afterbegin', styles)
    this.wrapper = document.createElement('div')
    this.wrapper.classList.add('wrapper')

    this.titleText = document.createElement('p')
    this.titleText.classList.add('title')
    this.text = document.createElement('p')
    this.text.classList.add('answer')

    this.removeBtn = document.createElement('main-button')
    this.removeBtn.classList.add('remove-btn')
    this.removeBtn.setAttribute('text', 'remove')
    this.removeBtn.setAttribute('color', 'red')
    this.removeBtn.setAttribute('size', 'small')

    this.selected = document.createElement('main-button')
    this.selected.setAttribute('text', 'selected')
    this.selected.setAttribute('color', 'blue')
    this.selected.setAttribute('size', 'small')


    this.questionId = ''

    this.toggleQuestion = document.createElement('div')
    this.toggleQuestion.classList.add('toggle')
    

    shadow.append(style)
    shadow.append(this.wrapper)
  }

  render() {
    this.wrapper.append(this.titleText)
    const header = document.createElement('div')
    header.classList.add('question-header')
    header.append(this.titleText)
    header.append(this.toggleQuestion)

    header.addEventListener('click', () => {
      this.toggleQuestion.classList.toggle('toggle-active')

 const checkToggle = this.toggleQuestion.getAttribute('class').includes('toggle-active')

      if (checkToggle) {
        this.wrapper.append(this.text)
        this.wrapper.append(this.removeBtn)
        this.wrapper.append(this.selected)
      } else {
        this.text.remove()
        this.removeBtn.remove()
        this.selected.remove()
      }
      
    })

    this.selected.addEventListener('click', () => {
      this.wrapper.classList.toggle('selected')
    })

    this.removeBtn.addEventListener('click', () => {

const confirm = window.confirm()

if (confirm) {
  removeQuestionApi(this.questionId)
  const prevArr = getQuestionsCashe('question')
  questionCashe.set('question', prevArr.filter(item => item._id !== this.questionId))
  goTo('/')
} else {
  return;
}
    })
    
    this.wrapper.append(header)
  }



  static get observedAttributes() {
    return ["question", "answer", "questionid"];
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    switch(name) {
      case 'question': 
      this.titleText.innerHTML = newValue
      break;
      case 'answer': 
      this.text.innerHTML = newValue
      break;
      case 'questionid': 
      this.questionId = newValue
      break;
    }
  }

  connectedCallback() {
    this.render();
  }
}

customElements.define('question-item', QuestionItem)
