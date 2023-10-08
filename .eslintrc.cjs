module.exports = {
	root: true,
	env: { browser: true, es2020: true },
	extends: [
		// By extending from a plugin config, we can get recommended rules without having to add them manually.
		'eslint:recommended',
		'plugin:react/recommended',
		'plugin:import/recommended',
		'plugin:jsx-a11y/recommended',
		'plugin:react/jsx-runtime',
		'plugin:react-hooks/recommended',
		// This disables the formatting rules in ESLint that Prettier is going to be responsible for handling.
		// Make sure it's always the last config, so it gets the chance to override other configs.
		'eslint-config-prettier',
	],
	ignorePatterns: ['dist', '.eslintrc.cjs'],
	parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
	settings: {
		react: {
			// Tells eslint how to resolve imports
			version: 'detect',
		},
		'import/resolver': {
			node: {
				paths: ['src'],
				extensions: ['.js', '.jsx', '.ts', '.tsx'],
			},
		},
	},
	plugins: ['react-refresh'],
	rules: {
		// Add your own rules here to override ones from the extended configs.
		'react-refresh/only-export-components': [
			'warn',
			{ allowConstantExport: true },
		],
	},
};
