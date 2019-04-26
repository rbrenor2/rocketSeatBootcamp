const server = require('./server')

server.listen(process.env.PORT || 3000) // if there is a PORT variable in the env, if not use port 3000
