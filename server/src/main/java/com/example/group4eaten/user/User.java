package com.example.group4eaten.user;

import jakarta.persistence.*;
import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@ToString
@Entity
@Getter
public class User {
    @Id
    @GeneratedValue
    private Long id;
    @Column
    Long userId;

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

    public void setUserId(Long userId) {
        this.userId = userId;
    }

}
