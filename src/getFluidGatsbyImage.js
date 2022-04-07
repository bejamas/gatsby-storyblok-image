import getBasicImageProps from './utils/getBasicImageProps'
import buildUrl, { buildLowFiUrl } from './utils/buildImageUrl'
import { isWebP } from './utils/helpers'
import { sizeMultipliersFluid, defaultFluidOptions } from './defaults'

function getFluidGatsbyImage(image, args = {}) {
  let imageProps = getBasicImageProps(image)

  if (!imageProps) {
    return null
  }

  let options = {
    ...defaultFluidOptions,
    ...args
  }

  let { maxWidth, base64, useBase64 } = options

  let {
    metadata: { dimensions, lqip },
    originalPath
  } = imageProps

  let desiredAspectRatio = dimensions.aspectRatio

  // If we're cropping, calculate the specified aspect ratio
  if (options.maxHeight) {
    desiredAspectRatio = maxWidth / options.maxHeight
  }

  let maxHeight = options.maxHeight || Math.round(maxWidth / dimensions.aspectRatio)

  let forceConvert = null
  if (options.toFormat) {
    forceConvert = options.toFormat
  } else if (isWebP(originalPath)) {
    forceConvert = 'jpg'
  }

  let sizes = options.sizes || `(max-width: ${maxWidth}px) 100vw, ${maxWidth}px`
  let widths = sizeMultipliersFluid
    .map((scale) => Math.round(maxWidth * scale))
    .filter((width) => width < dimensions.width)
    .concat(dimensions.width)

  let initial = { webp: [], base: [] }
  let srcSets = widths
    .filter((currentWidth) => currentWidth < dimensions.width)
    .reduce((acc, currentWidth) => {
      let currentHeight = Math.round(currentWidth / desiredAspectRatio)

      let size = {
        width: currentWidth,
        height: currentHeight
      }

      let webpUrl = buildUrl(originalPath, {
        ...options,
        ...size,
        ...{ format: 'webp' }
      })

      let baseUrl = buildUrl(originalPath, {
        ...options,
        ...size,
        ...{ format: forceConvert }
      })

      acc.webp.push(`${webpUrl} ${currentWidth}w`)
      acc.base.push(`${baseUrl} ${currentWidth}w`)
      return acc
    }, initial)

  let imgSize = { width: maxWidth, height: maxHeight }

  let src = buildUrl(originalPath, {
    ...options,
    ...imgSize,
    ...{ format: forceConvert }
  })

  let srcWebp = buildUrl(originalPath, {
    ...options,
    ...imgSize,
    ...{ format: 'webp' }
  })

  return {
    base64: buildLowFiUrl(originalPath, { width: maxWidth, height: maxHeight, aspectRatio: desiredAspectRatio }),
    aspectRatio: desiredAspectRatio,
    src,
    // srcWebp,
    srcSet: srcSets.base.join(',\n') || null,
    // srcSetWebp: srcSets.webp.join(',\n') || null,
    sizes
  }
}

export default getFluidGatsbyImage
