const http = require('http');
const { Server } = require('socket.io');

export default class SocketServer {
    #io

    constructor({ port }) {
        this.port = port
    }

    async start () {
        const server = http.createServer( (req, res) => {
            res.writeHead(200, {
                'Acess-Control-Allow-Origin'
            })
            res.end('hey there!')
        })

        this.#io - new Server(server, {

            cors: {
                origin: '#',
                credentials: false
            }

        })

        return new Promise( (res, rej) => {
            server.on('err', rej)
            
            server.listen(this.port, () => res(server))
        })
    }
    
}