package com.example.group4eaten.entity;

import jakarta.persistence.Embeddable;
import lombok.Data;

import java.io.Serializable;

@Data
@Embeddable
public class LikePK implements Serializable {
    private String userId;
    private Long postId;

    public LikePK(String userId, Long postId) {
    }
}
