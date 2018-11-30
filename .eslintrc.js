module.exports = {
	env: {
		node: 1,
		browser: 1
	},
	extends: ['airbnb', 'prettier', 'prettier/react'],
	plugins: ['prettier'],
	rules: {
		'react/jsx-filename-extension': [
			1,
			{
				extensions: ['.js', '.jsx']
			}
		],
		'react/prop-types': 0,
		'no-underscore-dangle': 0,
		'import/imports-first': ['error', 'absolute-first'],
		'import/newline-after-import': 'error',
		indent: ['error', 'tab'],
		'linebreak-style': ['error', 'unix'],
		quotes: ['error', 'single'],
		semi: ['error', 'never'],
		'no-console': 0
	},
	globals: {
		window: true,
		document: true,
		localStorage: true,
		FormData: true,
		FileReader: true,
		Blob: true,
		navigator: true
	}
}
