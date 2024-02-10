// PostList.jsx
import React from 'react'
import Post, {PostType} from './Post'

export type PostsType = PostType[]

const PostList = ({posts}: {posts: PostsType}) => {
  return (
    <div className="post-list">
      {posts && posts.map(post => <Post key={post.id} post={post} />)}
    </div>
  )
}

export default PostList
