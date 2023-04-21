// const redis = require("redis");

// // Create a Redis client instance
// const redisClient = redis.createClient({
//   host: "redis-server",
//   port: 6379,
// });

// // Listen for errors
// redisClient.on("error", (error) => {
//   console.log(error);
// });

// // Export the Redis client instance
// module.exports = redisClient;
const redis = require("redis");

// Create a Redis client instance
const redisClient = redis.createClient({
  host: "redis-18359.c17.us-east-1-4.ec2.cloud.redislabs.com:18359",
  port: 12345,
});
(async () => {
  await redisClient.connect();
})();
// Listen for errors
redisClient.on("error", (error) => {
  console.error(error);
});

// Export the Redis client instance
module.exports = redisClient;
