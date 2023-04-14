import { IbodyOptions } from "../../addImagesForm/types/IbodyOptions"
import baseApi from "../../../app/api/baseApi"

const updatePost = (options: IbodyOptions) => {
  return baseApi.patch(`/post-update`,  options)
}

export { updatePost }