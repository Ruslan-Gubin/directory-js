import { IbodyOptions } from "../../../addImagesForm/types/IbodyOptions";

const validCreatedPost = (options: IbodyOptions) => {
  if (options.category === '') return false;
  if (options.title.length < 3) return false;
  if (options.text.length < 3) return false;
  if (!options.images.length) return false;
  return true
}

export { validCreatedPost }