const validImageUrlPattern = /^(https?:)?\/\/a.storyblok.com\/f\/[0-9]+\/[0-9]+x[0-9]+\/[A-Za-z0-9]+\/[\S]+\.[a-z]+/

function getBasicImageProps(image) {
  let url = null
  let lqip = null

  if (typeof image === 'string') {
    url = image
  }

  if (typeof image === 'object') {

    if ( image.fieldtype === "asset" ) {

      url = image.filename;

    } else {
      
      url = image.image
      lqip = image.base64 ? image.base64 : null

    }
  }

  url = validImageUrlPattern.test(url) ? url : null

  if (!url) {
    return false
  }

  /*
  *  http://a.storyblok.com/
  *  https://a.storyblok.com/
  *  //a.storyblok.com/
  */
  const storyblokRegex = /^(https?:)?\/\/a.storyblok.com\//
  
  let originalPath = url.replace(storyblokRegex, '')

  let [, , dimensions, , filename] = originalPath.split('/')
  let [width, height] = dimensions.split('x').map(num => parseInt(num, 10))
  let [, extension] = filename.split('.')

  let aspectRatio = width / height
  let metadata = { dimensions: { width, height, aspectRatio }, lqip }

  return {
    originalPath,
    extension,
    metadata
  }
}

export default getBasicImageProps
