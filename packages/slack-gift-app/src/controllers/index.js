import express from "express"
const router = express.Router()

import SlackRoute from "./slack_route"
router.use("/slack", SlackRoute)

module.exports = router

module.exports.testable = function(a, b) {
    return a + b
}
