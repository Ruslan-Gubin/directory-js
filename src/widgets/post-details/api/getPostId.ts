import baseApi from "../../../app/api/baseApi"
import { IPost } from "../../../app/types/IPost"

const getPostById = (postId: string): Promise<IPost> => {
  return baseApi.get(`/post/${postId}`, {})
}

export { getPostById }