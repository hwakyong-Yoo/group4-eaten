package com.example.group4eaten.post.dto;

import com.example.group4eaten.entity.Post;
import com.example.group4eaten.entity.User; // User 엔터티 임포트
import lombok.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
public class PostDto {
    private Long postId;
    private String userId;
    private String content;
    private String date;
    private String imagepath;
    private Boolean edit_YN = false;

    //게시물 조회할 때 사용 - 기존에 저장된 Post 엔티티를 PostDto로 변환
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

    //생성자를 통한 게시물 생성 - 객체를 생성하면서 필요한 필드만 선택적으로 초기화
    @Builder
    public PostDto(String userId, String content, String imagepath) {
        this.userId = userId;
        this.content = content;
        this.date = getCurrentFormattedDate(); // Use the method to set the date
        this.imagepath = imagepath;
    }

    //게시물 수정 - 주어진 파라미터로 객체의 상태를 업데이트
    public void updatePostDto(String userId, String content, String imagepath){
        this.userId = userId;
        this.content = content;
        this.imagepath = imagepath;
    }


    //PostDto를 Post 엔티티로 변환
    public Post toEntity(User user) {
        return new Post(postId, user, content, date, imagepath, edit_YN);
    }

    // 추가된 메서드: 현재 시간을 "yyyy-MM-dd HH:mm" 형식으로 반환
    public static String getCurrentFormattedDate() {
        return LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm"));
    }
}
