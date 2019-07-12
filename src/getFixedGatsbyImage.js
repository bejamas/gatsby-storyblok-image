import getBasicImageProps from './utils/getBasicImageProps'
import buildUrl from './utils/buildImageUrl'
import { isWebP, transformSrcSet } from './utils/helpers'
import { sizeMultipliersFixed, defaultFixedOptions } from './defaults'
import cacheImageInfo from './utils/cacheImageInfo'

function getFixedGatsbyImage(image, args = {}) {
  let imageProps = getBasicImageProps(image)

  if (!imageProps) {
    return null
  }

  let options = {
    ...defaultFixedOptions,
    ...args
  }

  let { width, height, base64, useBase64 } = options
  let {
    metadata: { dimensions, lqip },
    originalPath
  } = imageProps

  let desiredAspectRatio = dimensions.aspectRatio

  // If we're cropping, calculate the specified aspect ratio
  if (options.height) {
    desiredAspectRatio = width / options.height
  }

  let forceConvert = null
  if (options.toFormat) {
    forceConvert = options.toFormat
  } else if (isWebP(originalPath)) {
    forceConvert = 'jpg'
  }

  let widths = sizeMultipliersFixed.map(scale => Math.round(width * scale))
  let initial = { webp: [], base: [] }

  let srcSets = widths
    .filter(currentWidth => currentWidth < dimensions.width)
    .reduce((acc, currentWidth, i) => {
      let resolution = `${sizeMultipliersFixed[i]}x`
      let currentHeight = Math.round(currentWidth / desiredAspectRatio)

      let size = {
        ...options,
        width: currentWidth,
        height: currentHeight
      }

      let webpUrl = buildUrl(originalPath, {
        ...size,
        ...{ format: 'webp' }
      })

      let baseUrl = buildUrl(originalPath, {
        ...size,
        ...(forceConvert && { format: forceConvert })
      })

      acc.webp.push(`${webpUrl} ${resolution}`)
      acc.base.push(`${baseUrl} ${resolution}`)

      return acc
    }, initial)

  let outputHeight = Math.round(height ? height : width / desiredAspectRatio)

  let imgSize = {
    ...options,
    width: width,
    height: outputHeight
  }

  let src = buildUrl(originalPath, {
    ...imgSize,
    ...(forceConvert && { format: forceConvert })
  })

  let srcWebp = buildUrl(originalPath, {
    ...imgSize,
    ...{ format: 'webp' }
  })

  const isProduction = process.env.NODE_ENV === 'production'
  let srcPath, srcSetPath, srcWebpPath, srcSetWebpPath

  if (isProduction && options.saveLocal) {
    const [url] = src.split(' ')
    const imageName = url.split('/').slice(-1)
    cacheImageInfo({ imageName, src, srcSets, srcWebp })
    srcPath = `/static/${imageName}`
    srcSetPath = transformSrcSet(srcSets.base)
    srcWebpPath = `/static/${imageName}.webp`
    srcSetWebpPath = transformSrcSet(srcSets.base, '.webp')
  } else {
    srcPath = src
    srcSetPath = srcSets.base.join(',\n') || null
    srcWebpPath = srcWebp
    srcSetWebpPath = srcSets.webp.join(',\n') || null
  }

  // base64String
  

  return {
    base64: image.base64 || null,
    aspectRatio: desiredAspectRatio,
    width: Math.round(width),
    height: outputHeight,
    src: srcPath,
    srcSet: srcSetPath,
    srcWebp: srcWebpPath,
    srcSetWebp: srcSetWebpPath,
  }
}

export default getFixedGatsbyImage
