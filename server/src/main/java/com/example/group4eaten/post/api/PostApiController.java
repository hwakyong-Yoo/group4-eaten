package com.example.group4eaten.post.api;

import com.example.group4eaten.post.dto.PostDto;
import com.example.group4eaten.entity.Post;
import com.example.group4eaten.post.service.PostService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Slf4j
@RestController
public class PostApiController {
    @Autowired
    private PostService postService;

    //전체 게시물 조회
    @GetMapping("/posts")
    public List<Post> index(){
        return postService.index();
    }

    //상세 페이지 조회
    @GetMapping("/posts/{postId}")
    public Post show(@PathVariable Long postId){
        return postService.show(postId);
    }


    //새 게시물 작성
    @PostMapping("/posts")
    public ResponseEntity<PostDto> create(@RequestBody PostDto dto) {
        //dto의 postId 값 검증
        if (dto.getPostId() != null)
            throw new IllegalArgumentException("포스트 생성 실패! 포스트 아이디는 null이어야 합니다!");
        dto.setDate(PostDto.getCurrentFormattedDate());
        PostDto createdDto = postService.create(dto);
        return ResponseEntity.status(HttpStatus.OK).body(createdDto);
    }


    //게시물 수정
    @PutMapping("/posts/{postId}")
    public ResponseEntity<PostDto> update(@PathVariable Long postId, @RequestBody PostDto dto){
        PostDto updatedDto = postService.update(postId, dto);
        return ResponseEntity.status(HttpStatus.OK).body(updatedDto);
    }


    //게시물 삭제
    @DeleteMapping("/posts/{postId}")
    public ResponseEntity<PostDto> delete(@PathVariable Long postId){
        PostDto deletedDto = postService.delete(postId);
        return ResponseEntity.status(HttpStatus.OK).body(deletedDto);
    }

    //게시물에 눌린 좋아요 수 확인
    @GetMapping("/posts/like/{postId}")
    public ResponseEntity<Map<String, Object>> getLikesForPost(@PathVariable Long postId) {
        try {
            Map<Integer, Integer> likeCounts = postService.fetchLikeCounts(postId);

            Map<String, Object> response = new HashMap<>();
            response.put("likeCounts", likeCounts);
            response.put("msg", "좋아요 수 확인");
            response.put("statusCode", 200);

            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (Exception e) {
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("error", "좋아요 수 확인 불가");
            errorResponse.put("statusCode", 500);
            return new ResponseEntity<>(errorResponse, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    //인기 게시물 조회
    @GetMapping("/hot-posts")
    public ResponseEntity<Map<String, Object>> getHotPosts() {
        try {
            List<Post> topPosts = postService.getTopPostsByLikeCounts();
            Map<String, Object> response = new HashMap<>();
            response.put("posts", topPosts);
            response.put("msg", "인기 게시물 조회");
            response.put("statusCode", 200);
            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (Exception e) {
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("error", "인기 게시물 조회 실패");
            errorResponse.put("statusCode", 400);
            return new ResponseEntity<>(errorResponse, HttpStatus.UNAUTHORIZED);
        }
    }


}
