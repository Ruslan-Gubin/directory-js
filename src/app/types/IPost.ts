interface IPost {
  category: string;
  createdAt: string;
  image: { public_id: string; url: string }[];
  text: string;
  title: string;
  updatedAt: string;
  viewsCount: number;
  __v: number;
  _id: string;
}

export type { IPost };
