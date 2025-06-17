module.exports = {
  extends: ['next/core-web-vitals'],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  rules: {
    '@typescript-eslint/no-unused-vars': 'off',
    'no-unused-vars': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    'react-hooks/exhaustive-deps': 'off', // 禁用 hooks 依赖检查
    '@next/next/no-img-element': 'off'
  },
  ignorePatterns: ['.eslintrc.js', 'next.config.ts']
}; 