import { goTo } from "../../../app/router"
import { IPost } from "../../../app/types/IPost"
import { postCash } from "../../../widgets/post-details/service/postService"
import { addOnePostCash } from "../../../widgets/posts-list/service/posts"
import { IbodyOptions } from "../../addImagesForm/types/IbodyOptions"
import { createPostApi } from "../api/createPostApi"
import { updatePost } from "../api/updatePost"


class ReqWorkPost {

 async setUpdatePost(options: IbodyOptions) {

    updatePost(options)
    .then((post:  IPost) => {
      postCash.changeKeyCash(post._id, post)
      goTo(`/post/${post._id}`)
    })
    .catch(error => {
      console.log(error)
    })

  }

async  setCreatePost(options: IbodyOptions) {

      await createPostApi(options)
      .then((data: IPost) => {
        if (data) {
          addOnePostCash(data.category)
          goTo(`/post/${data._id}`)
        }
      })
      .catch((error) => {
        console.log(error)
      });
      
  }

}

export const reqWorkPost = new ReqWorkPost()