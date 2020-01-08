import { Schema, model, Document } from 'mongoose'
import { IProduct } from 'global-types'
import { BaseTime, preSaveAddBaseTime } from './base'
import { defaultSchemaOptions } from './utils'

export interface IProductModel extends IProduct, BaseTime, Document {}

const modelSchema = new Schema<IProduct>(
  {
    name: { type: String, required: false },
    description: String,
    images: [{ type: String, required: true }]
  },
  defaultSchemaOptions
)

modelSchema.pre('save', preSaveAddBaseTime)

export const ProductModel = model<IProductModel>('Product', modelSchema)

export function getProducts(limit = 100) {
  return ProductModel.find().limit(limit)
}

export function addProduct(input: IProduct) {
  const rec = ProductModel.create(input)

  return rec
}

export function removeProduct({ id }) {
  return ProductModel.findByIdAndRemove(id)
}
