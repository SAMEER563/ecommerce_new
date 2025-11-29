import databse from '../database.js';

export async function createUserTable() {
    try {
        const query = `
            CREATE TABLE IF NOT EXISTS users (
                id UUID  DEFAULT gen_random_uuid() PRIMARY KEY,
                name VARCHAR(50) NOT NULL CHECK (char_length(name) >= 3),
                email VARCHAR(100) UNIQUE NOT NULL,
                password TEXT NOT NULL,
                role VARCHAR(20) DEFAULT 'user' CHECK (role IN ('user', 'Admin')),
                avatar JSONB DEFAULT NULL,
                reset_password_token TEXT DEFAULT NULL,
                reset_password_expires TIMESTAMP DEFAULT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `;
        await databse.query(query);
        console.log('User table created or already exists.');
        
    } catch (error) {
        console.error('Error creating user table:', error);
        process.exit(1);
    }
}