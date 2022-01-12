DROP TABLE IF EXISTS reg_users CASCADE;

CREATE TABLE IF NOT EXISTS reg_users (
    entry_id SERIAL PRIMARY KEY,
    users_name VARCHAR(255) NOT NULL, 
    entry_date DATE NOT NULL);