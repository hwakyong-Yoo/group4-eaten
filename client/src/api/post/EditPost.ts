import axios from 'axios';

interface UpdatePostData {
  userId: string;
  content: string;
  imagePath: string;
}

export const EditPost = async (
  postId: string,
  data: UpdatePostData,
): Promise<{ msg: string; statusCode: number }> => {
  try {
    // 서버로 요청을 보내서 게시글 수정 시도
    const response = await axios.put(`/posts/${postId}`, data);

    // 응답 처리
    const { msg, statusCode } = response.data;
    return { msg, statusCode };
  } catch (error: any) {
    // 요청 실패 시
    if (error.response) {
      // 서버가 응답한 상태 코드 및 메시지 반환
      return { msg: error.response.data.msg, statusCode: error.response.status };
    } else {
      // 서버로 요청할 때 발생한 오류 처리
      console.error('Error updating post:', error);
      throw new Error('Failed to update post');
    }
  }
};
