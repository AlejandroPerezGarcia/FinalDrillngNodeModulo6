/**
 * index -> routes -> controller -> model -> data
 */

import { animeController } from "./controllers/animeController.js"
import { publicController } from "./controllers/publicController.js"

export const router = (req, res) => {
  const url = req.url
  const urlParts = url.split('/').filter(part => !!part).map(part => part.split('?')[0])

  let _url = new URL(req.url, `https://${req.headers.host}`)
  //let queryParams = _url.searchParams

  let payloadBruto = '' // @todo generar payload desde evento data

  req.on('data', chunk => {
    payloadBruto += chunk
  })

  req.on('end', () => {
    /**
     * /public
     */
    console.log(req.method, req.url)
    if (urlParts[0] != 'api') {
      publicController(req, res, urlParts)
    }
    /**
     * Ruta API Anime
     * localhost:4000/api/animes
     */
    else if (urlParts[0] == 'api' && urlParts[1] == 'animes') {
      animeController(req, res, payloadBruto, urlParts)
    }
    /**
     * 404 not found
     */
    else {
      res.writeHead(404, 'Not Found', { "content-type": "text/plain" })
      res.end('No encontrado')
    }
  })
}