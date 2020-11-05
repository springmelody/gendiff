install:
	npm install
	npm link
lint:
	npx eslint .
publish:
	npm publish --dry-run
test:
	npm test
rec:
	asciinema rec
test-coverage:
	npm test -- --coverage --coverageProvider=v8
