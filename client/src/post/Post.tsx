// Post.tsx
import React from 'react'
import {Link} from 'react-router-dom'
import internal from 'stream'

export type PostType = {
  id: number
  imageURL: string
  text: string
  userId?: string
  date?: string

  heart?: number
  hungry?: number
  wow?: number
  good?: number
  fire?: number
}

const Post = ({post}: {post: PostType}) => {
  return (
    <div className="post" key={post.id}>
      <Link to={`/post/${post.id}`} style={{textDecoration: 'none', color: 'inherit'}}>
        <div className="post-image">
          <img src={post.imageURL} alt="게시물 이미지" />
        </div>
        <div className="post-content">
          <p>{post.text}</p>
        </div>
        <div className="post-reactions">
          <div className="reaction">❤️{post.heart}</div>
          <div className="reaction">🤤{post.hungry}</div>
          <div className="reaction">😲{post.wow}</div>
          <div className="reaction">👍{post.good}</div>
          <div className="reaction">🔥{post.fire}</div>
        </div>
      </Link>
    </div>
  )
}

export default Post
