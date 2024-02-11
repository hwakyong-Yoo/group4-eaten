package com.example.group4eaten.user.api;

import com.example.group4eaten.entity.User;
import com.example.group4eaten.user.dto.UserForm;
import com.example.group4eaten.user.service.UserService;
import jakarta.servlet.http.HttpSession;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import java.security.NoSuchAlgorithmException;

@Slf4j
@RestController
public class UserController {

    @Autowired
    UserService userService;

    @GetMapping("/api/hello")
    public String hello() {
        return "hello world!";
    }

    @PostMapping("/user/create") //회원가입
    public ResponseEntity<String> createUser(@RequestBody UserForm userForm) throws NoSuchAlgorithmException {
        userService.registerUser(userForm);
        return new ResponseEntity<>("회원가입 성공", HttpStatus.OK);
    }

    @PostMapping("/user/login") //로그인
    public ResponseEntity<String> login(@RequestBody UserForm userForm, HttpSession session) throws NoSuchAlgorithmException {
        User user = userForm.toEntity();
        if (userService.login(userForm)) {
            session.setAttribute("userId", user.getUserId()); // 세션에 사용자 ID 저장
            return new ResponseEntity<>("로그인 성공", HttpStatus.OK);
        } else {
            //로그인 실패
            return new ResponseEntity<>("로그인 실패", HttpStatus.UNAUTHORIZED);
        }
    }

    @GetMapping("/user/logout") //로그아웃
    public ResponseEntity<String> logout(HttpSession session) {
        // 세션 무효화
        session.invalidate();
        return new ResponseEntity<>("로그아웃 성공", HttpStatus.OK);
    }

    @PutMapping("/user/{userId}/edit")
    public ResponseEntity<String> update(@PathVariable String userId, @RequestBody String nickname) {
        boolean updateResult = userService.updateUser(userId, nickname);

        if (updateResult) {
            return new ResponseEntity<>("업데이트 성공", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("사용자를 찾을 수 없습니다.", HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("user/{userId}/delete") //회원 삭제
    public ResponseEntity<String> delete(@RequestHeader("userId") String userId, RedirectAttributes rttr, Model model) {
        log.info("삭제 요청이 들어왔습니다!!");
        userService.delete(userId);
        rttr.addFlashAttribute("msg", "삭제되었습니다.");
        return new ResponseEntity<>("회원 탈퇴 완료 ", HttpStatus.OK);
    }

}
