CREATE TABLE job (
    id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    title VARCHAR(255) NOT NULL,
    link VARCHAR(255) NOT NULL,
    location VARCHAR(255),
    age INT NOT NULL,
    promoted BOOLEAN NOT NULL DEFAULT 0,
    easy_apply BOOLEAN NOT NULL DEFAULT 0,
    job_website VARCHAR(255) NOT NULL,
    applied BOOLEAN NOT NULL DEFAULT 0,
    website_created_at VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    user_id INT,
    FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE CASCADE
)