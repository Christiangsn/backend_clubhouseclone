import http from 'http';
import { Server } from 'socket.io';

export default class SocketServer {
    #io

    constructor({ port }) {
        this.port = port
    }

    async start () {
        const server = http.createServer( (req, res) => {
            res.writeHead(200, {
                'Acess-Control-Allow-Origin': '#',
                'Acess-Control-Allow-Methods': 'OPTIONS, POST, GET'
            })
            res.end('hey there!')
        })

        this.#io = new Server(server, {

            cors: {
                origin: '#',
                credentials: false
            }

        })

        const room = this.#io.of('/room') 
        room.on('connection', socket => {
            socket.emit('userConnection', 'socket id is connected' + socket.id)

            socket.on('joinRoom', (dados) => {
                console.log('estes são os dados recebidos', dados)

            })
        })

        return new Promise( (res, rej) => {
            server.on('err', rej)
            
            server.listen(this.port, () => res(server))
        })
    }
    
}