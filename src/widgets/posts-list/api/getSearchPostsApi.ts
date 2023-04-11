import baseApi from "../../../app/api/baseApi";

const getCategoryPosts = (url: string) => {
  return baseApi.get(url, {});
};

export { getCategoryPosts };
