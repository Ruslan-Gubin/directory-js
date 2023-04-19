import baseApi from "../../../app/api/baseApi"


const removeQuestionApi = (id: string) => {
return baseApi.delete(`/question`,  {id})
}

export { removeQuestionApi }