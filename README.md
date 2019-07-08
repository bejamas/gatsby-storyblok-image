# gatsby-storyblok-image

_gatsby-storyblok-image_ lets you use gatsby-image together with Storyblok outside of GraphQL.

## Install

`npm i gatsby-storyblok-image`

or

`yarn add gatsby-storyblok-image`

## Usage

### Fixed image

```javascript
import SbEditable from 'storyblok-react'
import Img from 'gatsby-image'
import { getFixedGatsbyImage } from 'gatsby-storyblok-image'

const FixedImage = ({ blok }) => {
  const fixedProps = getFixedGatsbyImage(blok.image, {
    width: 900
  })

  return (
    <SbEditable content={blok}>
      <Img fixed={fixedProps} />
    </SbEditable>
  )
}

export default FixedImage
```

---

### Fluid image

```javascript
import SbEditable from 'storyblok-react'
import Img from 'gatsby-image'
import { getFluidGatsbyImage } from 'gatsby-storyblok-image'

const FluidImage = ({ blok }) => {
  const fluidProps = getFluidGatsbyImage(blok.image, {
    maxWidth: 900
  })

  return (
    <SbEditable content={blok}>
      <Img fluid={fluidProps} />
    </SbEditable>
  )
}

export default FluidImage
```

## To do

- [ ] improve readme
- [ ] add tests
- [ ] add demo website

## Credits

This plugin is inspired by Sanity's way of implementing gatsby-image outside of GraphQL in their gatsby-source-sanity plugin.
