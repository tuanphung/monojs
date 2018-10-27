import express from "express"
const router = express.Router()

router.get("/", (req, res) => {
    res.send("Slack Receiver!")
})

router.get("/receive", (req, res) => {
    res.send("Slack Receiver!")
})

module.exports = router
