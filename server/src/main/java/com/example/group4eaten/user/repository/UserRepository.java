package com.example.group4eaten.user.repository;

import com.example.group4eaten.entity.User;
import org.springframework.data.repository.CrudRepository;

import java.util.Optional;

public interface UserRepository extends CrudRepository<User, String> {
    Optional<Object> findByUserId(String userId);
}
