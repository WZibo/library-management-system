SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- Table structure for administrator
DROP TABLE IF EXISTS `administrator`;
CREATE TABLE `administrator`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `account` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `password` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`id`, `account`) USING BTREE,
  UNIQUE INDEX `id_UNIQUE`(`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 6 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;


-- Records of administrator
INSERT INTO `administrator` VALUES (1, 'admin', 'admin');


-- Table structure for books
DROP TABLE IF EXISTS `books`;
CREATE TABLE `books`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `bookname` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `author` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `booknumber` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `bookid` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `picname` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `lenduserid` int NULL DEFAULT NULL,
  `status` tinyint(1) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `id_UNIQUE`(`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 45 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;


-- Records of books
INSERT INTO `books` VALUES (1, 'Harry Potter', 'J.K. Rowling', 'A001', 'A001-1', '1.jpg', 38, 1);
INSERT INTO `books` VALUES (2, 'To Kill a Mockingbird ', 'Harper Lee', 'A002', 'A002-2', '2.jpg', 38, 1);
INSERT INTO `books` VALUES (3, '1984', 'George Orwell', 'B001', 'B001-3', '3.jpg', NULL, 0);
INSERT INTO `books` VALUES (4, 'Slaughterhouse-Five', 'Kurt Vonnegut Jr.', 'A003', 'A003-4', '4.jpg', 39, 1);
INSERT INTO `books` VALUES (5, 'Light in August', 'William Faulkner', 'C001', 'C001-5', '5.jpg', NULL, 0);
INSERT INTO `books` VALUES (6, 'Lucky Jim', 'Kingsley Amis', 'D001', 'D001-6', '6.jpg', 39, 1);
INSERT INTO `books` VALUES (7, 'Housekeeping', 'Marilynne Robinson', 'B002', 'B002-7', '7.jpg', 40, 1);
INSERT INTO `books` VALUES (8, 'At Swim-Two-Birds', 'Flann OBrien', 'B003', 'B003-8', '8.jpg', 41, 1);
INSERT INTO `books` VALUES (9, 'A Handful of Dust', 'Evelyn Waugh', 'B004', 'B004-9', '9.jpg', 41, 1);
INSERT INTO `books` VALUES (10, 'The Lord of the Rings', 'J.R.R. Tolkien', 'B005', 'B005-10', '10.jpg', NULL, 0);


-- Table structure for students
DROP TABLE IF EXISTS `students`;
CREATE TABLE `students`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `account` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `password` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT 'admin123',
  `studentname` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `class` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT '暂无信息',
  `status` tinyint(1) NOT NULL DEFAULT 0,
  `lendbook` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`, `account`) USING BTREE,
  UNIQUE INDEX `idstudents_UNIQUE`(`id`) USING BTREE,
  UNIQUE INDEX `account_UNIQUE`(`account`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 42 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;


-- Records of students
INSERT INTO `students` VALUES (38, '111111', '111111', 'Wang', 'Engineering', 0, '1,2');
INSERT INTO `students` VALUES (39, '123456', '123456', 'Bill', 'Marketing', 0, '4,6');
INSERT INTO `students` VALUES (40, '654321', '654321', 'Jack', 'Finance', 0, '7');
INSERT INTO `students` VALUES (41, '999999', '999999', 'Harry', 'Accounting', 0, '8,9');

SET FOREIGN_KEY_CHECKS = 1;

