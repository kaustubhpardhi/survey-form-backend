const redis = require("redis");

// Create a Redis client instance
const redisClient = redis.createClient();

// Listen for errors
redisClient.on("error", (error) => {
  console.log(error);
});

// Export the Redis client instance
module.exports = redisClient;
