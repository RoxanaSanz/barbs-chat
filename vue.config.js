const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    proxy: 'https://sellia-web-page-test.s3.us-east-2.amazonaws.com/'
  }
})