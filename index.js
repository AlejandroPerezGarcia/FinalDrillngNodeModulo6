/**
 * Servidor HTTP Node
 * index -> routes -> controller -> model -> data
 */

import * as http from 'node:http'
import { router } from './routes.js'

const port = process.argv[2] || 4000

const server = http.createServer(router)

server.listen(port, () => { console.log(`Servidor en puerto ${port}`) })