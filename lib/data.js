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
    await readFileJson.close()
  }

}
//console.log(await readFile('.data/anime', 'anime.json'))


/**
 *  Buscas dato nuevo de anime en especifico por id del archivo anime.json 
 * @param { string } folder - Nombre de carpeta
 * @param { string } fileName - Nombre de archivo
 * @param {*} id  -> Indentificador de id para Busqueda por id
 * @returns { Promise<void> }
 */

export const searchId = async (folder, fileName, id = null) => {
  let readFileJson

  try {
    const filePath = path.join(folder, fileName)
    readFileJson = await fs.open(filePath, 'r')  // 'r' para solo lectura
    const data = await fs.readFile(filePath, { encoding: 'utf-8' })  // Lee el archivo
    const animes = JSON.parse(data)  // Parseamos el contenido JSON

    if (id) {
      // Verificamos si el id existe y lo retornamos
      const anime = animes[id]  // Buscamos el anime directamente por id
      return anime || null  // Si el id no existe, retornamos null
    }

    return animes  // Si no se pasa un id, retornamos todos los animes

  } catch (err) {
    console.error(err)
  } finally {
    // Cerramos el archivo si se abrió
    if (readFileJson) {
      await readFileJson.close()
    }
  }
}

// Ejemplo de uso
//console.log(await readFile2('.data/anime', 'anime.json', 1))  // Busca el anime con id = 1

/**
 *  Buscas dato nuevo de anime en especifico por Nombre del archivo anime.json 
 * @param { string } folder - Nombre de carpeta
 * @param { string } fileName - Nombre de archivo
 * @param {string} nombre -> Indentificador de Nombre para Busqueda por Nombre
 * @returns { Promise<void> }
 */

export const searchName = async (folder, fileName, nombre = null) => {
  let readFileJson

  try {
    const filePath = path.join(folder, fileName)
    readFileJson = await fs.open(filePath, 'r')  // 'r' para solo lectura
    const data = await fs.readFile(filePath, { encoding: 'utf-8' })  // Lee el archivo
    const animes = JSON.parse(data)  // Parseamos el contenido JSON

    if (nombre) {
      // Buscamos el anime por nombre
      const anime = Object.values(animes).find(a => a.nombre.toLowerCase() === nombre.toLowerCase())
      return anime || null  // Si no se encuentra el anime, retorna null
    }

    return animes  // Si no se pasa un nombre, retornamos todos los animes

  } catch (err) {
    console.error(err)
  } finally {
    // Cerramos el archivo si se abrió
    if (readFileJson) {
      await readFileJson.close()
    }
  }
}

//console.log(await readFile3('.data/anime', 'anime.json', 'Naruto'))


/**
 * Crea dato nuevo de anime del archivo anime.json 
 * 
 * @param {string} folder -> Nombre carpeta
 * @param {string} fileName -> Nombre de archivo
 * @param {string} id -> indentificador del datos a agregar 
 * @param {object} data ->  Contenido para reescribir
 */
export const createAnime = async (folder, fileName, data, id) => { }


/**
 * Actualiza dato de anime del archivo anime.json 
 * 
 * @param {string} folder -> Nombre carpeta
 * @param {string} fileName -> Nombre de archivo
 * @param {string} id -> indentificador del datos a modificar  
 * @param {object} data ->  Contenido para reescribir
 */

export const updateAnime = async (folder, fileName, data, id) => { }


/**
* Elimina dato de anime del archivo anime.json 
 * @param {string} folder -> Nombre carpeta
 * @param {string} fileName -> Nombre de archivo
 * @param {string} id -> indentificador del datos a eliminar  
 * @param {object} data ->  Contenido para reescribir
 */
export const deleteAnime = async (folder, fileName, id, data) => { }







