import React from 'react'
import { gql } from 'apollo-boost'
import { useQuery, useMutation } from '@apollo/react-hooks'
import isEmpty from 'lodash/isEmpty'
import ProductItem from '../ProductItem'

interface IProductListProps {}

const GET_PRODUCT_LIST = gql`
  query products {
    products {
      id
      name
      description
      images
    }
  }
`

interface IProduct {
  id: string
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
      {products.map((product) => (
        <ProductItem key={product.id} {...product} />
      ))}
    </ul>
  )
}

export default ProductList
