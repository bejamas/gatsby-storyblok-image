import { STORYBLOK_BASE_URL } from '../defaults'
import { applyFilters } from './helpers'

function buildImageUrl(originalPath, image) {
  let { width, height, smartCrop, quality, format, fill } = image

  let [, extension] = originalPath.split('.')

  let url = STORYBLOK_BASE_URL

  url += `/${originalPath}/m`

  if (width && height) {
    url += `/${width}x${height}`
  }

  if (smartCrop) {
    url += `/smart`
  }

  let filters = [
    ...[quality && `quality(${quality})`],
    ...[format && format !== extension && `format(${format})`],
    ...[fill && `fill(${fill})`]
  ]

  // remove falsy elements
  filters = filters.filter((element) => Boolean(element) === true)

  if (filters.length > 0) {
    url += applyFilters(filters)
  }

  return url
}

export function buildLowFiUrl(originalPath, { width, height, aspectRatio }) {
  return buildImageUrl(originalPath, {
    width: (width / 3).toFixed(0),
    height: (height / 3).toFixed(0),
    quality: 10
  })
}

export default buildImageUrl
