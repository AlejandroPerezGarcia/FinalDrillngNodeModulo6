import { publicController } from "./controllers/publicController.js"

export const router = (req, res) => {
  const url = req.url
  const urlParts = url.split('/').filter(part => !!part)

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
     */
    /* else if (urlParts[0] == 'api' && urlParts[1] == 'anime') {
      userController(req, res, payloadBruto, urlParts)
    } */
    /**
     * 404 not found
     */
    else {
      res.writeHead(404, 'Not Found', { "content-type": "text/plain" })
      res.end('No encontrado')
    }
  })
}