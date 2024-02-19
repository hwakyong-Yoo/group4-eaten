
import {DetailHeater} from './DetailHeader'
import { DetailPost, DetailPage, Footer, Img, Text } from './styles';


export const Detail = () => {
  // const { postId } = useParams<{ postId: string }>();
  // if (!postId) {
  //   return <div>포스트 ID가 존재하지 않습니다.</div>;
  // }
  // const post = posts.find(post => post.id === parseInt(postId, 10));

  // postId와 일치하는 포스트 찾기

  // const [post, setPost] = useState<PostType | null>(null);

  // useEffect(() => {
  //   const fetchPost = async () => {
  //     try {
  //       const response = await fetch(`/api/posts/${postId}`);
  //       if (!response.ok) {
  //         throw new Error('Failed to fetch post');
  //       }
  //       const postData = await response.json();
  //       setPost(postData);
  //     } catch (error) {
  //       console.error('Error fetching post:', error);
  //     }
  //   };

  //   fetchPost();
  // }, [postId]);

  // if (!post) {
  //   return <div>Loading...</div>;
  // }

  const imgURL = 'https://placekitten.com/204/204';
  const text = '맛있어요 어쩌구 저쩌구';
  const nickname = 'user12345';
  const date = '2024-12-10';

  return (
    <DetailPage>
      <div>
        <DetailHeater />
      </div>
      <DetailPost>
        <div>
          <Img src={imgURL} />
        </div>
        <Text>
          <p>{text}</p>
          <p>{nickname}</p>
          <p>{date}</p>
        </Text>
      </DetailPost>
      <div>
        <Footer />
      </div>
    </DetailPage>
  );
};
