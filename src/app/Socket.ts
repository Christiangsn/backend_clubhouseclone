import http from 'http'
import { Server } from 'socket.io'

type IServerTypes = {
    port: number | string
}

export class SocketServer {
    public readonly port: number | string
    private io: Server

    constructor ({ port } : IServerTypes) {
      this.port = port
    }

    public async start (): Promise<http.Server> {
      const server = http.createServer((request, response) => {
        response.writeHead(200, {
          'Acess-Control-Allow-Origin': '*',
          'Acess-Control-Allow-Methods': 'OPTIONS,POST,GET'
        })

        response.end('Hey There')
      })

      const room = this.io.of('/room')
      room.on('connection', socket => socket {
        
      })

      this.io = new Server(server, {
        cors: {
          origin: '*',
          credentials: false
        }
      })

      return new Promise((resolve, reject) => {
        server.on('error', reject)

        server.listen(this.port, () => resolve(server))
      })
    }
}
