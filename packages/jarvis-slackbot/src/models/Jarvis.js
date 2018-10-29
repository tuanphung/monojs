// https://slackapi.github.io/node-slack-sdk/rtm_api
import { jarvisBrain, JarvisMessage } from 'jarvis-brain'
import { RTMClient } from '@slack/client'
import schedule from 'node-schedule'

let _instance = null

class JarvisSlackBot {
    constructor() {
        if (!_instance) {
            _instance = this

            this.token =
                'xoxb-385493649940-465198908544-8oWvOPKDRWhiyt7VqpY86oNb'
            this.rtm = new RTMClient(this.token)
            this.queue = []
            this.wakeUp()
        }

        return _instance
    }

    wakeUp() {
        this.rtm.start()
        this.rtm.on('connected', () => {
            console.log(
                `SlackRTM is connected under bot ${this.rtm.activeUserId}!`
            )
        })

        var fn = () => {
            if (this.queue.length == 0) return

            let task = this.queue.shift() // get an item from the beginning of queue
            if (!task) return

            this.sendMessage(task.replyMessage, task.context)
        }

        this.queueWorker = schedule.scheduleJob('*/3 * * * * *', fn)
    }

    sleep() {
        console.log('Jarvis never sleep!')
    }

    sendMessage(message, inContext) {
        console.log(inContext)

        // Lookup conversationID from context
        const conversationID = inContext.event.channel
        if (!conversationID) return

        if (inContext.event.user === this.rtm.activeUserId) return

        this.rtm
            .sendMessage(message, conversationID)
            .then(res => {
                console.log('Message sent: ', res.ts)
            })
            .catch(console.error)
    }

    queueContext(inContext, replyMessage) {
        let results = this.queue.filter(
            task =>
                task.context.event.client_msg_id ===
                inContext.event.client_msg_id
        )
        if (results.length == 0) {
            this.queue.push({ context: inContext, replyMessage: replyMessage })
        } else {
            console.log('Skip! Message is already in queue')
        }
    }

    response(inContext) {
        console.log(inContext)
        const fn = async () => {
            console.log(inContext.event.text)
            const reply = await jarvisBrain.listen(inContext.event.text)
            this.queueContext(inContext, reply)
        }
        fn()
    }
}

module.exports = JarvisSlackBot

// { token: 'BVuTUldLkCYwBpqjaAWMB1mI',
//   team_id: 'TBBEHK3TN',
//   api_app_id: 'ADQ3Y5Q3X',
//   event:
//    { type: 'app_mention',
//      user: 'UBB0S2ZR6',
//      text: '<@UDP5USQG0>',
//      client_msg_id: '1db6305c-9b0b-4d8d-bd90-e8b4d055f66e',
//      ts: '1540660372.004700',
//      channel: 'GDPTMTMAN',
//      event_ts: '1540660372.004700' },
//   type: 'event_callback',
//   event_id: 'EvDQ4BDXS9',
//   event_time: 1540660372,
//   authed_users: [ 'UDP5USQG0' ] }
