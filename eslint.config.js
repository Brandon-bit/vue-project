import js from '@eslint/js'
import globals from 'globals'
import vue from 'eslint-plugin-vue'
import typescript from '@typescript-eslint/eslint-plugin'
import parser from '@typescript-eslint/parser'
import { defineConfig, globalIgnores } from 'eslint/config'
import eslintPluginPrettier from 'eslint-plugin-prettier'
import eslintPluginImport from 'eslint-plugin-import'

export default defineConfig([
    globalIgnores(['dist', 'node_modules']),
    {
        files: ['**/*.{ts,tsx,vue}'],
        extends: [
            js.configs.recommended,
            'plugin:vue/vue3-recommended',
            'plugin:@typescript-eslint/recommended',
            'plugin:import/recommended',
            'plugin:import/typescript',
            'plugin:prettier/recommended'
        ],
        languageOptions: {
            parser,
            parserOptions: {
                ecmaVersion: 'latest',
                sourceType: 'module',
                extraFileExtensions: ['.vue'],
                ecmaFeatures: {}
            },
            globals: globals.browser
        },
        rules: {
            'no-unused-vars': 'off',
            '@typescript-eslint/no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]' }],
            'import/newline-after-import': ['error', { count: 1 }],
            'prettier/prettier': 'error'
        },
        plugins: {
            vue,
            '@typescript-eslint': typescript,
            import: eslintPluginImport,
            prettier: eslintPluginPrettier
        }
    }
])
