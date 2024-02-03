package com.example.group4eaten.post.dto;

import com.example.group4eaten.entity.Post;
import com.example.group4eaten.entity.User; // User 엔터티 임포트
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.time.LocalDate;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@ToString
public class PostDto {
    private Long postId;
    private String userId;
    private String content;
    private LocalDate date;
    private String imagepath;
    private String edit_YN;

    public static PostDto createPostDto(Post post) {
        return new PostDto(
                post.getPostId(),
                post.getUser().getUserId(),
                post.getContent(),
                post.getDate(),
                post.getImagepath(),
                post.getEdit_YN()
        );
    }

    public Post toEntity(User user) {
        return new Post(postId, user, content, date, imagepath, edit_YN);
    }
}
