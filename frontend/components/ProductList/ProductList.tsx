import React from 'react'
import { gql } from 'apollo-boost'
import { useQuery } from '@apollo/react-hooks'
import isEmpty from 'lodash/isEmpty'

interface IProductListProps {}

const GET_PRODUCT_LIST = gql`
  query products {
    products {
      name
      type
      description
      barcode
    }
  }
`

interface IProduct {
  name: string
  description: string
  barcode: string
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
      {products.map(({ name, description }) => (
        <li key={name}>
          <p>{name}</p>
          <p>{description}</p>
        </li>
      ))}
    </ul>
  )
}

export default ProductList
