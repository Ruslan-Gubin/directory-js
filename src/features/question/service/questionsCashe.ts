

const questionCashe = new Map()

const setQuestionsCashe = (category: string, questions: any) => {
  questionCashe.set(category, questions)
}

const getQuestionsCashe = (category: string): {title: string, text: string, _id: string}[] => {
return questionCashe.get(category)
}


export { questionCashe, getQuestionsCashe, setQuestionsCashe }