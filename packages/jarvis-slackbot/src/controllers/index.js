import express from 'express'
const router = express.Router()

import JarvisController from './jarvis_controller'
router.use('/jarvis', JarvisController)

module.exports = router
