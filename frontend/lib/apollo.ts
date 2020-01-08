import { withData } from 'next-apollo'
import { HttpLink } from 'apollo-boost'

const isBrowser = typeof window === 'object'

const config = {
  link: new HttpLink({
    uri: `http://${isBrowser ? 'localhost' : 'backend'}:5000/graphql`
  })
}

export default withData(config)
