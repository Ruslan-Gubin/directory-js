import { goTo } from '../../../app/router';
import { createQuestionApi } from '../api/createdQuestion';
import { getAllQuestions } from '../api/getAllQuestion';
import { getQuestionsCashe, setQuestionsCashe } from '../service/questionsCashe';
import styles from '../style/question.css?inline';


class QuestionList extends HTMLElement {
  wrapper: HTMLDivElement
  category
  modal
  about

  constructor() {
    super()
    const shadow = this.attachShadow({mode: 'open'})
    const style = document.createElement('style')
    style.innerHTML = styles
    const wrapper = document.createElement('div')
    wrapper.classList.add('wrapper')

    this.about = document.createElement('about-home')
    this.modal = null

    shadow.append(style)
    shadow.append(wrapper)
  }

 async render() {
    const wrapper = this.shadowRoot.querySelector('.wrapper')

    const buttonAddQuestion = document.createElement('main-button')
    buttonAddQuestion.setAttribute('text', 'Add question')
    buttonAddQuestion.setAttribute('color', 'blue')
    buttonAddQuestion.addEventListener('click', () => this.addQuestion(wrapper))
    
    const headerContainer = document.createElement('div')
    headerContainer.classList.add('header-container')


    if (!getQuestionsCashe('question')) {
      const questionsRequest = await getAllQuestions('/question')

      if (!questionsRequest) {
        wrapper.append(this.about)

      } else {
        this.about.remove()
      }

      setQuestionsCashe('question', questionsRequest)
    } 

      
      
    
    headerContainer.append(buttonAddQuestion)
    
    
    wrapper.append(headerContainer)
    
      getQuestionsCashe('question').forEach(item => {
        const question = document.createElement('question-item')
        question.setAttribute('question', `${item.title}`)
        question.setAttribute('answer', `${item.text}`)
        question.setAttribute('questionid', `${item._id}`)

        wrapper.append(question)
      })

      
    
  }

  async addQuestion(wrapper: Element) {
    if (this.modal) {
      this.modal.remove()
  this.modal = null
} else {
  this.modal = document.createElement('modal-question')
  wrapper.insertAdjacentElement('afterbegin', this.modal)
  const btnCreated =  this.modal.shadowRoot.querySelector('.send-question')
   btnCreated.addEventListener('click', async ()=> {
    
    const titleShadow = this.modal.shadowRoot.querySelector('.created-title')
    const textShadow = this.modal.shadowRoot.querySelector('.created-text')
    const title = titleShadow.shadowRoot.querySelector('input').value
    const text = textShadow.shadowRoot.querySelector('input').value
    
    if (title.length && text.length) {
     
 await createQuestionApi({title, text})
    .then((data: {title: string,text: string, _id:string}) => {
      const prevCash = getQuestionsCashe('question')
      prevCash.unshift({title: data.title, text: data.text, _id: data._id})
      setQuestionsCashe('question', prevCash)
      goTo('/')
    })
    .catch(error => console.log(error))

    } else {
      return
    }

   })
}
  
  }


  static get observedAttributes() {
    return ["id"];
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    switch(name) {
      case 'id': 

      break;
    }
  }

  connectedCallback() {
    this.render();
  }
}

customElements.define('question-list', QuestionList)