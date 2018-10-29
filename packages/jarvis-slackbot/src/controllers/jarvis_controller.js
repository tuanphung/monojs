import JarvisSlackBot from '../models/Jarvis'
import express from 'express'
const router = express.Router()

const jarvis = new JarvisSlackBot()

router.get('/', (req, res) => {
    res.send("I'm Jarvis!")
})

router.post('/', (req, res) => {
    const payload = req.body

    if (payload.type === 'url_verification') {
        res.send(payload.challenge)
        return
    }

    if (payload.event.type === 'app_mention') {
        res.sendStatus(200)

        jarvis.response(payload)
        return
    }

    if (payload.event.type === 'message') {
        res.sendStatus(200)

        jarvis.response(payload)
        return
    }
})

module.exports = router
