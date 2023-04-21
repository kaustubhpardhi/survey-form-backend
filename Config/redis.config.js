const redis = require("redis");

// Create a Redis client instance
const redisClient = redis.createClient({
  host: "https://surveyformbackend-98c8.onrender.com",
  port: 6379,
});

// Listen for errors
redisClient.on("error", (error) => {
  console.log(error);
});

// Export the Redis client instance
module.exports = redisClient;
