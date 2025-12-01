import ratelimit from '../Config/Upstash.js'

const rateLimiter = async (req, res, next) => {
    try {
        const { success } = await ratelimit.limit("my-limit-key");
        if (!success) return res.status(429).json({ message: "Too many request plears try later!" })
        next();
    } catch (error) {
        res.status(401).json({ message: "not working" })
        next(error)
    }
}

export default rateLimiter;