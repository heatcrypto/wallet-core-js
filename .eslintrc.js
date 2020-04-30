module.exports = {
  "env": {
    "node": true,
    "es6": true
  },
  "extends": ["eslint:recommended", "plugin:mocha/recommended"],
  "globals": {
    "Atomics": "readonly",
    "SharedArrayBuffer": "readonly",
    "BigInt": true
  },
  "parserOptions": {
    "ecmaVersion": 2018,
    "sourceType": "module"
  },
  "rules": {
  },
  "plugins": [
    "mocha"
  ],
};