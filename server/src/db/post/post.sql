CREATE TABLE post (
    id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    title VARCHAR(255) NOT NULL,
    link VARCHAR(500) NOT NULL,
    age_in_days VARCHAR(255) NOT NULL,
    company_name VARCHAR(255) NOT NULL,
    location VARCHAR(255),
    applied BOOLEAN NOT NULL DEFAULT 0,
    website_created_at_datetime VARCHAR(255) NOT NULL,
    website_created_at_string VARCHAR(255) NOT NULL,
    keywords VARCHAR(255) NOT NULL,
    blacklisted BOOLEAN NOT NULL DEFAULT 0,
    easy_apply BOOLEAN NOT NULL DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    user_id INT,
    FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE CASCADE,
    UNIQUE (link)
)