package com.example.group4eaten.repository;

import com.example.group4eaten.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.ArrayList;
import java.util.List;

public interface UserRepository extends JpaRepository<User, String> {

    List<User> findByUserId(String userId);

    List<User> findAll();
}
