module.exports = {
    root: true,
    env: { browser: true, es2020: true },
    extends: [
        'eslint:recommended',
        'plugin:react/recommended',
        'plugin:react/jsx-runtime',
        'plugin:react-hooks/recommended',
    ],
    ignorePatterns: ['dist', '.eslintrc.cjs'],
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: {
            jsx: true,
        },
    },
  settings: { react: { version: 'detect' } },
   plugins: ['react', 'react-hooks', 'react-refresh'],
    rules: {
        'react-refresh/only-export-components': 'warn',
        'no-unused-vars': 'off',

        'react/prop-types': 'off',
    },
}
