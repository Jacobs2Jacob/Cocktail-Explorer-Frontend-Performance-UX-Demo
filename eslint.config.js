import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';
import boundaries from 'eslint-plugin-boundaries';

export default tseslint.config(
    { ignores: ['dist'] },
    {
        files: ['**/*.{ts,tsx}'],
        extends: [js.configs.recommended, ...tseslint.configs.recommended],
        languageOptions: {
            ecmaVersion: 2020,
            globals: globals.browser,
        },
        plugins: {
            'react-hooks': reactHooks,
            'react-refresh': reactRefresh,
            'boundaries': boundaries,
        },

        // ARCHITECTURE BOUNDARIES
        settings: {
            'import/resolver': {
                typescript: {
                    project: './tsconfig.json',
                },
            },
            'boundaries/root-path': 'src',
            'boundaries/elements': [
                {
                    type: 'shared',
                    pattern: 'shared/**'
                },
                {
                    type: 'entities',
                    pattern: 'entities/**',
                    entry: 'index.ts',
                },
                {
                    type: 'features',
                    pattern: 'features/**',
                    entry: 'index.ts',
                },
                {
                    type: 'pages',
                    pattern: 'pages/**'
                },
                {
                    type: 'app',
                    pattern: 'app/**'
                },
            ],
        },

        rules: {
            ...reactHooks.configs.recommended.rules,
            'react-refresh/only-export-components': [
                'warn',
                { allowConstantExport: true },
            ],
            '@typescript-eslint/no-explicit-any': 'warn', 
            
            // IMPORT RULES
            'boundaries/element-types': [
                'error',
                {
                    default: 'disallow',
                    rules: [
                        { from: 'shared', allow: ['shared', 'features'] },
                        { from: 'entities', allow: ['shared', 'entities'] },
                        { from: 'features', allow: ['shared', 'entities', 'features'] },
                        { from: 'pages', allow: ['shared', 'entities', 'features'] },
                        { from: 'app', allow: ['*'] },
                    ],
                },
            ],

            // BLOCK PRIVATE FILE ACCESS
            'boundaries/no-private': 'error',
        },
    },
);