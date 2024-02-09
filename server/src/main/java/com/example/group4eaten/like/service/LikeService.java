package com.example.group4eaten.like.service;

import com.example.group4eaten.entity.Like;
import com.example.group4eaten.entity.LikePK;
import com.example.group4eaten.like.repository.LikeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class LikeService {
    @Autowired
    private LikeRepository likeRepository;

    // 좋아요 추가 또는 삭제 로직
    public void toggleLike(String userId, Long postId) {
        LikePK likePK = new LikePK(userId, postId);
        Optional<Like> existingLike = likeRepository.findById(likePK);

        if (existingLike.isPresent()) {
            // 이미 좋아요를 눌렀다면 삭제
            likeRepository.deleteById(likePK);
        } else {
            // 좋아요 추가
            Like newLike = new Like();
            newLike.setLikePK(likePK);
            likeRepository.save(newLike);
        }
    }
    //좋아요 취소
    public void unlikePost(String userId, Long postId) {
        LikePK likePK = new LikePK(userId, postId);
        likeRepository.deleteById(likePK);
    }

    public boolean isLiked(String userId, Long postId) {
        // 특정 사용자가 특정 게시물에 대해 좋아요를 눌렀는지 여부를 확인
        return likeRepository.existsById(new LikePK(userId, postId));
    }
}
