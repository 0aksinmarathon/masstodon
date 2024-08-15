/* eslint-env node */

module.exports = {
	root: true,
	env: { browser: true, es2020: true },
	extends: [
		'eslint:recommended',
		'plugin:@typescript-eslint/recommended',
		'plugin:@typescript-eslint/recommended-requiring-type-checking',
		'plugin:react-hooks/recommended',
	],
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaVersion: 'latest',
		sourceType: 'module',
		// project: true,
		tsconfigRootDir: __dirname,
	},
	plugins: ['react-refresh'],
	rules: {
		'react-refresh/only-export-components': [
			'warn',
			{ allowConstantExport: true },
		],
		'@typescript-eslint/no-non-null-assertion': 'off',
		"@typescript-eslint/no-unused-vars": "off",
		'import/order': [
			'error',
			{
				groups: [
					'builtin',
					'external',
					'parent',
					'sibling',
					'index',
					'object',
					'type',
				],
				pathGroups: [
					{
						pattern: '{react,react-dom/**,react-router-dom}',
						group: 'builtin',
						position: 'before',
					},
					{
						pattern: '@src/**',
						group: 'parent',
						position: 'before',
					},
				],
				pathGroupsExcludedImportTypes: ['builtin'],
				alphabetize: {
					order: 'asc',
				},
				'newlines-between': 'always',
			},
		],
	},
};
