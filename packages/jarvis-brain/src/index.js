'use strict'

let _instance = null
class JarvisBrain {
    constructor() {
        if (!_instance) {
            _instance = this
        }

        return _instance
    }

    // Jarvis always listen your message. Will think and give her thought after that.
    // You are fee to wait her thought or skip
    // All messages will be kept tracked
    async listen(message, context=null) {
        return new Promise(resolve => {
            console.log(message)
          	// Add basic flow
            if (message.includes('hey')) {
                const random = Math.floor(Math.random() * 10)
                var replyMessage = ''
                if (random % 2 == 0) {
                    replyMessage = 'Hello'
                } else {
                    replyMessage = 'Jarvis is listening!'
                }

                return resolve(replyMessage)
            }
        })
    }
}

class JarvisContext {
    constructor(uuid, source, context) {
        this.uuid = uuid
        this.source = source
        this.context = context
    }
}

module.exports.JarvisContext = JarvisContext
module.exports.jarvisBrain = new JarvisBrain()