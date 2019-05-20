"use strict";

exports.__esModule = true;
exports.applyFilters = applyFilters;
exports.isWebP = isWebP;

function applyFilters(filters) {
  return filters.reduce((acc, currentFilter, i) => {
    return `${acc}:${currentFilter}`;
  }, '/filters');
}

function isWebP(url) {
  const isConverted = url.includes('filters:format(webp)');
  const isOriginal = /[a-f0-9]+-\d+x\d+\.webp/.test(url);
  return isConverted || isOriginal;
}