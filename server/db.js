const sqlite3 = require('sqlite3');
const sqlite = require('sqlite');

let db = null;

const initializeDb = async () => {
    try {
        db = await sqlite.open({
            filename: './database.sqlite',
            driver: sqlite3.Database
        });

        // Drop existing users table if it exists
        await db.exec(`DROP TABLE IF EXISTS users`);

        // Create users table
        await db.exec(`
            CREATE TABLE users (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                email TEXT UNIQUE NOT NULL,
                password TEXT NOT NULL,
                phone TEXT,
                address TEXT,
                createdAt DATETIME DEFAULT (datetime('now'))
            )
        `);

        console.log('Database initialized successfully');
        return db;
    } catch (error) {
        console.error('Database initialization error:', error);
        throw error;
    }
};

// Initialize the database connection
(async () => {
    try {
        await initializeDb();
    } catch (error) {
        console.error('Failed to initialize database:', error);
        process.exit(1);
    }
})();

module.exports = {
    get: async (query, params = []) => {
        if (!db) {
            throw new Error('Database not initialized');
        }
        try {
            return await db.get(query, params);
        } catch (error) {
            console.error('Database get error:', error);
            throw error;
        }
    },
    all: async (query, params = []) => {
        if (!db) {
            throw new Error('Database not initialized');
        }
        try {
            return await db.all(query, params);
        } catch (error) {
            console.error('Database all error:', error);
            throw error;
        }
    },
    run: async (query, params = []) => {
        if (!db) {
            throw new Error('Database not initialized');
        }
        try {
            return await db.run(query, params);
        } catch (error) {
            console.error('Database run error:', error);
            throw error;
        }
    }
}; 