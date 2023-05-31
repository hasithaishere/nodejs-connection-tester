const mysql = require('mysql2/promise');

class MySql {
    static async checkConnection() {
        let pool;
        try {
            // Create a connection pool
            pool = await mysql.createPool({
                host: process.env.DB_HOST,
                user: process.env.DB_USERNAME,
                password: process.env.DB_PASSWORD,
                waitForConnections: true,
                connectionLimit: 1,
                queueLimit: 0
            });

            // Check the connection
            const connection = await pool.getConnection();
            
            // Release the connection
            connection.release();
            return true;
        } catch (err) {
            console.error('Error connecting to the MySQL:', err);
            return false;
        } finally {
            pool.end();
        }
    }
}

module.exports = MySql;