const path = require('path');

const buildFolder = 'dist';

module.exports = {
  context: path.resolve(__dirname, 'src'),
  entry: {
    main: './index.js'
  },
  output: {
    filename: 'muvment.js',
    path: path.resolve(__dirname, buildFolder),
    library: 'muvment'
  }
};

