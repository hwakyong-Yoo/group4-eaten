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
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.List;
import java.util.stream.Collectors;
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

// 전체 게시물 조회 (페이징 처리)
    public Map<String, Object> getAllPosts(Pageable pageable) {
        Sort sort = Sort.by(Sort.Direction.DESC, "postId");
        Pageable pageableWithSort = PageRequest.of(pageable.getPageNumber(), pageable.getPageSize(), sort);
        Page<Post> postPage = postRepository.findAll(pageableWithSort);
        List<Map<String, Object>> postList = postPage.getContent().stream()
                .map(post -> {
                    Map<String, Object> postMap = new HashMap<>();
                    postMap.put("postId", post.getPostId());
                    //nickname이 null이면 "탈퇴함"으로 설정
                    String nickname = post.getUser() != null ? post.getUser().getNickname() : "탈퇴함";
                    postMap.put("nickname", nickname);
                    postMap.put("content", post.getContent());
                    postMap.put("date", post.getDate());
                    postMap.put("imagepath", post.getImagepath());
                    postMap.put("edit_YN", post.getEdit_YN());
                    return postMap;
                })
                .collect(Collectors.toList());

        Map<String, Object> result = new HashMap<>();
        result.put("pagenum", postPage.getNumber() + 1);
        result.put("posts", postList);
        result.put("totalPages", postPage.getTotalPages());
        result.put("totalPosts", postPage.getTotalElements());
        result.put("numberOfPostsInThisPage", postPage.getNumberOfElements());

        return result;
    }

    //상세 페이지 조회
    public Map<String, Object> getPostDetails(Long postId) {
        Post post = postRepository.findById(postId).orElse(null);
        if (post != null) {
            String nickname;
            if (post.getUser() != null) {
                nickname = post.getUser().getNickname();
            } else {
                // userId가 null이면 "탈퇴함"으로 설정
                nickname = "탈퇴함";
            }

            // Post 엔티티를 Map<String, Object>로 변환
            return Map.of(
                    "postId", post.getPostId(),
                    "nickname", nickname,
                    "content", post.getContent(),
                    "date", post.getDate(),
                    "imagepath", post.getImagepath(),
                    "edit_YN", post.getEdit_YN()
            );
        } else {
            return null;
        }
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

//내 페이지 조회 (내가 작성한 게시물 조회가능)
public List<PostDto> getMyPosts(String userId) {
    // userId를 이용하여 유저 정보를 확인
    User user = userRepository.findById(userId)
            .orElseThrow(() -> new IllegalArgumentException("해당 유저를 찾을 수 없습니다. userId: " + userId));

    // 현재 사용자가 작성한 게시물 목록 조회
    List<Post> myPosts = postRepository.findByUserId(userId);

    // Post 엔티티를 PostDto로 변환
    return myPosts.stream()
            .map(post -> PostDto.builder()
                    .postId(post.getPostId())
                    .nickname(user.getNickname())  // userId 대신 nickname 사용
                    .content(post.getContent())
                    .date(post.getDate())
                    .imagepath(post.getImagepath())
                    .edit_YN(post.getEdit_YN())
                    .build())
            .collect(Collectors.toList());
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
    // 인기 게시물 조회
    public List<Map<String, Object>> getTopPostsByLikeCounts() {
        List<Post> topPosts = postRepository.findTopPosts();

        // Post 엔티티를 Map<String, Object>로 변환
        return topPosts.stream()
                .map(post -> {
                    Map<String, Object> postMap = new HashMap<>();
                    postMap.put("postId", post.getPostId());
                    postMap.put("nickname", post.getUser() != null ? post.getUser().getNickname() : "탈퇴함");  // userId 대신 nickname 사용
                    postMap.put("content", post.getContent());
                    postMap.put("date", post.getDate());
                    postMap.put("imagepath", post.getImagepath());
                    postMap.put("edit_YN", post.getEdit_YN());
                    return postMap;
                })
                .collect(Collectors.toList());
    }

    public void updatePostsAfterUserDeletion(String userId) {
        List<Post> posts = postRepository.findByUserId(userId);

        for (Post post : posts) {
            post.setUser(null);
            postRepository.save(post);
        }
    }
}


