const redis = require('redis');
class Redis {
    static async checkConnection() {
        const client = redis.createClient({
            socket: {
                host: process.env.REDIS_HOST,
                port: process.env.REDIS_PORT
            }
        });
        try {
            await client.connect();
            await client.ping();
            return true;
        } catch (err) {
            console.error('Error connecting to the Redis:', err);
            return false;
        } finally {
            client.quit();
        }
    }
}

module.exports = Redis;