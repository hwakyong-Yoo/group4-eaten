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
  margin-left: 65px;
  margin-top: 30px;
  width: 65%;
  height: auto;
  object-fit: cover;
  border: 1px solid black;
  border-radius: 5px;
`;

export const PostContent = styled.div`
  color: black;
  text-decoration: none;
  text-align: center;
`;

export const PostReaction = styled.div`
  display: flex;
  justify-content: space-around;
  padding: 20px;
`;

export const Emoji = styled.div`
  cursor: pointer;
`;
