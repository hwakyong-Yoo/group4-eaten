import styled from 'styled-components';
import left from '../../image/left.png';
import right from '../../image/right.png';

export const PostSlider = styled.div`
  position: relative;
  overflow: hidden;
  height: 500px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
`;

export const Button = styled.button`
  display: inline-block;
  width: 10vw;
  height: 10vw;
  margin-top: 17vh;
  background-color: rgba(255, 178, 14, 0);
  background-size: contain;
  background-repeat: no-repeat;
  cursor: pointer;
  border: none;
`;

export const LeftButton = styled(Button)`
  background-image: url(${left});
`;

export const RightButton = styled(Button)`
  background-image: url(${right});
`;

export const PostList = styled.div`
  display: flex;
  transition: transform 0.5s ease;

  flex-wrap: wrap;
  justify-content: space-around;
`;
