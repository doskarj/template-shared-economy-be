# template-shared-economy-be
Template for a shared economy backend.

Tech-stack: GraphQL + MongoDB (mongoose); Mocha + Supertest + Chai + Faker; Webpack + Babel + ESLint.

## Notable scripts
`npm start` - Starts local development server with hot-reloading on `localhost:3000`.

`npm run build` - Compiles and minifies code for production to `/dist`. There is no `prod.env` file in GIT, so this won't work correctly on local machine. For that purpose you can use GITHub Actions to which the Secrets from repo will be passed and `prod.env` will be created.

`npm test` | `npm t` - Runs eslint and unit tests (`npm run eslint` and `npm run unit-test`).

`npm run unit-test` - Runs only unit tests with usage of `.env` file.

`npm run eslint` - Runs only unit eslint on `/src` and `/build` folders.

## How to clone and create new repo?

- Create the new-repo in github.
- go to local copy of the old repo, switch to a new branch e.g. `git checkout -b new-project`
- run `git push https://github.com/doskarj/new-repo.git +new-project:main`

https://stackoverflow.com/questions/9527999/how-do-i-create-a-new-github-repo-from-a-branch-in-an-existing-repo
