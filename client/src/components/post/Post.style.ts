import styled from 'styled-components';
import post from '../../image/post.png';

export const Posts = styled.div`
  background-image: url(${post});
  background-size: 110%;
  background-repeat: no-repeat;
  background-position: center;
  width: 20vw;
  height: 50vh;
  margin: 10px;
`;

export const PostImage = styled.img`
  margin-left: 50px;
  margin-top: 30px;
  width: 77%;
  height: 50%;
  object-fit: cover;
  border: 1px solid black;
  border-radius: 5px;
`;

export const PostContent = styled.div`
  color: black;
  text-decoration: none;
  text-align: center;
  width: 240px;
  margin-left: 42px;
`;

export const PostReaction = styled.div`
  display: flex;
  justify-content: space-around;
  position: absolute;
  padding-left: 50px;
`;

export const Emoji = styled.div`
  cursor: pointer;
  padding-left: 10px;
`;
