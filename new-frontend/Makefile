# Used by git pre-commit hook
pre-commit: format lint test

ci: check

check: lint test

lint: lint-lang

run:
	pnpm dev

format:
	pnpm run format

lint-lang:
	pnpm run lint:lang

test:
	pnpm run test:ci

test-browser:
	pnpm run test:browser

test-unit:
	pnpm run test:unit

coverage:
	pnpm run coverage


