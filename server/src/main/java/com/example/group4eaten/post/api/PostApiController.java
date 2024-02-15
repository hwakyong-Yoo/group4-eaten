package com.example.group4eaten.post.api;

import com.example.group4eaten.post.dto.PostDto;
import com.example.group4eaten.entity.Post;
import com.example.group4eaten.post.service.PostService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Slf4j
@RestController
public class PostApiController {
    @Autowired
    private PostService postService;

    //전체 게시물 조회
    @GetMapping("/posts")
    public ResponseEntity<List<Map<String, Object>>> getAllPosts() {
        try {
            List<Map<String, Object>> allPosts = postService.getAllPosts();

            // userId를 nickname으로 변경
            List<Map<String, Object>> responsePosts = allPosts.stream()
                    .map(postMap -> {
                        Map<String, Object> modifiedPostMap = new HashMap<>(postMap);
                        modifiedPostMap.put("nickname", postMap.get("nickname"));
                        modifiedPostMap.remove("userId");
                        return modifiedPostMap;
                    })
                    .collect(Collectors.toList());

            return ResponseEntity.status(HttpStatus.OK).body(responsePosts);
        } catch (Exception e) {
            // 예외 처리
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
//    public List<PostDto> index(){
//        return postService.index();
//    }

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
//    public ResponseEntity<PostDto> show(@PathVariable Long postId) {
//        PostDto post = postService.show(postId);
//
//        if (post != null) {
//            return ResponseEntity.status(HttpStatus.OK).body(post);
//        } else {
//            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
//        }
//    }


    //새 게시물 작성
    @PostMapping("/posts")
    public ResponseEntity<PostDto> create(@RequestBody PostDto dto) {
        //dto의 postId 값 검증
        if (dto.getPostId() != null)
            throw new IllegalArgumentException("포스트 생성 실패! 포스트 아이디는 null이어야 합니다!");
        dto.setDate(PostDto.getCurrentFormattedDate());
        PostDto createdDto = postService.create(dto);
        return ResponseEntity.status(HttpStatus.OK).body(createdDto);
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


//    //내 페이지 (내가 작성한 게시물 조회 가능)
//    @GetMapping("/mypage")
//    public ResponseEntity<List<PostDto>> getmypage(@RequestHeader(name="sessionId") String sessionId){
//        List<PostDto> myPosts = postService.getMyPosts(sessionId);
//        return ResponseEntity.status(HttpStatus.OK).body(myPosts);
//    }

    // 내 페이지 (내가 작성한 게시물 조회 가능)
    @GetMapping("/mypage")
    public ResponseEntity<List<PostDto>> getmypage(@RequestHeader(name = "sessionId") String sessionId, HttpServletRequest request) {
        List<PostDto> myPosts;

        // 세션 얻기
        HttpSession session = request.getSession(false);

        if (session != null && session.getId().equals(sessionId)) {
            // 세션에서 userId 가져오기
            String userId = (String) session.getAttribute("userId");

            // userId를 이용하여 작성된 post들을 가져오는 로직 추가
            myPosts = postService.getMyPosts(userId);

            return ResponseEntity.status(HttpStatus.OK).body(myPosts);
        } else {
            // 세션이 없거나 세션 ID가 일치하지 않는 경우
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }
}
