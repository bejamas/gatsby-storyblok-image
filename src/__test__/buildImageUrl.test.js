import { assert } from 'chai'
import buildImageUrl from '../utils/buildImageUrl'

const demoOrginalPath = 'f/39898/3310x2192/e4ec08624e/demo-image.jpeg'

describe('utils/buildImageUrl.js', function() {
  it('returns valid image url', function() {
    const testUrl = buildImageUrl(demoOrginalPath, { width: 315, height: 600, quality: 80, format: 'webp', fil: 'fff' })

    assert.equal(
      testUrl,
      'https://img2.storyblok.com/315x600/filters:quality:(80):format:(webp)/f/39898/3310x2192/e4ec08624e/demo-image.jpeg'
    )
  })

  it('image url does not contain format filter if the same as original image extension', function() {
    assert.notInclude(buildImageUrl(demoOrginalPath, { quality: 80, format: 'jpeg' }), 'format:')
  })

  it("image url contain 'smart' filter", function() {
    assert.include(buildImageUrl(demoOrginalPath, { quality: 80, format: 'jpeg', smartCrop: true }), '/smart')
  })

  it("image url contain 'fill' filter", function() {
    assert.include(buildImageUrl(demoOrginalPath, { quality: 80, format: 'jpeg', fill: 'ccc' }), 'fill:(ccc)')
  })

  it('image url does not have any filters', function() {
    assert.notInclude(buildImageUrl(demoOrginalPath, {}), '/filters:')
  })
})
