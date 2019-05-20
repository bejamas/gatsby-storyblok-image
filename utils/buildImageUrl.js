"use strict";

exports.__esModule = true;
exports.default = void 0;

var _defaults = require("../defaults");

var _helpers = require("./helpers");

function buildImageUrl(originalPath, image) {
  let {
    width,
    height,
    smartCrop,
    quality,
    format,
    fill
  } = image;
  let [, extension] = originalPath.split('.');
  let url = _defaults.STORYBLOK_BASE_URL;

  if (width && height) {
    url += `/${width}x${height}`;
  }

  if (smartCrop) {
    url += `/smart`;
  }

  let filters = [...(quality && `quality:(${quality})`), ...(format && format !== extension && `format:(${format})`), ...(fill && `fill:(${fill})`)]; // remove falsy elements

  filters = filters.filter(element => Boolean(element) === true);

  if (filters.length > 0) {
    url += (0, _helpers.applyFilters)(filters);
  } // add original path at the end


  url += `/${originalPath}`;
  return url;
}

var _default = buildImageUrl;
exports.default = _default;