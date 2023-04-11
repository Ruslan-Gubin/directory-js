import { IbodyOptions } from "../../addImagesForm/types/IbodyOptions"
import baseApi from '../../../app/api/baseApi';

const createPostApi = (options: IbodyOptions) => {
return baseApi.post(`/post`,  options)
}

export { createPostApi }