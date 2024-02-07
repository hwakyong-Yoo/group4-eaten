package com.example.group4eaten.user.api;

import com.example.group4eaten.entity.User;
import com.example.group4eaten.user.dto.UserForm;
import com.example.group4eaten.user.repository.UserRepository;
import com.example.group4eaten.user.service.UserService;
import jakarta.servlet.http.HttpSession;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

@Slf4j
@Controller
public class UserController {
    @Autowired
    UserRepository userRepository;

    @Autowired
    UserService userService;

   /* @GetMapping("/signup")
    public String signUpPage() {
        return "user/new";
    }*/
    @PostMapping("/user/create") //회원가입
    public String createUser(@RequestBody UserForm userForm) {
        log.info(userForm.toString());

        User user = userForm.toEntity();
        log.info(user.toString());

        User saved = userRepository.save(user);
        log.info(saved.toString());

        return "";
    }

    @GetMapping("/userId/exists") //아이디 중복 확인
    public ResponseEntity<Boolean> checkUserIdDuplicate(@RequestHeader("userId") String userId) {
        boolean isDuplicate = userService.checkUserIdDuplicate(userId);
        return ResponseEntity.ok(isDuplicate);
    }

    /*@GetMapping("/user/login") // 로그인 화면 리턴
    public String loginForm() {
        return "";
    }*/

    @PostMapping("/user/login") //로그인
    public String login(@RequestParam String userId, @RequestParam String password, HttpSession session) {
        if (userService.login(userId, password)) {
            session.setAttribute("userId", userId); // 세션에 사용자 ID 저장
            return  ""; //성공 시 이동할 페이지의 이름 또는 경로
        } else {
            //로그인 실패
            return ""; //실패 시 다시 로그인 화면으로 이동
        }
    }

    @GetMapping("/user/logout") //로그아웃
    public String logout(HttpSession session) {
        // 세션에서 사용자 정보 제거
        session.removeAttribute("userId");

        // 로그아웃 후 로그인 화면으로 이동하도록 설정
        return "";
    }

    @GetMapping("/user/{userId}/edit") //닉네임 수정 페이지 연결
    public String edit(@RequestHeader("userId") String userId, Model model) {
        User userEntity = userRepository.findById(userId).orElse(null);
        model.addAttribute("user", userEntity);
        return "";
    }

    @PostMapping("/user/{userId}/edit") //닉네임 수정 결과 POST
    public String update(@RequestHeader("userId") String userId, @RequestBody UserForm form) {
        log.info(form.toString());
        User userEntity = form.toEntity();
        User target = userRepository.findById(userEntity.getId()).orElse(null);
        if (target != null) {
            userRepository.save(userEntity);
        }
        return "";
    }

    /*@PutMapping("/user/{userId}/edit")
    public String update(@PathVariable String userId, @RequestBody UserForm form) {
        log.info(form.toString());

        User userEntity = userRepository.findById(userId).orElse(null);
        if (userEntity != null) {
            // 수정하고자 하는 정보를 업데이트
            userEntity.setUsername(form.getUsername());

            // userRepository.save()를 호출하지 않아도 JPA는 영속성 컨텍스트에서 변경을 감지하고 업데이트를 수행합니다.
        }

        return "";
    }*/


    @GetMapping("user/{userId}/delete") //회원 삭제
    public String delete(@RequestHeader("userId") String userId, RedirectAttributes rttr, Model model) {
        log.info("삭제 요청이 들어왔습니다!!");
        //삭제 대상 가져오기
        User target = userRepository.findById(userId).orElse(null);
        log.info(target.toString());
        //대상 삭제
        if (target != null) {
            userRepository.delete(target);
            rttr.addFlashAttribute("msg", "삭제되었습니다.");
        }
        return "";
    }

}
