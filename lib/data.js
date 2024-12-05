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
  const filePath = path.join(folder, fileName)
  let readFileJson
  try {
    readFileJson = await fs.open(filePath, 'r+')

    if (!readFileJson) throw new Error('No existe archivo');

    try {
      /**
       * Tratamos de escribir
       * forzamos borrado con truncate
       */
      await readFileJson.truncate(0)
      await fs.writeFile(readFileJson, JSON.stringify(data), { encoding: 'utf8' })
    } catch (err) {
      console.error('Error escribiendo archivo', err)
    }

  } catch (err) {
    console.error("Error leyendo archivo", err)
  } finally {
    if (readFileJson) {
      await readFileJson.close()
    }
  }
}






