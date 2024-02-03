package com.example.group4eaten.user.api;

import com.example.group4eaten.entity.User;
import com.example.group4eaten.user.dto.UserForm;
import com.example.group4eaten.user.repository.UserRepository;
import com.example.group4eaten.user.service.UserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
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

    @GetMapping("/signup")
    public String signUpPage() {
        return "user/new";
    }
    @PostMapping("/user/create") //회원가입
    public String createUser(UserForm userForm) {
        log.info(userForm.toString());

        User user = userForm.toEntity();
        log.info(user.toString());

        User saved = userRepository.save(user);
        log.info(saved.toString());

        return "";
    }

    @GetMapping("/user/login") // 로그인 화면 리턴
    public String loginForm() {
        return "";
    }

    @PostMapping("/user/login")
    public String login(@RequestParam Long userId, @RequestParam String password) {
        if (userService.login(userId, password)) {
            return  "";
        } else {
            //로그인 실패
            return "";
        }
    }

    @GetMapping("/user/{userId}/edit") //닉네임 수정 페이지 연결
    public String edit(@PathVariable Long userId, Model model) {
        User userEntity = userRepository.findById(userId).orElse(null);
        model.addAttribute("user", userEntity);
        return "";
    }

    @PostMapping("/user/{userId}/edit") //닉네임 수정 결과 POST
    public String update(UserForm form) {
        log.info(form.toString());
        User userEntity = form.toEntity();
        User target = userRepository.findById(userEntity.getId()).orElse(null);
        if (target != null) {
            userRepository.save(userEntity);
        }
        return "";
    }

    @GetMapping("user/{userId}/delete")
    public String delete(@PathVariable Long userId, RedirectAttributes rttr, Model model) {
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
