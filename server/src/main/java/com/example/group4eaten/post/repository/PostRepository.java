package com.example.group4eaten.post.repository;

import com.example.group4eaten.entity.Post;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;


public interface PostRepository extends JpaRepository<Post, Long> {
    @Query(value = "SELECT p.*, " +
            "CASE WHEN u.nickname IS NULL THEN '탈퇴한 회원' ELSE u.nickname END AS nickname " + // 사용자(User) 테이블에서 아이디가 NULL이면 '탈퇴한 회원', 아니면 닉네임을 선택
            "FROM tb_post p " +
            "LEFT JOIN tb_user u ON p.user_id = u.user_id " + // 게시물의 작성자와 사용자(User) 테이블을 아이디를 기준으로 LEFT JOIN
            "WHERE p.user_id = :userId", nativeQuery = true)
    List<Post> findByUserId(@Param("userId") String userId);

    @Query(value = "SELECT p.* FROM tb_like l " +
            "JOIN tb_post p ON l.post_id = p.post_id " +
            "GROUP BY p.post_id " +  // 게시물을 그룹화하여 각 게시물별로 like_id의 개수를 계산
            "ORDER BY COUNT(l.like_id) DESC LIMIT 9", nativeQuery = true)
    List<Post> findTopPosts();

    Page<Post> findAll(Pageable pageable);
}
