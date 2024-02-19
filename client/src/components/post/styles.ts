import styled from 'styled-components';

export const Posts = styled.div`
  width: 19vw;
  height: 50vh;
  border: 1px solid black;
  border-radius: 10px;
  margin: 10px;
  overflow: hidden;
  background-color: white;
`;

export const PostImage = styled.img`
  margin-left: 2vw;
  margin-top: 2vh;
  width: 80%;
  height: auto;
  object-fit: cover;
  border: 1px solid black;
  border-radius: 5px;
`;

export const PostContent = styled.div`
  color: black;
  text-decoration: none;
  padding: 10px;
  text-align: center;
`;

export const PostReaction = styled.div`
  display: flex;
  justify-content: space-around;
  padding: 10px;
  background-color: #f2f2f2;
  color: black;
`;

export const Emoji = styled.div`
  cursor: pointer;
`;
