/**
 * Modelo Anime
 * index -> routes -> controller -> model -> data
 */

import { animeController } from "../controllers/animeController.js"
import { readFile, updateAnime } from "../lib/data.js"

export class AnimeModel {

  static folder = '.data/anime/'
  static fileName = 'anime.json'

  static async getAll() {
    let animes = await readFile(AnimeModel.folder, AnimeModel.fileName)
    return animes
  }

  static async createAndUpdateAnime(animes) {
    try {
      await updateAnime(AnimeModel.folder, AnimeModel.fileName, animes)
      return true
    } catch (err) {
      return false
    }
  }

}



