import { Ratelimit } from "@upstash/ratelimit";
import ratelimit from "../config/upstash.js"

const ratelimiter = async (req, res, next) => {
    try {
        const {success} = await ratelimit.limit("My limit key")

        if (!success) {
            return res.status(429).json({
                message: "Too many requests, please try again later."
            });
        }
        next()
    } catch (error) {
        console.error("Rate limit error:", error)
        next(error)
    }
}

export default ratelimiter;