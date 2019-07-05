import { assert } from 'chai'
import { isWebP, applyFilters } from '../utils/helpers'

describe('utils/helpers.js', function() {
  describe('isWebP()', function() {
    const urlWithNoWebPFormat = 'https://img2.storyblok.com/f/59501/946x423/ea63afe874/bitmap.png'
    const urlWithWebPFormat =
      'https://img2.storyblok.com/filters:quality(100):format(webp)/f/59501/946x423/ea63afe874/bitmap.png'
    const urlWebPImage = 'https://img2.storyblok.com/f/59501/946x423/ea63afe874/bitmap.webp'

    it('should return false when the url is not passed', function() {
      assert.equal(isWebP(), false)
    })

    it('should return false when the url is not passed with "filters:format(webp)"', function() {
      assert.equal(isWebP(urlWithNoWebPFormat), false)
    })

    it('should return true when the url is passed with ":format(webp)"', function() {
      assert.equal(isWebP(urlWithWebPFormat), true)
    })

    it('should return true when the url is webp image', function() {
      assert.equal(isWebP(urlWebPImage), true)
    })
  })

  describe('applyFilters()', function() {
    it('should return true with passed filters', function() {
      const testFilters = ['fill(transparent)', 'format(png)']
      const testOutcome = `/filters:${testFilters.join(':')}`

      assert.equal(applyFilters(testFilters), testOutcome)
    })
  })
})
