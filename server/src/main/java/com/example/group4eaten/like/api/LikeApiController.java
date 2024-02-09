package com.example.group4eaten.like.api;

import com.example.group4eaten.like.service.LikeService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
public class LikeApiController {

    @Autowired
    LikeService likeService;
    @PostMapping("/like/{postId}")
    public ResponseEntity<String> likePost(@RequestHeader(name= "userId",required = false) String userId, @RequestHeader("postId") Long postId) {
        // 세션 값이 없으면 좋아요를 누를 수 없음
        if (userId == null || userId.isEmpty()) {
            return new ResponseEntity<>("Session not found. Unable to like the post.", HttpStatus.UNAUTHORIZED);
        }

        // userId와 postId를 사용하여 좋아요 토글
        likeService.toggleLike(userId, postId);

        // 성공적으로 좋아요가 토글되었을 경우
        return new ResponseEntity<>("Post liked successfully.", HttpStatus.OK);
    }

    @DeleteMapping("/like/{postId}") //좋아요 취소
    public ResponseEntity<String> unlikePost(@RequestHeader(name= "userId",required = false) String userId, @RequestHeader("postId") Long postId) {
        // 세션 값이 없으면 좋아요를 취소할 수 없음
        if (userId == null || userId.isEmpty() || !likeService.isLiked(userId, postId)) {
            return new ResponseEntity<>("Session not found. Unable to like the post.", HttpStatus.UNAUTHORIZED);
        }
        // userId와 postId를 사용하여 좋아요 취소
        likeService.unlikePost(userId, postId);

        // 성공적으로 좋아요가 취소되었을 경우
        return new ResponseEntity<>("Post unliked successfully.", HttpStatus.OK);
    }

}
