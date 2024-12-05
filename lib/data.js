/**
 * Libreria para Data
 * Permite operaciones del (CRUD) al FS
 * Actuará sobre la carpeta oculta ".data/"
 */
import { error } from 'node:console'
import { promises } from 'node:dns'
import * as fs from 'node:fs/promises'
import * as path from 'node:path'

/**
 *  lee un archivo formato JSON y retorna un objeto
 * @param {string} folder - nombre carpeta
 * @param {string} fileName - nombre archivo
 * @returns {promises<object}
 * 
 * readFileJson -> leer archivo json
 */

export const readFile = async (folder, fileName) => {

  let readFileJson

  try {
    const filePath = path.join(folder, fileName)
    readFileJson = await fs.open(filePath)
    const data = await fs.readFile(readFileJson, { encoding: 'utf-8' })
    return JSON.parse(data)
  } catch (err) {
    console.error(err)
  } finally {
    /**
     * cerramos el archivo
     */
    if (readFileJson) {
      await readFileJson.close()
    }
  }
}
//console.log(await readFile('.data/anime', 'anime.json'))

/**
 * Reescribe el archivo anime.json
 * @param {*} folder 
 * @param {*} fileName 
 * @param {*} data 
 */
export const updateAnime = async (folder, fileName, data) => {

}






