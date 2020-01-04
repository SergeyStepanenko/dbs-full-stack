import React from 'react'
import Layout from '../lib/layout'
import Header from '../components/Header'
import ProductList from '../components/ProductList'
import withData from '../lib/apollo'

export default withData((props) => {
  return (
    <Layout>
      <Header />
      <ProductList />
    </Layout>
  )
})
