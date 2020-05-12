const express = require('express')
const postsRouter = require('./api/posts/pRouter.js')
const server = express()

server.use(express.json())
server.use('/api/posts', postsRouter)
server.listen(5000, () => console.log('Listening on port 5000'))