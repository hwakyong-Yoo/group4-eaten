package com.example.group4eaten.entity;

import jakarta.persistence.*;
import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@ToString
@Entity
@Getter
public class User {
    @Id
    @Column(name = "userId")
    String userId;

    @Column
    String password;

    @Column
    String nickname;

    public String getPassword() {
        return this.password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getId() {
        return userId;
    }
}
