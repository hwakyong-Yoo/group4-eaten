import React from "react";
import MyPostList from "./MyPostList";
import { useNavigate } from "react-router-dom";
import Footer from "./Footer";

const MyPosts = [
  {
    id: 1,
    imageURL: "https://placekitten.com/203/203",
    text: "내 게시물 1",
  },
  {
    id: 2,
    imageURL: "https://placekitten.com/204/204",
    text: "내 게시물 2",
  },
  {
    id: 3,
    imageURL: "https://placekitten.com/205/205",
    text: "내 게시물 3",
  },
  {
    id: 4,
    imageURL: "https://placekitten.com/206/206",
    text: "내 게시물 4",
  },
  {
    id: 5,
    imageURL: "https://placekitten.com/203/203",
    text: "내 게시물 5",
  },
  {
    id: 6,
    imageURL: "https://placekitten.com/204/204",
    text: "내 게시물 6",
  },
  {
    id: 7,
    imageURL: "https://placekitten.com/205/205",
    text: "내 게시물 7",
  },
  {
    id: 8,
    imageURL: "https://placekitten.com/206/206",
    text: "내 게시물 8",
  },
  // ... 더 많은 내 게시물 데이터
];

const MyPage = () => {
  const navigate = useNavigate();
  return (
    <div className="mypage">
      <h1>My Page</h1>
      <MyPostList posts={MyPosts} />
      <Footer />
    </div>
  );
};

export default MyPage;
