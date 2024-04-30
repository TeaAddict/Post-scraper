CREATE TABLE post_age (
    id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    age ENUM("any", "pastMonth", "pastWeek", "past24Hours") DEFAULT "any",
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    settings_id INT,
    FOREIGN KEY (settings_id) REFERENCES settings(id) ON DELETE CASCADE,
    UNIQUE(settings_id)
)