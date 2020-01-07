import jimp from 'jimp'
import { UploadedFile } from 'express-fileupload'
import { EImageVariant } from '../types'

/**
 * @param image
 * Processes image and saves resized versions to static server
 * so it can be accessed by /images/360/${imageId}.png uri
 */
export default async function processImage(image: UploadedFile) {
  try {
    const imageId = image.md5

    const imageConfigList = [
      {
        variant: EImageVariant.PREVIEW,
        width: jimp.AUTO,
        height: 360,
        path: `./public/images/360/${imageId}.png`
      },
      {
        variant: EImageVariant.FULL,
        width: jimp.AUTO,
        height: 720,
        path: `./public/images/720/${imageId}.png`
      }
    ]

    const promises = imageConfigList.map(async (item) => {
      const { path, width, height } = item

      const jimpConstructor = await jimp.read(image.data)

      jimpConstructor
        .resize(width, height)
        // save to static server
        .write(path)
    })

    await Promise.all(promises)

    return {
      id: imageId,
      url: `/images/720/${imageId}.png`,
      urlPreview: `/images/360/${imageId}.png`
    }
  } catch (error) {
    console.error(`Image processing failure: Error: ${error}`)
  }
}
