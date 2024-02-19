package com.example.group4eaten.user.service;

import com.example.group4eaten.entity.User;
import com.example.group4eaten.post.service.PostService;
import com.example.group4eaten.user.SHA256;
import com.example.group4eaten.user.dto.UserForm;
import com.example.group4eaten.user.repository.UserRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.security.NoSuchAlgorithmException;
import java.util.Optional;

@Slf4j
@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PostService postService;

    public void registerUser(UserForm userForm) throws NoSuchAlgorithmException {
        User user = userForm.toEntity();

        // 사용자 등록 전에 이미 중복 체크를 API에서 수행하므로 중복 여부를 서비스에서 다시 확인할 필요 없음

        // SHA-256 사용해서 비밀번호 해시화
        String hashedPassword = SHA256.encrypt(user.getPassword());
        user.setPassword(hashedPassword);

        userRepository.save(user);
        log.info("DB에 회원 저장 성공");
    }
    public boolean login(UserForm userForm) throws NoSuchAlgorithmException{
        User user = userForm.toEntity();
        // 사용자 정보 가져오기
        Optional<User> userOptional = userRepository.findById(user.getUserId());
        if (userOptional.isPresent()) {
            User storedUser = userOptional.get();

            // 사용자가 입력한 비밀번호를 해시화하여 저장된 해시화된 비밀번호와 비교
            String hashedPassword = SHA256.encrypt(user.getPassword());

            // 비밀번호가 일치하면 로그인 성공
            return hashedPassword.equals(storedUser.getPassword());
        } else {
            // 사용자가 존재하지 않을 경우
            return false;
        }
    }

    public boolean updateUser(String userId, String nickname) {
        Optional<User> userOptional = userRepository.findById(userId);

        if (userOptional.isPresent()) {
            User user = userOptional.get();
            // 닉네임 업데이트
            user.setNickname(nickname);

            userRepository.save(user);
            return true; // 업데이트 성공
        } else {
            // 사용자가 존재하지 않을 경우
            return false; // 업데이트 실패
        }
    }

    public void delete(String userId) {
        User target = userRepository.findById(userId).orElse(null);
        if(target != null) {
            // 사용자 삭제 전에 연결된 Post 엔터티들의 user 필드를 NULL로 업데이트
            postService.updatePostsAfterUserDeletion(userId);

            userRepository.delete(target);
            log.info("사용자 삭제 성공");
        }
        else {
            log.error("사용자가 존재하지 않습니다.");
        }
    }

    public boolean isDuplicateUserId(String userId) {
        return userRepository.findByUserId(userId).isPresent();
    }

    public String getNickname(String userId) {
        Optional<User> userOptional = userRepository.findById(userId);
        return userOptional.map(User::getNickname).orElse(null);
    }
}
