const path = require('path')
const Dotenv = require('dotenv-webpack')

// TODO: Get rid of LICENSE.txt file

module.exports = {
  entry: {
    index: './src/index.js',
  },
  output: {
    path: path.join(__dirname, '../dist'),
    publicPath: '/',
    filename: '[name].js'
  },
  target: 'node',
  node: {
    __dirname: false,
    __filename: false,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  },
  plugins: [
    new Dotenv({
      path: './config/prod.env'
    })
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '../src/'),
      '@mongo': path.resolve(__dirname, '../src/mongo'),
      '@QL': path.resolve(__dirname, '../src/QL'),
      '@utils': path.resolve(__dirname, '../src/utils'),
    }
  },
}
