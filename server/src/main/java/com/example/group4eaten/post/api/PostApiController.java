package com.example.group4eaten.post.api;

import com.example.group4eaten.post.dto.PostDto;
import com.example.group4eaten.post.repository.PostRepository;
import com.example.group4eaten.post.service.PostService;
import jakarta.servlet.http.HttpSession;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.StandardCopyOption;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Slf4j
@RestController
@CrossOrigin(origins = {"http://localhost:80", "http://43.202.63.5","https://eaten-ecc.site/", "http://219.254.47.198:80", "https://eaten-five.vercel.app/"})
public class PostApiController {
    @Autowired
    private PostService postService;

    @Value("${upload.path}")
    private String uploadPath;

    @Autowired
    private PostRepository postRepository;

    //전체 게시물 조회
    @GetMapping("/posts")
    public ResponseEntity<Map<String, Object>> getAllPosts(@RequestParam int pagenum) {
        try {
            Pageable pageable = PageRequest.of(pagenum - 1, 10);
            Map<String, Object> responseMap = postService.getAllPosts(pageable);

            return ResponseEntity.status(HttpStatus.OK).body(responseMap);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    //상세 페이지 조회
    @GetMapping("/posts/{postId}")
    public ResponseEntity<Map<String, Object>> getPostDetails(@PathVariable Long postId) {
        try {
            Map<String, Object> postDetails = postService.getPostDetails(postId);

            if (postDetails != null) {
                // userId를 nickname으로 변경
                Map<String, Object> responsePostDetails = new HashMap<>(postDetails);
                responsePostDetails.put("nickname", postDetails.get("nickname"));
                responsePostDetails.remove("userId");

                return ResponseEntity.status(HttpStatus.OK).body(responsePostDetails);
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
            }
        } catch (Exception e) {
            // 예외 처리
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    //새 게시물 작성
    @PostMapping(value = "/posts", consumes = { "multipart/form-data" })
    public ResponseEntity<PostDto> create(@RequestPart MultipartFile imageFile, @ModelAttribute PostDto dto) {
        try {
            //dto의 postId 값 검증
            if (dto.getPostId() != null)
                throw new IllegalArgumentException("포스트 생성 실패! 포스트 아이디는 null이어야 합니다!");

            // 이미지를 업로드하고 이미지 경로를 얻어옴
            ResponseEntity<String> uploadResponse = handleFileUpload(imageFile);
            if (uploadResponse.getStatusCode() == HttpStatus.OK) {
                // 이미지 업로드 성공 시 이미지 경로를 설정
                dto.setImagepath(uploadResponse.getBody());
            }
            dto.setDate(PostDto.getCurrentFormattedDate());
            PostDto createdDto = postService.create(dto);

            return ResponseEntity.status(HttpStatus.OK).body(createdDto);
        } catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    private ResponseEntity<String> handleFileUpload(MultipartFile file) {
        try {
            // 이미지만 업로드 가능
            if (file != null && !file.isEmpty() && file.getContentType() != null) {
                // 업로드할 디렉토리 생성
                File uploadDir = new File(uploadPath);
                if (!uploadDir.exists()) {
                    uploadDir.mkdirs();
                }

                // 업로드할 파일 경로 설정
                String fileName = StringUtils.cleanPath(file.getOriginalFilename());
                File dest = new File(uploadDir.getAbsolutePath() + File.separator + fileName);

                // 파일 업로드
                Files.copy(file.getInputStream(), dest.toPath(), StandardCopyOption.REPLACE_EXISTING);

                // 업로드 성공 시 파일 경로 반환
                return ResponseEntity.ok(dest.getAbsolutePath());
            } else {
                // 이미지 업로드 실패 시 에러 반환
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid or no image file provided");
            }
        } catch (IOException e) {
            e.printStackTrace();
            // 업로드 실패 시 에러 로깅
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to upload file.");        }
    }


    //게시물 수정
    @PutMapping("/posts/{postId}")
    public ResponseEntity<PostDto> update(@PathVariable Long postId, @RequestBody PostDto dto){
        PostDto updatedDto = postService.update(postId, dto);
        return ResponseEntity.status(HttpStatus.OK).body(updatedDto);
    }


    //게시물 삭제
    @DeleteMapping("/posts/{postId}")
    public ResponseEntity<PostDto> delete(@PathVariable Long postId){
        PostDto deletedDto = postService.delete(postId);
        return ResponseEntity.status(HttpStatus.OK).body(deletedDto);
    }

    //게시물에 눌린 좋아요 수 확인
    @GetMapping("/posts/like/{postId}")
    public ResponseEntity<Map<String, Object>> getLikesForPost(@PathVariable Long postId) {
        try {
            Map<Integer, Integer> likeCounts = postService.fetchLikeCounts(postId);

            Map<String, Object> response = new HashMap<>();
            response.put("likeCounts", likeCounts);
            response.put("msg", "좋아요 수 확인");
            response.put("statusCode", 200);

            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (Exception e) {
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("error", "좋아요 수 확인 불가");
            errorResponse.put("statusCode", 500);
            return new ResponseEntity<>(errorResponse, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    //인기 게시물 조회
    @GetMapping("/hot-posts")
    public ResponseEntity<Map<String, Object>> getHotPosts() {
        try {
            List<Map<String, Object>> topPosts = postService.getTopPostsByLikeCounts();

            // nickname만을 포함시켜 새로운 리스트 생성
            List<Map<String, Object>> responsePosts = topPosts.stream()
                    .map(postMap -> {
                        Map<String, Object> modifiedPostMap = new HashMap<>();
                        modifiedPostMap.put("postId", postMap.get("postId"));
                        modifiedPostMap.put("nickname", postMap.get("nickname"));
                        modifiedPostMap.put("msg", postMap.get("msg"));
                        modifiedPostMap.put("statusCode", postMap.get("statusCode"));
                        return modifiedPostMap;
                    })
                    .collect(Collectors.toList());
            Map<String, Object> response = new HashMap<>();
            response.put("posts", topPosts);
            response.put("msg", "인기 게시물 조회");
            response.put("statusCode", 200);
            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (Exception e) {
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("error", "인기 게시물 조회 실패");
            errorResponse.put("statusCode", 400);
            return new ResponseEntity<>(errorResponse, HttpStatus.UNAUTHORIZED);
        }
    }



    // 내 페이지 (내가 작성한 게시물 조회 가능)
    @GetMapping("/mypage")
    public ResponseEntity<List<PostDto>> getmypage(@RequestHeader(name = "sessionId") String sessionId, HttpSession session) {
        List<PostDto> myPosts;
        //session을 바로 받아오는 방식 사용
        if (session != null) {
            // 세션에서 userId 가져오기
            String userId = (String) session.getAttribute("userId");
            log.info("현재 로그인한 사용자의 id: {}", userId);

            // userId를 이용하여 작성된 post들을 가져오는 로직 추가
            myPosts = postService.getMyPosts(userId);

            return ResponseEntity.status(HttpStatus.OK).body(myPosts);
        } else {
            // 세션이 없거나 세션 ID가 일치하지 않는 경우
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }
}
