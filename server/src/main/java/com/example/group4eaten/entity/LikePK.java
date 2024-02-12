package com.example.group4eaten.entity;

import jakarta.persistence.Embeddable;
import lombok.Data;

import java.io.Serializable;

@Data
@Embeddable
public class LikePK implements Serializable {
    private String userId;
    private Long postId;

    public LikePK(String userId, Long postId) {this.userId = userId;
        this.postId = postId;
    }

    // 기본 생성자도 추가해야 함 (Hibernate가 사용)
    public LikePK() {
    }
}
