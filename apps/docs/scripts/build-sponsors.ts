/**
 * This module was inspired by chakra-ui ❤️
 */


import {promises as fs} from 'fs'
import path from 'path'

import ImageSharp from './image-sharp'

import { getSponsors } from '@/utils/get-sponsors'



const publicDir = path.join(process.cwd(), 'public')
const sponsorsDir = path.join(publicDir, 'sponsors')


async function buildSponsors() {
  const sponsors = await getSponsors()

  // cache sponsor image
  const sponsorCache = new ImageSharp({
    outputDirectory: sponsorsDir,
  })

  // update the image property from open-collective to use the cached image
  const allSponsors = await Promise.all(
    sponsors.map(async (s) => {
      const filename = await sponsorCache.urlToFile(
        s.image,
        s.MemberId.toString(),
      )

      return {
        ...s,
        image: `/sponsors/${filename}`,
      }
    }),
  )


  await fs.writeFile('.sponsorsrc', JSON.stringify(allSponsors, null, 2))
}


async function build() {
  // make sure the sponsors directory exists
  try {
    await fs.access(sponsorsDir);
  } catch (error) {
    await fs.mkdir(sponsorsDir, { recursive: true });
  }
  await Promise.all([buildSponsors()])
}

try {
  build()
} catch (err) {
  // eslint-disable-next-line no-console
  console.log(err)
}
