// config/redis.js
const Redis = require("ioredis");

// Use the Redis URL from the environment variable
const redis = new Redis(process.env.REDIS_URL, {
  db: 0, // Specify the Redis DB to use (default is 0)
});

// Handle connection events for logging and debugging
redis.on("connect", () => {
  console.log("Connected to Redis");
});

redis.on("error", (err) => {
  console.error("Redis connection error:", err);
});

module.exports = redis;
