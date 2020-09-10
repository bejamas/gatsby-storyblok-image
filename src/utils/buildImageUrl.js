import { STORYBLOK_BASE_URL } from '../defaults'
import { applyFilters } from './helpers'

function buildImageUrl(originalPath, image) {
  let { width, height, smartCrop, quality, format, fill } = image

  let [, extension] = originalPath.split('.')

  let url = STORYBLOK_BASE_URL

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
  filters = filters.filter(element => Boolean(element) === true)

  if (filters.length > 0) {
    url += applyFilters(filters)
  }

  // add original path at the end
  url += `/${originalPath}`

  return url
}

export default buildImageUrl
