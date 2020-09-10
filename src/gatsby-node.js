const path = require('path')

const axios = require('axios')
const fs = require('fs-extra')

const CACHE_DIR = path.resolve(`.cache/storyblok/assets/`)

exports.onPostBuild = async function fetchAndSaveCachedImages() {
  let cachedImgs = []
  const files = await fs.readdir(CACHE_DIR)

  let readFiles = files.map(async file => {
    const image = await fs.readJson(CACHE_DIR + '/' + file)
    cachedImgs.push(image)
    return Promise.resolve()
  })

  await Promise.all(readFiles)

  await Promise.all(
    cachedImgs.map(async ({ name, src, srcSet, srcWebp, srcSetWebp }) => {
      await Promise.all(
        srcSet.map(async src => {
          const [url, dim] = src.split(' ')
          const imageName = url.split('/').slice(-1)
          
          return streamWriteFile(url, `${dim}--${imageName}`)
        }),
      )
      await Promise.all(
        srcSetWebp.map(async src => {
          const [url, dim] = src.split(' ')
          const imageName = url.split('/').slice(-1)
          
          return streamWriteFile(url, `${dim}--${imageName}.webp`)
        }),
      )
      
      await streamWriteFile(src, name)
      await streamWriteFile(srcWebp, `${name}.webp`)
      return Promise.resolve()
    }),
  )
}

exports.onPreBuild = async function handlePreBuild() {
  await fs.ensureDir(CACHE_DIR)
  return
}

async function streamWriteFile(src, name) {
  const imagePath = path.resolve(`public/static/${name}`)
  const isImageExists = await fs.pathExists(imagePath)

  if (isImageExists) return Promise.resolve()

  const response = await axios({
    method: `get`,
    url: src,
    responseType: `stream`,
  })

  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(imagePath)
    response.data.pipe(file)
    file.on(`finish`, resolve)
    file.on(`error`, reject)
  })
}