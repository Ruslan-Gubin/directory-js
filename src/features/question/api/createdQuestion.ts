import baseApi from "../../../app/api/baseApi"

interface IBodyQuestions {
  title: string
  text: string
}

const createQuestionApi = (options: IBodyQuestions) => {
return baseApi.post(`/question`,  options)
}

export { createQuestionApi }