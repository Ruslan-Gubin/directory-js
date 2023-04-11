import { IPost } from "../../../app/types/IPost";
import { getPostById } from "../api/getPostId";

const postsDetailsCash = new Map();

const setPostCash = (id: string, data: IPost) => {
  postsDetailsCash.set(id, data);
};

const getPostCash = (id: string) => {
  return postsDetailsCash.get(id);
};

const getPostIdCash = async (id: string) => {
  if (postsDetailsCash.has(id)) {
    return getPostCash(id);
  } else {
    const post = await getPostById(id);
    setPostCash(id, post);
    return post;
  }
};

export { getPostIdCash };
