import { assert } from 'chai'

import getBasicImageProps, { validImageUrlPattern } from '../utils/getBasicImageProps'

const demoImageUrl = '//a.storyblok.com/f/39898/3310x2192/e4ec08624e/demo-image.jpeg'

const demoB64 =
  'iVBORw0KGgoAAAANSUhEUgAAABgAAAAMCAYAAAEPN03jAAAAAXNSR0IArs4c6QAAAQNJREFUOBFjYIAB7Sh3Jhib4f+/HXA2KkMnUo8RVQTI04r4z8DI8A1DHLcASAcQIGzErRSHDMgE7chNMFlGsCNgPEI0I8MUQkqAvor8y/D/P6ZvserUiYxBFyfguf9CYCcbJAjANBLQAFX268d7Bq2oaBCPNE9z8rHBbMJO60TkgZ2kHXEbpoCwkxgZahmurlCFaaCMBrsAGOzaETW4gp6wiwg64T8Tw3+GZmDq+Qe06DYDMEkjayEtUJF1EmIzMU5mYOctZiGkjmR5UN77z5TGcGXZUpBeIpMsDmtAcfCPYSJYlpFxMwMrexzDhQUfkFVT6APGdwyMjB4MV5ftRDYUmQ0A7ag8A4ShMMQAAAAASUVORK5CYII='

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

    it('return true if object contain valid base64', function() {
      const imageProperties = getBasicImageProps({ image: demoImageUrl, base64: demoB64 })
      const base64RegExp = /^([A-Za-z0-9+/]{4})*([A-Za-z0-9+/]{3}=|[A-Za-z0-9+/]{2}==)?$/
      assert.property(imageProperties.metadata, 'lqip')
      assert.match(imageProperties.metadata.lqip, base64RegExp)
    })
  })
})
