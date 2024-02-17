package com.example.group4eaten.like.service;

import com.example.group4eaten.entity.Like;
import com.example.group4eaten.entity.LikePK;
import com.example.group4eaten.like.repository.LikeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.Optional;

@Service
public class LikeService {
    @Autowired
    private LikeRepository likeRepository;

    // 좋아요 추가
    @Transactional
    public void setLike(String userId, Long postId, int like_id) {
        LikePK likePK = new LikePK(userId, postId);

        // 좋아요 추가
        Like newLike = new Like();
        newLike.setLikePK(likePK);
        newLike.setLikeId(like_id);
        likeRepository.save(newLike);
    }

    //좋아요 취소
    public void deleteLike(String userId, Long postId, int like_id) {
        LikePK likePK = new LikePK(userId, postId);
        Optional<Like> existingLike = likeRepository.findById(likePK);
        //눌렀던 좋아요 누를 시 삭제
        if (existingLike.isPresent() && existingLike.get().getLike_id() == like_id) {
            likeRepository.deleteById(likePK);
        }
    }

    public boolean isLiked(String userId, Long postId) {
        // 특정 사용자가 특정 게시물에 대해 좋아요를 눌렀는지 여부를 확인
        return likeRepository.existsById(new LikePK(userId, postId));
    }

    //좋아요 여부를 확인하고 눌린 좋아요가 없으면 null, 눌린 좋아요가 있으면 눌린 좋아요의 like_id를 반환
    public Integer getLikeIdIfLiked(String userId, Long postId){
        Optional<Like> userLike = likeRepository.findById(new LikePK(userId, postId));
        return userLike.map(Like::getLike_id).orElse(null);
    }

    //좋아요 수정
    public void updateLike(String userId, Long postId, int like_id) {
        LikePK likePK = new LikePK(userId, postId);
        Optional<Like> existingLike = likeRepository.findById(likePK);

        if (existingLike.isPresent()) {
            // 1.이미 좋아요를 눌렀다면 업데이트
            if(existingLike.get().getLike_id() == like_id){
                // 1-1. 같은 like_id인 경우 -> 좋아요 삭제
                likeRepository.delete(existingLike.get());
            } else{
                // 1-2. 다른 like_id인 경우 -> 업데이트
                existingLike.get().setLikeId(like_id);
                likeRepository.save(existingLike.get());
            }
        } else{
            // 2. 좋아요가 없는 경우 -> 새로운 좋아요 추가
            Like newLike = new Like();
            newLike.setLikePK(new LikePK(userId, postId));
            newLike.setLikeId(like_id);
            likeRepository.save(newLike);
        }
    }
}
