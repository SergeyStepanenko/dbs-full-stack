import React from 'react'
import { useMutation } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'
import { Form, H1, Input } from './styles'

const CREATE_PRODUCT = gql`
  mutation addProduct(
    $name: String!
    $description: String!
    $images: [String!]!
  ) {
    addProduct(name: $name, description: $description, images: $images) {
      name
      description
      images
    }
  }
`

export default function ProductCreate() {
  const [name, setName] = React.useState('Продукт тест')
  const [description, setDescription] = React.useState('Какое-то описание')
  const [images, setImages] = React.useState([
    '783c2a6b13184f2a77450a1ff6dba4c0'
  ])

  const [addProduct, { error, data }] = useMutation(CREATE_PRODUCT, {
    variables: { name, description, images }
  })

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (name === '' || description === '' || images.length === 0) {
      console.error('Error')

      return false
    }

    try {
      addProduct()
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <Form onSubmit={handleSubmit}>
      <H1>Submit</H1>
      <Input
        placeholder="title"
        name="title"
        onChange={(event) => setName(event.target.value)}
        value={name}
      />
      <Input
        placeholder="url"
        name="url"
        onChange={(event) => setDescription(event.target.value)}
        value={description}
      />
      <button type="submit">Submit</button>
    </Form>
  )
}
