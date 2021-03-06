module.exports = {
  'env': {
    'browser': true,
    'es2021': true
  },
  'extends': [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended'
  ],
  'parser': '@typescript-eslint/parser',
  'parserOptions': {
    'ecmaVersion': 13
  },
  'plugins': [
    '@typescript-eslint'
  ],
  'globals': {
    'process': 'writable',
    'Promise': 'off'
  },
  'rules':
    {
      'typeof': 'off'
    }

}
