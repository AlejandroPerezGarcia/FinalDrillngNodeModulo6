/**
 * Modelo Anime
 * index -> routes -> controller -> model -> data
 */

import { readFile } from "../lib/data.js"

export class AnimeModel {

  static folder = '.data/anime/'
  static fileName = 'anime.json'

  static async getAll() {
    let animes = await readFile(AnimeModel.folder, AnimeModel.fileName)
    return animes
  }

}



