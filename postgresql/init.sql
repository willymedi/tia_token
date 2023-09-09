\c tia;
ALTER DATABASE tia SET timezone TO 'America/Guayaquil';
CREATE TABLE Users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) NOT NULL UNIQUE,
    first_name VARCHAR(255),
    "createdAt" TIMESTAMP DEFAULT NOW(),
    "updatedAt" TIMESTAMP
);

CREATE TABLE Token (
    id SERIAL PRIMARY KEY,
    token_value CHAR(6) NOT NULL,
    user_id INT REFERENCES Users(id),
    "createdAt" TIMESTAMP DEFAULT NOW(),
    "updatedAt" TIMESTAMP,
    expired_at TIMESTAMP,
    valid BOOLEAN DEFAULT TRUE
);

CREATE TABLE TokenUsage (
    id SERIAL PRIMARY KEY,
    token_id INT REFERENCES Token(id),
    used_by INT REFERENCES Users(id),
    used_at TIMESTAMP DEFAULT NOW(),
    "createdAt" TIMESTAMP DEFAULT NOW(),
    "updatedAt" TIMESTAMP
);
