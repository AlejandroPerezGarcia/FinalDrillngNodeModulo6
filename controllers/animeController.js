/**
 * Tiene como responsabilidad el manejo HTTP de los Anime
 * index -> routes -> controller -> model -> data
 */

import { AnimeModel } from "../models/animeModel.js"
import * as url from "node:url"

export const animeController = async (req, res, payloadBruto, urlparts) => {
  const queryParams = url.parse(req.url, true)

  /**
   * GET /api/animes  Obtiene todos los datos del JSON
   */
  if (req.method == 'GET' && !urlparts[2] && !queryParams.search) {
    try {
      let animes = await AnimeModel.getAll()
      res.writeHead(200, 'OK', { "content-type": "application/json" })
      res.end(JSON.stringify(animes))
    } catch (err) {
      res.writeHead(500, 'Internal Server Error', { "content-type": "application/json" })
      res.end(JSON.stringify({ message: err.message }))
    }
  }
  /**
     * GET /api/anime/{nombre} Obtiene los datos de un anime por el Nombre
     */
  /**
   * Con queryString
   * /api/beatles?search
   */
  else if (req.method == 'GET' && !urlparts[2] && queryParams.search) {
    const { nombre } = queryParams.query;
    const animes = await AnimeModel.getAll()

    let ids = Object.keys(animes)

    for (let id of ids) {
      let anime = animes[id]

      if (!anime.nombre.toLowerCase().includes(nombre.toLocaleLowerCase())) {
        delete animes[id]
      }
    }

    let remainingKeys = Object.keys(animes)

    if (remainingKeys.length == 0) {
      res.writeHead(404, 'Not Found', { "content-type": "application/json" })
      return res.end(JSON.stringify({ message: 'No se encontraron animes' }))
    } else {
      res.writeHead(200, 'OK', { "content-type": "application/json" })
      return res.end(JSON.stringify(animes))
    }

  }
  /**
   * GET /api/anime/{id} Obtiene los datos de un anime por ID
   */



  /**
   * POST /api/anime + payload Crea un anime nuevo 
   */

  /**
   * DELETE /api/anime/{id}  Elimina un anime por ID
   */

  /**
   * PUT /api/anime/{id} + payload Acatualiza un anime por ID
   */

}