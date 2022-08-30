module.exports = {
  root: false,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/essential',
    '@vue/airbnb'
  ],
  plugins: [
    'vue',
  ],
  globals: {
    wx: true,
    WeixinJSBridge: true,
  },
  rules: {
    // 'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    // 'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    "camelcase": [0, {"properties": "always"}],
    'quotes': 0,
    'comma-dangle': 0,
    'arrow-parens': 'off',
    'no-console': 0,
    'semi': 0,
    'operator-linebreak': 'error',
    "object-curly-newline": 0,
    "object-curly-newline": 0,
    "max-len": 0,
  },
  parserOptions: {
    parser: 'babel-eslint',
  },
  overrides: [
    {
      files: ["**/__tests__/*.{j,t}s?(x)"],
      env: {
        jest: true
      },
    },
  ],
};
