import rateLimiter from 'express-rate-limit';

export const authLimiter = rateLimiter({
  windowMs: 10000, // 10 seconds
  max: 5,
  message: "You can't make any more requests at the moment. Try again later",
});

export const limiter = rateLimiter({
  windowMs: 10000, // 10 seconds
  max: 5,
  message: "You can't make any more requests at the moment. Try again later",
});
