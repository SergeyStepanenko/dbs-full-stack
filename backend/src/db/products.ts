import { Schema, model, Document } from 'mongoose'
import { BaseTime, preSaveAddBaseTime } from './base'

export interface Product {
  name: string
  description: string
  images: string[]
}

export interface ProductModel extends Product, BaseTime, Document {}

const modelSchema = new Schema<Product>({
  name: { type: String, required: false },
  description: String,
  images: [{ type: String, required: true }]
})

modelSchema.pre('save', preSaveAddBaseTime)

export const ProductModel = model<ProductModel>('Product', modelSchema)

export function getProducts(limit = 100) {
  return ProductModel.find().limit(limit)
}

export function addProduct(input: Product) {
  const rec = ProductModel.create(input)

  return rec
}

export function removeProduct({ _id }) {
  return ProductModel.findByIdAndRemove(_id)
}
