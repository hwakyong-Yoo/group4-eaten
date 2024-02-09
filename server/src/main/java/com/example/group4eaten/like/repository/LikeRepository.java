package com.example.group4eaten.like.repository;

import com.example.group4eaten.entity.Like;
import com.example.group4eaten.entity.LikePK;
import com.example.group4eaten.entity.Post;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LikeRepository extends JpaRepository<Like, LikePK> {
}
