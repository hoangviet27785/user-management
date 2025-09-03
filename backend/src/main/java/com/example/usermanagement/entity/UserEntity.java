package com.example.usermanagement.entity;

import java.time.LocalDateTime;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "users")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String username;

    private String fullname;

    private String password;

    @Enumerated(EnumType.STRING)
    private Role role;

    @Column(name = "created_at", updatable = false, insertable = false)
    private LocalDateTime created_at;
}
