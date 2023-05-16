export type ArticleDetailType = {
  text: string,
  comments: DetailCommentType[],
  commentsCount: number,
  id: string,
  title: string,
  description: string,
  image: string,
  date: string,
  category: string,
  url: string
}

export type DetailCommentType = {
  id: string,
  text: string
  date: string,
  likesCount: number,
  dislikesCount: number,
  action?:string,
  user: {
    id: string,
    name: string
  },
}
