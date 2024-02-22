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
import java.util.HashMap;
import java.util.Map;

@Slf4j
@RestController
//@CrossOrigin(origins = {"http://localhost:80", "http://43.202.63.5","https://eaten-ecc.site/", "http://219.254.47.198:80", "https://eaten-five.vercel.app"})
public class UserController {

    @Autowired
    UserService userService;

    @GetMapping("/api/hello")
    public ResponseEntity<Map<String, Object>> hello() {
        Map<String, Object> response = new HashMap<>();
        response.put("msg", "Hello World! 0222");
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @PostMapping("/user/create") //회원가입
    public ResponseEntity<Map<String, Object>> createUser(@RequestBody UserForm userForm)
        throws NoSuchAlgorithmException {
        Map<String, Object> response = new HashMap<>();

        try {
            userService.registerUser(userForm);
            response.put("msg", "회원가입이 완료되었습니다.");
            response.put("statusCode", 200);
            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (Exception e) {
            // 예외가 발생한 경우
            response.put("msg", "회원가입 중 오류가 발생했습니다.");
            response.put("statusCode", 500);
            return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/userId/exists") //아이디 중복 체크
    public ResponseEntity<Map<String, Object>> userIdDuplicate(@RequestHeader("userId") String userId) {
        Map<String, Object> response = new HashMap<>();

        if (userService.isDuplicateUserId(userId)) {
            log.error("아이디가 이미 존재합니다.");
            response.put("msg", "이미 사용중인 아이디입니다.");
            response.put("statusCode", 400);
            return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
        }
        else {
            log.info("사용 가능한 아이디입니다.");
            response.put("msg", "사용 가능한 아이디입니다.");
            response.put("statusCode", 200);
            return new ResponseEntity<>(response, HttpStatus.OK);
        }

    }

    @PostMapping("/user/login") //로그인
    public ResponseEntity<Map<String, Object>> login(@RequestBody UserForm userForm, HttpSession session) throws NoSuchAlgorithmException {
        Map<String, Object> response = new HashMap<>();

        User user = userForm.toEntity();

        try {
            if (userService.login(userForm)) {
                session.setAttribute("userId", user.getUserId()); // 세션에 사용자 ID 저장
                response.put("msg", "로그인이 완료되었습니다.");
                response.put("statusCode", 200);
                response.put("userId", user.getUserId());
                response.put("nickname", userService.getNickname(user.getUserId()));
                return new ResponseEntity<>(response, HttpStatus.OK);
            } else {
                response.put("msg", "로그인에 실패했습니다. 아이디 또는 비밀번호를 확인해주세요.");
                response.put("statusCode", 401);
                return new ResponseEntity<>(response, HttpStatus.UNAUTHORIZED);
            }
        } catch (Exception e) {
            response.put("msg", "로그인 중 오류가 발생했습니다.");
            response.put("statusCode", 500);
            return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/user/logout") //로그아웃
    public ResponseEntity<String> logout(HttpSession session) {
        // 세션 무효화
        session.invalidate();
        return new ResponseEntity<>("로그아웃 성공", HttpStatus.OK);
    }

    @PutMapping("/user/{userId}/edit")
    public ResponseEntity<Map<String, Object>> update(@PathVariable String userId, @RequestBody UserForm userForm, HttpSession session) {
        Map<String, Object> response = new HashMap<>();

        String nickname = userForm.getNickname();
        // 세션에서 현재 로그인한 사용자의 ID
        String loggedInUserId = (String) session.getAttribute("userId");

        if (loggedInUserId != null && loggedInUserId.equals(userId)) {
            // 세션에 로그인한 사용자 ID가 있는 경우에만 업데이트를 허용
            boolean updateResult = userService.updateUser(userId, nickname);

            if (updateResult) {
                response.put("msg", "닉네임이 수정되었습니다.");
                response.put("statusCode", 200);
                response.put("nickname", nickname);
                return new ResponseEntity<>(response, HttpStatus.OK);
            } else {
                // 닉네임 수정에 실패한 경우
                response.put("msg", "닉네임 수정 실패.");
                response.put("statusCode", 500);
                return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
            }
        } else {
            // 세션에 로그인한 사용자 ID가 없거나, 로그인한 사용자와 업데이트 대상 사용자가 일치하지 않는 경우
            response.put("msg", "로그인한 사용자만 업데이트를 수행할 수 있습니다.");
            response.put("statusCode", 401); // Unauthorized
            return new ResponseEntity<>(response, HttpStatus.UNAUTHORIZED);
        }
    }

    @DeleteMapping("user/{userId}/delete") //회원 삭제
    public ResponseEntity<Map<String, Object>> delete(@RequestHeader("userId") String userId, RedirectAttributes rttr, Model model) {
        Map<String, Object> response = new HashMap<>();

        log.info("삭제 요청이 들어왔습니다!!");
        try {
            userService.delete(userId);
            rttr.addFlashAttribute("msg", "삭제되었습니다.");
            response.put("msg", "회원탈퇴가 완료되었습니다.");
            response.put("statusCode", 200); // Unauthorized
            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (Exception e) {
            response.put("msg", "회원탈퇴 중 오류가 발생했습니다.");
            response.put("statusCode", 500);
            return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
