package com.example.group4eaten.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;
    private BCryptPasswordEncoder passwordEncoder;

    public void registerUser(Long userId, String password) {
        // 비밀번호를 해시화하여 저장
        String hashedPassword = passwordEncoder.encode(password);

        User newUser = new User();
        newUser.setUserId(userId);
        newUser.setPassword(hashedPassword);

        userRepository.save(newUser);
    }
    public boolean login(Long userId, String password) {
        User user = userRepository.findByUserId(userId);

        if (user != null && passwordEncoder.matches(password, user.getPassword())) {
            return true;
        } else {
            return false;
        }
    }

}
