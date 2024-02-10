// PopularPosts.jsx
import React from 'react'
import Post, {PostType} from './Post'
import {PostsType} from './PostList'

const PopularPosts = ({posts}: {posts: PostsType}) => {
  return (
    <div className="post-list">
      {posts && posts.map(post => <Post key={post.id} post={post} />)}
    </div>
  )
}

export default PopularPosts
