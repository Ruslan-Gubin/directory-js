import baseApi from "../../../app/api/baseApi";

const getAllQuestions = (url: string): Promise<{title: string, text: string, _id: string}[]> => {
  return baseApi.get(url, {});
};

export { getAllQuestions };