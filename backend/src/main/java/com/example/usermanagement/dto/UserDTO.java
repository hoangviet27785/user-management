package com.example.usermanagement.dto;

import com.example.usermanagement.entity.UserEntity;
import java.time.LocalDateTime;

import lombok.*;

@Getter
@Setter
public class UserDTO {
    private Long id;
    private String username;
    private String fullname;
    private String role;
    private boolean isSelf;
    private LocalDateTime createdAt;

    public UserDTO(UserEntity entity) {
        this.id = entity.getId();
        this.username = entity.getUsername();
        this.fullname = entity.getFullname();
        this.role = entity.getRole().name();
        this.createdAt = entity.getCreated_at();
    }
}

