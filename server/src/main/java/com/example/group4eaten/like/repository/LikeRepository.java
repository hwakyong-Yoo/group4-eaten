package com.example.group4eaten.like.repository;

import com.example.group4eaten.entity.Like;
import com.example.group4eaten.entity.LikePK;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface LikeRepository extends JpaRepository<Like, LikePK> {
    List<Like> findByLikePKPostId(Long postId);

}
