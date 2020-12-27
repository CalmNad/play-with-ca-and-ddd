# Commands

## Running in dev mode

```bash
npm run start:graphql:dev

# or

npm run compose:db:dev
npm run start:graphql:dev:nocompose
```

## Test

```bash
npm run test:graphql

# or

npm run compose:db:test
npm run test:graphql:nocompose

# execute the specified test suite with logging
DEBUG=hr* npm run test:graphql:nocompose profiles.read.integration.test
```
