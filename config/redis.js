// const { createClient } = require('redis');
// const client = createClient({ url: process.env.REDIS_URL });
// client.connect();
// module.exports = client;

import { Redis } from "@upstash/redis";

export const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
});