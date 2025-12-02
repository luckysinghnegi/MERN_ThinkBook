import ratelimit from '../Config/Upstash.js'

const rateLimiter = async (req, res, next) => {
    try {
        const { success } = await ratelimit.limit("my-limit-key");
        if (!success) return res.status(429).json({ message: "Too many requests, please try later!" })
        next();
    } catch (error) {
        console.error("Rate limiter error:", error);
        // If rate limiter fails, allow request to continue (don't block)
        next();
    }
}

export default rateLimiter;