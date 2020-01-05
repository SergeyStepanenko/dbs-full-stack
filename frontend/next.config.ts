// @ts-ignore
import withCSS from '@zeit/next-css'

export default withCSS({
  target: 'serverless',
  env: {
    BACKEND_URL: process.env.BACKEND_URL
  },
  webpackDevMiddleware: (config) => {
    config.watchOptions = {
      poll: 2000,
      aggregateTimeout: 300
    }
    return config
  }
})
