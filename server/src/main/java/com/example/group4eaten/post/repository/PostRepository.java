package com.example.group4eaten.post.repository;

import com.example.group4eaten.entity.Post;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.ArrayList;
import java.util.List;

public interface PostRepository extends JpaRepository<Post, Long> {
    @Query(value = "SELECT *FROM post WHERE userId = :userId", nativeQuery = true)
    List<Post> findByUserId(String userId);
}
