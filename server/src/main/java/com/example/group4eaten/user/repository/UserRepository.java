package com.example.group4eaten.user.repository;

import com.example.group4eaten.entity.User;
import org.springframework.data.repository.CrudRepository;

public interface UserRepository extends CrudRepository<User, String> {
    User findByUserId(String userId);
}
