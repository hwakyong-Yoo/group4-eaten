package com.example.group4eaten.like.api;

import com.example.group4eaten.like.dto.LikeDto;
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
    public ResponseEntity<String> likePost(@RequestHeader(name= "userId",required = false) String userId,
                                           @RequestBody LikeDto likedto,
                                           @PathVariable Long postId) {
        // 세션 값이 없으면 좋아요를 누를 수 없음
        if (userId == null || userId.isEmpty()) {
            return new ResponseEntity<>("Session not found. Unable to like the post.", HttpStatus.UNAUTHORIZED);
        }

        // userId와 postId, like_id를 사용하여 좋아요
        likeService.setLike(userId, postId, likedto.getLike_id());

        // 성공적으로 좋아요가 추가되었을 경우
        return new ResponseEntity<>("Post liked successfully.", HttpStatus.OK);
    }

    @DeleteMapping("/like/{postId}") // 좋아요 취소
    public ResponseEntity<String> unlikePost(@RequestHeader(name = "userId", required = false) String userId,
                                             @PathVariable Long postId) {
        // 세션 값이 없으면 좋아요를 취소할 수 없음
        if (userId == null || userId.isEmpty() || !likeService.isLiked(userId, postId)) {
            return new ResponseEntity<>("Session not found. Unable to unlike the post.", HttpStatus.UNAUTHORIZED);
        }

        int like_id = likeService.getLikeIdIfLiked(userId, postId);

        // userId와 postId를 사용하여 좋아요 삭제
        likeService.deleteLike(userId, postId, like_id);

        // 성공적으로 좋아요가 취소되었을 경우
        return new ResponseEntity<>("Post unliked successfully.", HttpStatus.OK);
    }

    @PutMapping("/like/{postId}")   //좋아요 수정
    public ResponseEntity<String> updateLike(@RequestHeader(name= "userId",required = false) String userId,
                                             @RequestBody LikeDto likedto,
                                             @PathVariable Long postId) {
        // 세션 값이 없으면 좋아요를 수정할 수 없음
        if (userId == null || userId.isEmpty()) {
            return new ResponseEntity<>("Session not found. Unable to update the like.", HttpStatus.UNAUTHORIZED);
        }

        // userId와 postId, like_id를 사용하여 좋아요 수정
        likeService.updateLike(userId, postId, likedto.getLike_id());

        // 성공적으로 좋아요가 수정되었을 경우
        return new ResponseEntity<>("Like updated successfully.", HttpStatus.OK);
    }

    @GetMapping("/like/{postId}")   //내가 누른 좋아요 확인
    //좋아요를 누른 경우 -> 해당 좋아요의 like_id 반환, 누르지 않은 경우 -> 좋아요 누르지 않았다는 메시지 반환
    public ResponseEntity<String> getMyLike(@RequestHeader(name= "userId", required = false) String userId,
                                            @PathVariable Long postId){
        // 세션 값이 없으면 내가 누른 좋아요를 확인할 수 없음
        if (userId == null || userId.isEmpty()) {
            return new ResponseEntity<>("Session not found. Unable to update the like.", HttpStatus.UNAUTHORIZED);
        }

        Integer pressedLikeId = likeService.getLikeIdIfLiked(userId, postId);

        if(pressedLikeId != null){
            return new ResponseEntity<>("My like for this post: " + pressedLikeId, HttpStatus.OK);
        } else{
            return new ResponseEntity<>("User has not liked this post.", HttpStatus.OK);
        }
    }
}
