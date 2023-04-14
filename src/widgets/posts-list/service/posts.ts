import { IPost } from "../../../app/types/IPost"

const postsCategory = new Map()

const setPostCash = (category: string, data: IPost[]) => {
  postsCategory.set(category, data)
}

const getPostCash = (url: string) => {
  return postsCategory.get(url)
}

const findAndDeletePostId = (postId: string) => {

for (const [key, value] of Object.assign(postsCategory)) {
  value.forEach((item: IPost) => {
    if (item._id === postId) {
      postsCategory.set(key, value.filter((item: IPost) => item._id !== postId))
    }
  })
}

}

const addOnePostCash = (category: string) => {
  for (const [key, value] of Object.assign(postsCategory)) {
    if (key.match(category)) {
      postsCategory.delete(key)
    }
  }
}


export {
  setPostCash,
  postsCategory,
  getPostCash,
  findAndDeletePostId,
  addOnePostCash,
}