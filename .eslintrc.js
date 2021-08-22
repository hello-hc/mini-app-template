module.exports = {
  'extends': ['taro/react'],
  'root': true,
  'globals': { wx: true },
  'parser': 'babel-eslint',
  'parserOptions': {
    'sourceType': 'module'
  },
  'env': {
    'browser': true
  },
  'extends': 'standard',
  'rules': {
    // allow paren-less arrow functions
    'arrow-parens': 0,
    // allow async-await
    'generator-star-spacing': 0,
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    'space-before-function-paren': 0,
    'semi': [2, "always"],
    'handle-callback-err': 0,
    'no-shadow': 0,
  }
}
