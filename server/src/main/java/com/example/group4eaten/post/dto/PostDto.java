package com.example.group4eaten.post.dto;

import com.example.group4eaten.entity.Post;
import com.example.group4eaten.entity.User;
import lombok.*;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
@Builder
public class PostDto {
    private Long postId;
    private String userId;
    private String nickname;
    private String content;
    private String date;
    private String imagepath;
    @Builder.Default
    private Boolean edit_YN = false;
    private MultipartFile imageFile;

    //게시물 조회할 때 사용 - 기존에 저장된 Post 엔티티를 PostDto로 변환
    public static PostDto createPostDto(Post post) {
        return PostDto.builder()
                .postId(post.getPostId())
                .userId(post.getUser().getUserId())
                .nickname(post.getUser().getNickname())
                .content(post.getContent())
                .date(post.getDate())
                .imagepath(post.getImagepath())
                .edit_YN(post.getEdit_YN())
                .build();
    }

    //생성자를 통한 게시물 생성 - 객체를 생성하면서 필요한 필드만 선택적으로 초기화
    @Builder
    public PostDto(String userId, String nickname, String content, String date, String imagepath, Boolean edit_YN) {
        this.userId = userId;
        this.nickname = nickname;
        this.content = content;
        this.date = date;
        this.imagepath = imagepath;
        this.edit_YN = edit_YN;
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

    //현재 시간을 "yyyy-MM-dd HH:mm" 형식으로 반환
    public static String getCurrentFormattedDate() {
        return LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm"));
    }
}
