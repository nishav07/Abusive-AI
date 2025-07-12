CREATE DATABASE IF NOT EXISTS ai_product;
USE ai_product;

CREATE TABLE users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


INSERT INTO users (username, email, password_hash)
VALUES 
    (@username, @email, @passwordHash);

INSERT INTO chat_sessions (user_id, message, sender)
VALUES 
    (@userId, @userMessage, 'user'),
    (@userId, @botReply, 'bot');
























































































CREATE TABLE chat_sessions (
    session_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    message TEXT NOT NULL,
    sender ENUM('user', 'bot') NOT NULL,
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);

UPDATE users
SET username = @newUsername, email = @newEmail
WHERE user_id = @userId;

UPDATE chat_sessions
SET message = @updatedMessage
WHERE session_id = @sessionId AND user_id = @userId;

DELETE FROM chat_sessions
WHERE session_id = @sessionIdToDelete AND user_id = @userId;

DELETE FROM user_id 
WHERE user_id = @userIdToDelete;
