import coreWebVitals from 'eslint-config-next/core-web-vitals'
import typescript from 'eslint-config-next/typescript'

/** @type {import('eslint').Linter.Config[]} */
const config = [
  ...coreWebVitals,
  ...typescript,
  // scratch/ holds throwaway one-off scripts that are not part of the site.
  { ignores: ['scratch/**'] },
  // scripts/*.js are plain Node CommonJS utilities, run with `node`, so require() is correct there.
  {
    files: ['scripts/**/*.js'],
    rules: { '@typescript-eslint/no-require-imports': 'off' },
  },
]

export default config
