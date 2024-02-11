import React, {useState} from 'react'
import Post, {PostType, defaultPost} from './Post'
import {PostsType} from './PostList'
import './PopularPost.css'

const PostsPerPage = 3 // 페이지당 표시할 게시물 수

const PopularPosts = ({posts}: {posts: PostsType}) => {
  const [currentPage, setCurrentPage] = useState(0)

  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1)
    }
  }

  const nextPage = () => {
    const totalPages = Math.ceil(posts.length / PostsPerPage)
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1)
    }
  }

  const startIdx = currentPage * PostsPerPage
  const endIdx = startIdx + PostsPerPage
  const currentPosts = posts.slice(startIdx, endIdx)

  const postsToDisplay = currentPosts.length === 0 ? [defaultPost] : currentPosts

  return (
    <div className="post-slider">
      <button id="left-button" onClick={prevPage}></button>
      <div className={`post-list ${currentPage > 0 ? 'slide-left' : ''}`}>
        {postsToDisplay.map(post => (
          <Post key={post.id} post={post} />
        ))}
      </div>

      <button id="right-button" onClick={nextPage}>
        {'>'}
      </button>
    </div>
  )
}

export default PopularPosts
