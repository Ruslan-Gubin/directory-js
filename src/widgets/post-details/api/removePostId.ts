import baseApi from "../../../app/api/baseApi";

const removePostId = (options: {id: string, images: string[]}) => {
  return baseApi.delete(`/post/${options.id}`, {options})
}

export { removePostId }