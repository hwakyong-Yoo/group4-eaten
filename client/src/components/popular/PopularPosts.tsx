import { useState, useEffect } from 'react';
import { Post } from '../post';
import { PostType } from '../post';
import { POSTS_PER_PAGE } from './popularPosts.const';
import { PostSlider, LeftButton, RightButton, PostList } from './Popular.style';
import { fetchHotPosts } from '../../api/declaration';
import { defaultPost } from '../post';

interface PopularPostsProps {
  posts: PostType[];
}

export const PopularPosts = ({ posts }: PopularPostsProps) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [hotPosts, setHotPosts] = useState<PostType[]>([]);

  useEffect(() => {
    const getHotPosts = async () => {
      const hotPosts = await fetchHotPosts();
      setHotPosts(hotPosts);
    };
    getHotPosts();
  }, []);

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
    <PostSlider>
      <LeftButton onClick={prevPage} />
      <PostList>
        {hotPosts &&
          hotPosts.length > 0 &&
          hotPosts.map(post => <Post key={post.postId} post={post} />)}
        {postsToDisplay &&
          postsToDisplay.length > 0 &&
          postsToDisplay.map(post => <Post key={post.postId} post={post} />)}
      </PostList>

      <RightButton onClick={nextPage} />
    </PostSlider>
  );
};
