import React from 'react'
import { gql } from 'apollo-boost'
import { useMutation } from '@apollo/react-hooks'

interface IProduct {
  id: string
  name: string
  description: string
  images: string[]
}

interface IProductItemProps extends IProduct {}

const PRODUCT_DELETE = gql`
  mutation productDelete($id: String!) {
    productDelete(id: $id) {
      name
      description
      images
    }
  }
`

const ProductItem: React.FunctionComponent<IProductItemProps> = (
  props: IProductItemProps
) => {
  const { id, name, description, images } = props

  const [productDelete] = useMutation(PRODUCT_DELETE, {
    variables: { id }
  })

  const handleClick = () => {
    productDelete()
  }

  return (
    <li key={id}>
      {images.map((imageUrl) => (
        <img
          key={imageUrl}
          src={`http://localhost:5000/images/360/${imageUrl}.png`}
          height="200px"
        />
      ))}
      <p>{name}</p>
      <p>{description}</p>
      <button onClick={handleClick}>Удалить</button>
    </li>
  )
}

export default ProductItem
