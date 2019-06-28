export function applyFilters(filters) {
  return filters.reduce((acc, currentFilter, i) => {
    return `${acc}:${currentFilter}`
  }, '/filters')
}

export function isWebP(url) {
  if (!url) return false

  const isConverted = url.includes('filters:format(webp)')
  const isOriginal = /[a-f0-9]+-\d+x\d+\.webp/.test(url)
  return isConverted || isOriginal
}
