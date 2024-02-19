package com.example.group4eaten.entity;

import com.example.group4eaten.post.dto.PostDto;
import jakarta.persistence.*;
import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@ToString
@Entity
@Getter
@Setter
@Table(name="TB_POST")
public class Post {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long postId;

    @ManyToOne
    @JoinColumn(name = "userId", nullable = true) // 외래 키 생성, User 엔터티의 기본 키(userId)와 매핑
    private User user;

    @Column
    private String content;     // 내용 (텍스트)
    @Column
    private String date;     // 날짜에 대해 LocalDate 사용
    @Column
    private String imagepath;   // 이미지 업로드 URL
    @Column
    private Boolean edit_YN = false;     // 수정 상태, 기본값 false

    public static Post createPost(PostDto dto, User user) {
        if (!dto.getUserId().equals(user.getUserId())) // 문자열 비교를 위해 equals() 사용
            throw new IllegalArgumentException("포스트 생성 실패! 잘못된 사용자 아이디입니다.");

        return new Post(
                dto.getPostId(),
                user,
                dto.getContent(),
                dto.getDate(),
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

    public void applyChanges(PostDto dto) {
        // postId가 null이 아니면서 현재 객체의 postId와 다르다면 예외 발생
        if (dto.getPostId() != null && !dto.getPostId().equals(this.postId)) {
            throw new IllegalArgumentException("포스트 업데이트 실패! 잘못된 포스트 아이디입니다.");
        }

        // content가 null이 아니고 원래의 content와 다르다면 업데이트
        if (dto.getContent() != null && !dto.getContent().equals(this.content)) {
            this.content = dto.getContent();
            this.edit_YN = true; // content가 업데이트되면 edit_YN을 true로 설정
        }

        // imagepath가 null이 아니고 원래의 imagepath와 다르다면 업데이트
        if (dto.getImagepath() != null && !dto.getImagepath().equals(this.imagepath)) {
            this.imagepath = dto.getImagepath();
            this.edit_YN = true; // imagepath가 업데이트되면 edit_YN을 true로 설정
        }
    }
}
