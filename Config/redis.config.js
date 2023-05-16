const redis = require("redis");
const createClient = redis.createClient;

const redisClient = createClient({
  password: "8nNfSVDOVnzfmtGX3iNLwHtpEdbYRNsz",
  socket: {
    host: "redis-18359.c17.us-east-1-4.ec2.cloud.redislabs.com",
    port: 18359,
  },
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
