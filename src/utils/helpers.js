export function applyFilters(filters) {
  return filters.reduce((acc, currentFilter, i) => {
    return `${acc}:${currentFilter}`
  }, '/filters')
}

export function isWebP(url) {
  const isConverted = url.includes('filters:format(webp)')
  const isOriginal = /[a-f0-9]+-\d+x\d+\.webp/.test(url)
  return isConverted || isOriginal
}

export function transformSrcSet(srcSet, suffix = '') {
  return srcSet
    .map(src => {
      const [url, dim] = src.split(' ')
      const imageName = url.split('/').slice(-1)
      return `/static/${dim}--${imageName}${suffix} ${dim}`
    })
    .join(',\n')
}