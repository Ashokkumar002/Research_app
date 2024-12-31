const Redis = require("ioredis");

// Use the internal Redis URL
const redisUrl =
  process.env.REDIS_URL || "redis://red-ctposvjqf0us73edpd20:6379";

const redis = new Redis(redisUrl, {
  db: 0, // Default DB
});

redis.on("connect", () => {
  console.log("Connected to Redis successfully");
});

redis.on("error", (err) => {
  console.error("Redis connection error:", err);
});

module.exports = redis;
