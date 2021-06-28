module.exports = {
  'extends': ['taro/react'],
  'root': true,
  'globals': { wx: true },
  'parser': 'babel-eslint',
  'parserOptions': {
    'sourceType': 'module'
  },
  'env': {
    'browser': true,
    'commonjs': true,
    'node': true,
  },
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
    'no-irregular-whitespace': 1,
    'no-empty-function': 1,
    'no-lone-blocks': 1,
    'no-new-wrappers': 2,
    'no-restricted-modules': 0,
    'no-mixed-requires': 0,
    'no-restricted-imports': 0
  }
}
