import { IPost } from "../../../app/types/IPost"

const postsCategory = new Map()

const setPostCash = (category: string, data: IPost[]) => {
  postsCategory.set(category, data)
}

const getPostCash = (url: string) => {
  return postsCategory.get(url)
}


export {
  setPostCash,
  postsCategory,
  getPostCash,
}