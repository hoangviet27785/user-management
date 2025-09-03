# Bài tập Quản lý người dùng (User Management System)

Hệ thống Quản lý người dùng gồm **Backend (Spring Boot)** và **Frontend (Angular)**:
- User đăng nhập để xem danh sách người dùng
    + Nếu user có quyền admin thì có thể thực hiện CRUD user khác
    + Nếu không có quyền admin thì chỉ có thể xem danh sách user

## 1. Công nghệ sử dụng
### Backend: Spring Boot 3.2.4, Spring Security .2.4, JWT 0.11.5, Maven 3.9.9 
### Frontend: Angular 17.3.0, Bootstrap 5.3.8, TypeScript 5.2.0  

### Clone project
```bash
git clone https://github.com/hoangviet27785/user-management.git
cd user-management
---

## 2. Cấu trúc thư mục
user-management/
├── backend/
│ ├── src/main/java
│ ├── src/main/resources
│ └── pom.xml
│
├── frontend/
│ ├── src/app
│ └── index.html
│ └── main.ts
│ └── polyfills.ts
│ └── angular.json
│ └── package.json
│ └── tsconfig.json
└── README.md # File hướng dẫn (tài liệu này)

## 3. Cấu hình Database
1. Tạo database MySQL:
CREATE DATABASE userdb
	CHARACTER SET utf8mb4
	COLLATE utf8mb4_0900_ai_ci;

2. Tạo table users:
USE userdb;

-- Tạo bảng users
CREATE TABLE `users` (
  `id` bigint NOT NULL,
  `username` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `role` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `password` varchar(255) DEFAULT NULL,
  `fullname` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Insert data sample
INSERT INTO `users` (`id`, `username`, `role`, `created_at`, `password`, `fullname`) VALUES
(1, 'admin', 'ROLE_ADMIN', '2025-08-27 07:52:27', '$2a$10$N7.deJXomZ6Rd.0JEh038eo7TI94ipizbx.6.3FtT0dlr30VJW66u', 'User Admin'),
(2, 'user_be', 'ROLE_USER', '2025-08-27 07:52:27', NULL, 'User Backend Development'),
(3, 'user_fe', 'ROLE_USER', '2025-08-27 07:52:27', NULL, 'User Front Development'),
(4, 'user_fullst', 'ROLE_USER', '2025-08-27 07:52:27', NULL, 'User FullStack Development'),
(11, 'a1', 'ROLE_USER', '2025-08-29 03:06:09', '$2a$10$NuGhcXHfZpk.gkZgl8hh6u/F0fx9PPmhydE3Qk/Ej5DleaBR4qt8O', 'aaa111');

2. Configuration connect DB: \user-management\backend\src\main\resources\application.properties
spring.datasource.url=jdbc:mysql://localhost:3306/userdb?useSSL=false&serverTimezone=UTC
spring.datasource.username=root
spring.datasource.password=password

spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.format_sql=true


## 4. Cài đặt & Chạy
### **Backend**
1. Di chuyển đến thư mục backend:
   cd backend

2. Cài dependencies:
   mvn clean install

3. Chạy ứng dụng:
	mvn spring-boot:run
	Backend sẽ chạy mặc định tại http://localhost:8080

### **Frontend**
1. Di chuyển đến thư mục frontend:
	cd frontend

2. Cài dependencies:
	npm install

3. Chạy ứng dụng:
	ng serve
	Backend sẽ chạy mặc định tại http://localhost:4200