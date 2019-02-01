const path = require('path');

const buildFolder = 'dist';

module.exports = {
  context: path.resolve(__dirname, 'src'),
  entry: {
    main: './index.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: [{
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          }
        }]
      }
    ]
  },
  output: {
    filename: 'muvment.js',
    path: path.resolve(__dirname, buildFolder),
    library: 'muvment'
  }
};

