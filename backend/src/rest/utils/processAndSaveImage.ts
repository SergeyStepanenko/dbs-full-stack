import jimp from 'jimp'
import { UploadedFile } from 'express-fileupload'
import { EImageVariant } from '../types'

export default async function processAndSaveImage(image: UploadedFile) {
  const imageId = image.md5

  const imageMap = {
    [EImageVariant.PREVIEW]: {
      width: jimp.AUTO,
      height: 360,
      path: `./public/images/360/${imageId}.png`
    },
    [EImageVariant.FULL]: {
      width: jimp.AUTO,
      height: 720,
      path: `./public/images/720/${imageId}.png`
    }
  }

  const variantsToProcess = Object.keys(imageMap)

  const promises = variantsToProcess.map(async (variant) => {
    const { path, width, height } = imageMap[variant]

    const jimpConstructor = await jimp.read(image.data)

    jimpConstructor.resize(width, height).write(path)
  })

  await Promise.all(promises)

  return {
    id: imageId,
    url: `/images/720/${imageId}.png`,
    urlPreview: `/images/360/${imageId}.png`
  }
}
