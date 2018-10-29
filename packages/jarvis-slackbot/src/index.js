import cluster from 'cluster'
import express from 'express'
import bodyParser from 'body-parser'

import routes from './controllers'

const numCPUs =
    process.env.NODE_SINGLE_CORE == 1 ? 1 : require('os').cpus().length
if (cluster.isMaster) {
    // Fork workers.
    for (var i = 0; i < numCPUs; i++) {
        var env = {
            // Custom env here
        }

        cluster.fork(env)
    }

    cluster.on('exit', function(worker, code, signal) {
        console.log(`worker ${worker.process.pid} died ${code} ${signal}`)
    })
} else {
    startExpressServer()
    // startSlackRTM()
}

function startExpressServer(port = 3000, env = 'production') {
    const app = express()
    app.use(bodyParser.json())
    app.use(routes)

    app.get('/', function(req, res) {
        res.send('Jarvis Bot is running')
    })

    app.listen(port, () => console.log(`App listening on port ${port}!`))
}
