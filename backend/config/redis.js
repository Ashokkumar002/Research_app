// config/redis.js
const Redis = require("ioredis");
const redis = new Redis({
  host: process.env.REDIS_HOST, // Redis server host
  port: process.env.REDIS_PORT, // Redis server port
  db: 0, // Choose the Redis DB to connect to (0 by default)
});

module.exports = redis;
