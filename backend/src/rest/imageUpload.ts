import isEmpty from 'lodash/isEmpty'
import { Request, Response } from 'express-serve-static-core'
import { UploadedFile } from 'express-fileupload'

export default function imageUpload(req: Request, res: Response) {
  try {
    if (isEmpty(req.files)) {
      return res.status(400).send('No files were uploaded.')
    }

    let image = req.files.image as UploadedFile

    const imageId = image.md5

    image.mv(`public/images/${imageId}`, (err) => {
      if (err) {
        return res.status(500).send(err)
      }

      res.send({ id: imageId })
    })
  } catch (error) {
    throw new Error('Image uploading failure')
  }
}
