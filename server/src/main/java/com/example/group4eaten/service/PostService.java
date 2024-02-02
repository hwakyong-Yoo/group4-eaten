package com.example.group4eaten.service;

import com.example.group4eaten.dto.PostDto;
import com.example.group4eaten.entity.Post;
import com.example.group4eaten.entity.User;
import com.example.group4eaten.repository.PostRepository;
import com.example.group4eaten.repository.UserRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Slf4j
@Service
public class PostService {
    @Autowired
    private PostRepository postRepository;

    @Autowired
    private UserRepository userRepository;

    public List<Post> index() {
        return postRepository.findAll();
    }

    public Post show(Long postId) {
        return postRepository.findById(postId).orElse(null);
    }

//    @Transactional
//    public Post create(PostDto dto){
//        Post post = dto.toEntity();
//        if(post.getPostId() != null)
//            return null;
//        return postRepository.save(post);
//    }

    @Transactional
    public PostDto create(String userId, PostDto dto) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("Post 생성 실패!"));
        Post post = Post.createPost(dto, user);
        Post created = postRepository.save(post);
        return PostDto.createPostDto(created);
    }
}


