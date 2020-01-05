import jimp from 'jimp'
import { UploadedFile } from 'express-fileupload'
import { PATH_TO_IMAGES } from '../constants'
import { EImageVariant } from '../types'

export default async function processAndSaveImage(image: UploadedFile) {
  const imageMap = {
    [EImageVariant.PREVIEW]: {
      width: jimp.AUTO,
      height: 360,
      path: `./${PATH_TO_IMAGES}/360/${image.md5}.png`
    },
    [EImageVariant.FULL]: {
      width: jimp.AUTO,
      height: 720,
      path: `./${PATH_TO_IMAGES}/720/${image.md5}.png`
    },
    [EImageVariant.ORIG]: {
      path: `./${PATH_TO_IMAGES}/orig/${image.md5}.png`
    }
  }

  const variantsToProcess = Object.keys(imageMap)

  variantsToProcess.forEach(async (variant) => {
    const { path, width, height } = imageMap[variant]
    const jimpConstructor = await jimp.read(image.data)

    switch (variant) {
      case EImageVariant.ORIG: {
        jimpConstructor.write(path)

        break
      }

      default: {
        jimpConstructor.resize(width, height).write(path)
      }
    }
  })

  return image.md5
}
