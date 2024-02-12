package com.example.group4eaten.entity;

import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name="TB_LIKE")
public class Like {

    @EmbeddedId
    private LikePK likePK;

    private int like_id;


    public void setLikePK(LikePK likePK) { this.likePK = likePK;
    }

    public void setLikeId(int like_id) {
        this.like_id = like_id;
    }
}
