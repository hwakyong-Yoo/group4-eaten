import { useState, useEffect } from 'react';
import { Post, defaultPost } from '../post';
import { PostType } from '../post';
import { PostsType } from '../myPage';
import { POSTS_PER_PAGE } from './popularPosts.const';
import { PostSlider, LeftButton, RightButton, PostList } from './styles';
import { HotPosts } from '../../api/post/popular';

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

  const [hotPosts, setHotPosts] = useState<PostType[]>([]);

  useEffect(() => {
    const getHotPosts = async () => {
      const posts = await HotPosts();
      setHotPosts(posts);
    };
    getHotPosts();
  }, []);

  const startIdx = currentPage * POSTS_PER_PAGE;
  const endIdx = startIdx + POSTS_PER_PAGE;
  const currentPosts = posts.slice(startIdx, endIdx);

  const postsToDisplay = currentPosts.length === 0 ? [defaultPost] : currentPosts;

  return (
    <PostSlider>
      <LeftButton onClick={prevPage} />
      <PostList>
        {postsToDisplay.map(post => (
          <Post key={post.id} post={post} />
        ))}
        {/* {hotPosts.map(post => (
          <Post key={post.id} post={post} />
        ))} */}
      </PostList>
      <RightButton onClick={nextPage} />
    </PostSlider>
  );
};
