package com.example.usermanagement.service;

import com.example.usermanagement.dto.UserDTO;
import com.example.usermanagement.entity.UserEntity;
import com.example.usermanagement.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class UserService {
    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public List<UserDTO> getAllUsers(String currentUsername) {
        List<UserEntity> users = userRepository.findAll();
        List<UserDTO> result = new ArrayList<>();

        for (UserEntity user : users) {
            UserDTO dto = new UserDTO(user);
            if (user.getUsername().equals(currentUsername)) {
                dto.setSelf(true);  // chính mình thì ko sửa
            } else {
                dto.setSelf(false);   // user khác thì có thể sửa nếu là ADMIN
            }
            result.add(dto);
        }
        return result;
    }

    public Optional<UserEntity> getUserById(Long id) {
        return userRepository.findById(id);
    }

    public UserEntity createUser(UserEntity user) {
        return userRepository.save(user);
    }

    public UserEntity updateUser(Long id, UserEntity userDetails) {
        return userRepository.findById(id).map(user -> {
            user.setUsername(userDetails.getUsername());
            user.setFullname(userDetails.getFullname());
            user.setPassword(userDetails.getPassword());
            user.setRole(userDetails.getRole());
            return userRepository.save(user);
        }).orElseThrow(() -> new RuntimeException("User not found with id " + id));
    }

    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }
}
