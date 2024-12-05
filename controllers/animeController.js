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
  else if (req.method == 'GET' && urlparts[2] && urlparts.length <= 3) {
    let anime = await AnimeModel.getById(urlparts[2])

    if (anime) {
      res.writeHead(200, 'OK', { "content-type": "application/json" })
      res.end(JSON.stringify(anime))
    } else {
      res.writeHead(404, 'Not Found', { "content-type": "application/json" })
      res.end(JSON.stringify({ message: 'anime no encontrado' }))
    }
  }

  /**
   * POST /api/anime + payload Crea un anime nuevo 
   */

  else if (req.method == 'POST' && !urlparts[2]) {
    try {
      let data = JSON.parse(payloadBruto)
      let id = crypto.randomUUID()

      let animes = await AnimeModel.getAll() // 1
      animes[id] = data //2

      let status = await AnimeModel.createAndUpdateAnime(animes)
      if (status) {
        res.writeHead(201, 'Created', { "content-type": "application/json" })
        res.end(JSON.stringify({ message: 'Anime Creado' }))
      } else {
        res.writeHead(500, 'Internal Server Error', { "content-type": "application/json" })
        res.end(JSON.stringify({ message: 'Error interno al crear un Anime' }))
      }
    } catch (err) {
      res.writeHead(400, 'Bad Request', { "content-type": "application/json" })
      res.end(JSON.stringify({ message: 'Solicitud mal hecha' }))
    }
  }

  /**
  * PUT /api/anime/{id} + payload Acatualiza un anime por ID
  */

  else if (req.method == 'PUT' && urlparts[2]) {
    try {
      let animes = await AnimeModel.getAll()
      let anime = await AnimeModel.getById(urlparts[2])

      if (anime) {
        try {
          let payload = JSON.parse(payloadBruto)
          anime = { ...anime, ...payload } // anime (singular) actualizado
          animes[urlparts[2]] = anime // Actualizamos todos los animes

          await AnimeModel.createAndUpdateAnime(animes)

          res.writeHead(200, 'OK', { "content-type": "application/json" })
          return res.end(JSON.stringify({ message: 'updated', anime }))
        } catch (err) {
          res.writeHead(400, 'Bad Request', { "content-type": "application/json" })
          return res.end(JSON.stringify({ message: 'Payload mal formado' }))
        }
      } else {
        res.writeHead(404, 'Not Found', { "content-type": "application/json" })
        return res.end(JSON.stringify({ message: 'anime no encontrado' }))
      }
    } catch (err) {
      res.writeHead(100, 'algo', { "content-type": "application/json" })
      return res.end(JSON.stringify({ message: err.message }))
    }
  }

  /**
  * DELETE /api/anime/{id}  Elimina un anime por ID
  */

  else if (req.method == 'DELETE' && urlparts[2]) {
    let animes = await AnimeModel.getAll()

    let ids = Object.keys(animes)
    if (ids.includes(urlparts[2])) {
      delete animes[urlparts[2]]

      await AnimeModel.createAndUpdateAnime(animes)

      res.writeHead(200, 'OK', { "content-type": "application/json" })
      return res.end((JSON.stringify({ message: "Anime eliminado con éxito" })))
    } else {
      res.writeHead(404, 'Not Found', { "content-type": "application/json" })
      return res.end(JSON.stringify({ message: "Anime no encontrado" }))
    }
  }

}