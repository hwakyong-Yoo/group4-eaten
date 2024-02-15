package com.example.group4eaten.post.service;

import com.example.group4eaten.entity.Like;
import com.example.group4eaten.like.repository.LikeRepository;
import com.example.group4eaten.post.dto.PostDto;
import com.example.group4eaten.entity.Post;
import com.example.group4eaten.entity.User;
import com.example.group4eaten.post.repository.PostRepository;
import com.example.group4eaten.user.repository.UserRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Slf4j
@Service
public class PostService {
    @Autowired
    private PostRepository postRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private LikeRepository likeRepository;

    //전체 게시물 조회
    public List<Post> index() {
        return postRepository.findAll();
    }

    //상세 페이지 조회
    public Post show(Long postId) {
        return postRepository.findById(postId).orElse(null);
    }

    //게시물 생성
    @Transactional
    public PostDto create(PostDto dto) {
        // 이미지 경로가 null이면 생성 불가
        if (dto.getImagepath() == null) {
            throw new IllegalArgumentException("Post 생성 실패! 이미지 경로는 null일 수 없습니다.");
        }
        User user = userRepository.findById(dto.getUserId())
                .orElseThrow(() -> new IllegalArgumentException("Post 생성 실패! User not found"));
        Post post = Post.createPost(dto, user);
        Post created = postRepository.save(post);
        return PostDto.createPostDto(created);
    }


    //게시물 수정
    @Transactional
    public PostDto update(Long postId, PostDto dto) {
        Post target = postRepository.findById(postId)
                .orElseThrow(() -> new IllegalArgumentException("Post not found!"));

        // PostDto의 변경사항을 Post 엔티티에 적용
        target.applyChanges(dto);

        Post updated = postRepository.save(target);
        return PostDto.createPostDto(updated);
    }


    //게시물 삭제
    @Transactional
    public PostDto delete(Long postId) {
        Post target = postRepository.findById(postId)
                .orElseThrow(() -> new IllegalArgumentException("Post not found!"));
        postRepository.delete(target);
        return PostDto.createPostDto(target);
    }

    //좋아요 수 확인
    public Map<Integer, Integer> fetchLikeCounts(Long postId) {
        List<Like> likes = likeRepository.findByLikePKPostId(postId);

        // Initialize the map with default values
        Map<Integer, Integer> likeCounts = new HashMap<>();
        likeCounts.put(1, 0);
        likeCounts.put(2, 0);
        likeCounts.put(3, 0);
        likeCounts.put(4, 0);
        likeCounts.put(5, 0);

        //좋아요 종류별 개수
        for (Like like : likes) {
            Integer likeType = like.getLike_id();
            likeCounts.put(likeType, likeCounts.get(likeType) + 1);
        }

        return likeCounts;
    }
    public List<Post> getTopPostsByLikeCounts() {
        return postRepository.findTopPosts();
    }
}


