// Post.jsx
import React from "react";
import internal from "stream";

export type PostType = {
  id: number;
  imageURL: string;
  text: string;
  // 추가적으로 필요한 속성들을 정의

  heart?: number;
  hungry?: number;
  wow?: number;
  good?: number;
  fire?: number;
};

const Post = ({ post }: { post: PostType }) => {
  return (
    <div className="post" key={post.id}>
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
    </div>
  );
};

export default Post;
