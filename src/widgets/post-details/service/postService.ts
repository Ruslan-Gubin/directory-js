import { CashResponse } from "../../../app/service/cashResponse";
import { IPost } from "../../../app/types/IPost";
import { getPostById } from "../api/getPostId";


class PostDetailCash extends CashResponse<IPost> {
  constructor() {
    super(new Map())
  }

  async getPostIdCash(id: string) {
    if (this.cash.has(id)) {
      return this.getItemCash(id);
    } else {
      const post = await getPostById(id);
      this.setItemCash(id, post);
      return post;
    }
  };

}

const postCash = new PostDetailCash()

export { postCash }
