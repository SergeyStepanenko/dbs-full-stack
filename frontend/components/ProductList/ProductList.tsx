import React from 'react'
import { gql } from 'apollo-boost'
import { useQuery } from '@apollo/react-hooks'
import isEmpty from 'lodash/isEmpty'

interface IProductListProps {}

const GET_PRODUCT_LIST = gql`
  query products {
    products {
      _id
      name
      description
      images
    }
  }
`

interface IProduct {
  _id: string
  name: string
  description: string
  images: string[]
}

interface IProductListQuery {
  products: IProduct[]
}

const ProductList: React.FunctionComponent<IProductListProps> = () => {
  const { loading, error, data: { products = [] } = {} } = useQuery<
    IProductListQuery
  >(GET_PRODUCT_LIST)

  if (error) {
    return <p>Ошибка</p>
  }

  if (loading) {
    return <p>Загружается...</p>
  }

  if (isEmpty(products)) {
    return <p>Товаров нет</p>
  }

  return (
    <ul>
      {products.map(({ _id, name, description, images }) => (
        <li key={_id}>
          {images.map((imageUrl) => (
            <img
              key={imageUrl}
              src={`http://localhost:5000/images/360/${imageUrl}.png`}
              height="200px"
            />
          ))}
          <p>{name}</p>
          <p>{description}</p>
        </li>
      ))}
    </ul>
  )
}

export default ProductList
