import axios from 'axios';

interface DeletePostResponse {
  msg: string;
  statusCode: number;
}

export const deletePost = async (
  postId: string,
  userId: string,
): Promise<DeletePostResponse> => {
  try {
    const response = await axios.delete(`/posts/${postId}`, {
      data: { userId }, // userId를 요청 본문에 포함하여 전송합니다.
    });

    return response.data; // 서버로부터 받은 응답을 반환합니다.
  } catch (error: any) {
    if (error.response) {
      // 서버로부터의 응답이 있는 경우
      return error.response.data; // 에러 응답을 반환합니다.
    } else {
      // 서버로의 요청이 실패한 경우
      console.error('Failed to send DELETE request:', error);
      throw new Error('Failed to send DELETE request');
    }
  }
};
