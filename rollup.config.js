const path = require('path')
const cjs = require('rollup-plugin-commonjs')
const node = require('rollup-plugin-node-resolve')

const version = process.env.VERSION || require('./package.json').version
const banner =
  `/*!
  * @spices/cayenne v${version}
  * (c) ${new Date().getFullYear()} Alexandre Masy
  * @license All right reserved. see license.md
  */`

const resolve = _path => path.resolve(__dirname, _path)

module.exports = [
  {
    entry: resolve('src/index.js'),
    file: resolve('dist/spices-cayenne.js'),
    format: 'umd',
    env: 'development'
  },
  {
    entry: resolve('src/index.js'),
    file: resolve('dist/spices-cayenne.min.js'),
    format: 'umd',
    env: 'production'
  },
  {
    entry: resolve('src/index.js'),
    file: resolve('dist/spices-cayenne.esm.min.js'),
    format: 'es',
    env: 'production'
  }
].map(config)

function config(opts) {
  const ret = {
    input: opts.entry,
    output: {
      banner,
      format: opts.format,
      file: opts.file,
      name: 'SpicesCayenne'
    },
    plugins: [
      node(),
      cjs(),
    ]
  }

  return ret;
}