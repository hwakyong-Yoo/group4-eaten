// MyPostList.jsx
import React from 'react'
import Post, {PostType} from '../post/Post'

export type PostsType = PostType[]

const MyPostList = ({posts}: {posts: PostsType}) => {
  return (
    <div className="post-list">
      {posts && posts.map(post => <Post key={post.id} post={post} />)}
    </div>
  )
}

export default MyPostList
