export interface userPostsInterface {
  message: string
  paginationInfo: PaginationInfo
  posts: PostInterface[]
}

export interface PaginationInfo {
  currentPage: number
  numberOfPages: number
  limit: number
  total: number
}

export interface PostInterface {
  _id: string
  image?: string
  user: User
  createdAt: string
  comments: Comment[]
  id: string
  body?: string
}

export interface User {
  _id: string
  name: string
  photo: string
}

export interface Comment {
  _id: string
  content: string
  commentCreator: CommentCreator
  post: string
  createdAt: string
}

export interface CommentCreator {
  _id: string
  name: string
  photo: string
}
