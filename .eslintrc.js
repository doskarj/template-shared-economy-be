module.exports = {
  'env': {
    'es6': true,
    'node': true
  },
  'extends': 'eslint:recommended',
  'globals': {
    'Atomics': 'readonly',
    'SharedArrayBuffer': 'readonly',
    'describe': 'readonly',
    'it': 'readonly',
    'expect': 'readonly',
    'before': 'readonly',
    'after': 'readonly',
    'beforeEach': 'readonly'
  },
  'parserOptions': {
    'ecmaVersion': 2018,
    'sourceType': 'module'
  },
  'rules': {
    'indent': [
      'error',
      2
    ],
    'linebreak-style': [
      'error',
      'unix'
    ],
    'quotes': [
      'error',
      'single'
    ],
    'semi': [
      'error',
      'never'
    ],
    'no-trailing-spaces': [
      'error',
      { 'skipBlankLines': true }
    ]
  }
}