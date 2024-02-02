package com.example.group4eaten.entity;

import com.example.group4eaten.dto.PostDto;
import com.example.group4eaten.entity.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.time.LocalDate; // LocalDate 임포트
import java.time.format.DateTimeFormatter;

@AllArgsConstructor
@NoArgsConstructor
@ToString
@Entity
@Getter
public class Post {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long postId;

    @ManyToOne
    @JoinColumn(name = "userId") // 외래 키 생성, User 엔터티의 기본 키(userId)와 매핑
    private User user;

    @Column
    private String content;     // 내용 (텍스트)
    @Column
    private LocalDate date;     // 날짜에 대해 LocalDate 사용
    @Column
    private String imagepath;   // 이미지 업로드 URL
    @Column
    private String edit_YN;     // 수정 상태

    public static Post createPost(PostDto dto, User user) {
        if (dto.getPostId() != null)
            throw new IllegalArgumentException("포스트 생성 실패! 포스트 아이디는 null이어야 합니다!");
        if (!dto.getUserId().equals(user.getUserId())) // 문자열 비교를 위해 equals() 사용
            throw new IllegalArgumentException("포스트 생성 실패! 잘못된 사용자 아이디입니다.");
        return new Post(
                dto.getPostId(),
                user,
                dto.getContent(),
                LocalDate.parse(dto.getDate().toString(), DateTimeFormatter.ofPattern("yyyy-MM-dd")),
                dto.getImagepath(),
                dto.getEdit_YN()
        );
    }

    public void patch(PostDto dto) {
        if (!this.postId.equals(dto.getPostId()))
            throw new IllegalArgumentException("포스트 업데이트 실패! 잘못된 포스트 아이디입니다.");
        if (dto.getContent() != null) {
            this.content = dto.getContent();
            this.edit_YN = dto.getEdit_YN();
        }
    }
}
