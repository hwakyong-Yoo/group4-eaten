package com.example.group4eaten.entity;

import jakarta.persistence.*;
import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@ToString
@Entity
@Getter
@Setter
@Table(name="TB_USER")
public class User {
    @Id
    @Column(name = "userId")
    String userId;

    @Column
    String password;

    @Column
    String nickname;

}
