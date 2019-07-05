import { assert } from 'chai'

import getBasicImageProps, { validImageUrlPattern } from '../utils/getBasicImageProps'

const demoImageUrl = '//a.storyblok.com/f/39898/3310x2192/e4ec08624e/demo-image.jpeg'

describe('utils/getBasicImageProps.js', function() {
  describe('check valid image URL', function() {
    it('should return true with passed url', function() {
      const testURL = demoImageUrl
      assert.match(testURL, validImageUrlPattern)
    })

    it('should return false with passed url (wrong image dimensions)', function() {
      const testURL = '//a.storyblok.com/f/39898/33102192/e4ec08624e/demo-image.jpeg'
      assert.notMatch(testURL, validImageUrlPattern)
    })

    it('should return false with passed url (no random string before image name)', function() {
      const testURL = '//a.storyblok.com/f/39898/3310x2192/demo-image.jpeg'
      assert.notMatch(testURL, validImageUrlPattern)
    })

    it('should return false with passed url (whitespaces in image name)', function() {
      const testURL = '//a.storyblok.com/f/39898/3310x2192/e4ec08624e/demo image.jpeg'
      assert.notMatch(testURL, validImageUrlPattern)
    })
  })

  describe('getBasicImageProps()', function() {
    const demoImageProperty = getBasicImageProps(demoImageUrl)

    it('passed valid image url return object with metadata property', function() {
      assert.property(demoImageProperty, 'metadata')
    })

    it('passed valid image url return object with originalPath property', function() {
      assert.exists(demoImageProperty, demoImageProperty.originalPath)
    })

    it('passed valid image url return object with originalPath property', function() {
      assert.exists(demoImageProperty, demoImageProperty.extension)
    })

    it('return value when passed valid image url as an object', function() {
      assert.isOk(getBasicImageProps({ image: demoImageUrl }))
    })

    it('should return false if no image url passed', function() {
      assert.isFalse(getBasicImageProps())
    })
  })
})
