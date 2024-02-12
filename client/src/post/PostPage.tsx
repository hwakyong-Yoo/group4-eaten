import {useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import {PostType} from './Post'

const PostPage = () => {
  const {postId} = useParams<{postId: string}>()
  const [post, setPost] = useState<PostType | null>(null)

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(`/api/posts/${postId}`)
        if (!response.ok) {
          throw new Error('Failed to fetch post')
        }
        const postData = await response.json()
        setPost(postData)
      } catch (error) {
        console.error('Error fetching post:', error)
      }
    }

    fetchPost()
  }, [postId])

  if (!post) {
    return <div>Loading...</div>
  }

  return (
    <div className="post-page">
      <h1>Post Details</h1>
      <div className="post">
        <div className="post-image">
          <img src={post.imageURL} alt="게시물 이미지" />
        </div>
        <div className="post-content">
          <p>{post.text}</p>
        </div>
        <div className="post-metadata">
          <p>작성자: {post.nickname}</p>
          <p>작성일: {post.date}</p>
          <p>좋아요 수: {post.heart}</p>
        </div>
      </div>
    </div>
  )
}

export default PostPage
