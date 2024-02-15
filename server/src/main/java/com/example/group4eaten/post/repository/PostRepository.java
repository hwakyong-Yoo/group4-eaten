package com.example.group4eaten.post.repository;

import com.example.group4eaten.entity.Post;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import java.util.List;


public interface PostRepository extends JpaRepository<Post, Long> {
    @Query(value = "SELECT *FROM post WHERE userId = :userId", nativeQuery = true)
    List<Post> findByUserId(String userId);

    @Query(value = "SELECT p.* FROM tb_like l " +
            "JOIN tb_post p ON l.post_id = p.post_id " +
            "GROUP BY p.post_id " +  // 게시물을 그룹화하여 각 게시물별로 like_id의 개수를 계산
            "ORDER BY COUNT(l.like_id) DESC LIMIT 9", nativeQuery = true)
    List<Post> findTopPosts();

}
