package com.example.group4eaten.post.api;

import com.example.group4eaten.post.dto.PostDto;
import com.example.group4eaten.entity.Post;
import com.example.group4eaten.post.service.PostService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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
    public ResponseEntity<PostDto> create(@RequestParam String userId, @RequestBody PostDto dto) {
        PostDto createdDto = postService.create(userId, dto);
        return ResponseEntity.status(HttpStatus.OK).body(createdDto);
    }



}
