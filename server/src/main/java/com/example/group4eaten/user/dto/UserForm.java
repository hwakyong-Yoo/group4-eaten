package com.example.group4eaten.user.dto;

import com.example.group4eaten.entity.User;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.*;

@Data
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserForm {
    @NotBlank(message = "아이디를 입력해주세요.")
    private String userId;
    @NotBlank(message = "비밀번호를 입력해주세요.")
    @Size(min = 8, message = "비밀번호는 8자 이상이여야 합니다!")
    private String password;
    @NotBlank(message = "닉네임을 입력해주세요.")
    private String nickname;

    public User toEntity() { return new User( userId, password, nickname );

    }
}
