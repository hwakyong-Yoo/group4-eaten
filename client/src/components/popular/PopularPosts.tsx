import { useState } from 'react';
import { Post, defaultPost } from '../post';
import { PostsType } from '../myPage';
import { POSTS_PER_PAGE } from './popularPosts.const';
import './PopularPosts.css';

export const PopularPosts = ({ posts }: { posts: PostsType }) => {
  const [currentPage, setCurrentPage] = useState(1);

  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const nextPage = () => {
    const totalPages = Math.ceil(posts.length / POSTS_PER_PAGE);
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const startIdx = currentPage * POSTS_PER_PAGE;
  const endIdx = startIdx + POSTS_PER_PAGE;
  const currentPosts = posts.slice(startIdx, endIdx);

  const postsToDisplay = currentPosts.length === 0 ? [defaultPost] : currentPosts;

  return (
    <div className="post-slider">
      <button id="left-button" onClick={prevPage} />
      <div className={`post-list ${currentPage > 0 ? 'slide-left' : ''}`}>
        {postsToDisplay.map(post => (
          <Post key={post.id} post={post} />
        ))}
      </div>
      <button id="right-button" onClick={nextPage}/>
    </div>
  );
};
