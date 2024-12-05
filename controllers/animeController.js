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
   * GET /api/anime/{id} Obtiene los datos de un anime por ID
   */

  /**
   * GET /api/anime/{nombre} Obtiene los datos de un anime por el Nombre
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