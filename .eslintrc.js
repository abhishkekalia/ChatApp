module.exports = {
  "extends": ["airbnb", "prettier"], // extend airbnb's JavaScript style guide: https://github.com/airbnb/javascript
  "parser": "babel-eslint", // allows us to parse the code with babel so that jsx code won't be considered an error
  "parserOptions": {
      "ecmaFeatures": { // specify which additional language features to use
          "jsx": true
      }
  },
  rules: {
      'global-require': 'off', // React Native images uses the require syntax so we're turning it off so that we don't get any errors
      'react/jsx-filename-extension': ['error', { extensions: ['.js', '.jsx'] }], // only return an error if JSX syntax is used on files other than those with .js or .jsx file extension
      "react-native/no-unused-styles": 2, // disallow unused styles
      "react-native/no-inline-styles": 2, // disallow styles declared within the component itself
      "react-native/no-color-literals": 2, // enforces variable names to be used for storing colors
      "import/no-extraneous-dependencies": 0,
      'indent': ['error', 4, { "SwitchCase": 1 }],
      "react/jsx-indent-props": 0,
      'max-len': 0,
      'import/no-unresolved': 0,
      'import/extensions': 0,
      'import/no-cycle': 0,
      'func-names': 0,
      'prefer-arrow-callback': 0,
      'react/jsx-wrap-multilines': 0,
      'react/jsx-indent': 0,
      'no-use-before-define': 0,
      'react/jsx-one-expression-per-line': 0,
      'react/jsx-pascal-case': 0,
      'camelcase': 0,
      'no-underscore-dangle': 0,
      'react/prop-types': 0,
      'no-lonely-if': 0,
      'block-scoped-var': 0,
      'no-shadow': 0,
      'react/no-access-state-in-setstate': 0,
      'no-console': 0,
      'prefer-const': 0,
      'array-callback-return': 0,
      'no-case-declarations': 0,
      'no-param-reassign': 0,
      'react/jsx-closing-tag-location': 0,
      'prefer-template': 0,
      'react/sort-comp': 0,
      'react/destructuring-assignment': 0,
      'react-native/no-inline-styles': 0,
      'no-unused-vars': 2,
      'no-unneeded-ternary': 0,
      'no-nested-ternary': 0,
      'no-else-return': 0,
      'no-alert': 0,
      'react/jsx-no-bind': 0,
      'prefer-destructuring': 0,
      'no-unused-expressions': 2,
      'eqeqeq': 0,
      'react/jsx-props-no-spreading': 0,
      'react/forbid-prop-types': 0
  },
  "plugins": [
      "react-native" // add eslint-plugin-react-native as a plugin for ESLint
  ],
  "env": {
      "react-native/react-native": true, // whitelist all browser-like globals
      "es6": true,
      "browser": true,
      "jest": true
  }
};
