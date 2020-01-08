import React from 'react'
import Layout from '../lib/layout'
import Header from '../components/Header'
import ProductList from '../components/ProductList'
import withData from '../lib/apollo'
import ProductCreate from '../components/ProductCreate'

export default withData((props) => {
  return (
    <Layout>
      <Header />
      <ProductCreate />
      <ProductList />
    </Layout>
  )
})
