// TODO: 인시 게시물 9개를 서버에서 받아 옴 /hot-posts
import axios from 'axios';
import { PostType } from '../../components/post';
import { API } from '../api.const';
axios.defaults.withCredentials = true;

// 서버로부터 게시물 데이터를 받아오는 함수
export const fetchHotPosts = async (): Promise<PostType[]> => {
  try {
    axios.defaults.withCredentials = true;
    const response = await axios.get(`/hot-posts`, { withCredentials: true });
    if (response.data.statusCode !== 200) {
      throw new Error(response.data.msg);
    }
    console.log('인기 게시물: ', response.data);
    return response.data.hots;
  } catch (error) {
    //console.error('인기 게시물을 불러오는 데 실패했습니다:', error);
    console.log('인기 게시물 서버 로딩 실패', error);
    return [];
  }
};
