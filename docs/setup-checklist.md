# Set up a TypeScript project with Express.js

## Project Initialization

- [x] Create project folder
- [x] Initialize npm with `npm init`

## Install Dependencies

- [x] Install `express` and `typescript`
- [x] Install type definitions: `@types/node`, `@types/express`

## Configuration

- [x] Create `tsconfig.json` using `tsc --init`
- [x] Update `tsconfig.json` with proper config (`rootDir`, `outDir`, `esModuleInterop`, etc.)
- [x] Create `eslint.config.mjs` for ESLint configuration
- [x] Create `prettier.config.mjs` for Prettier configuration
- [x] Create `husky` for Git hooks
- [x] Create `lint-staged` for staged files

## Create Source Files

- [x] Create `src/` directory
- [x] Create `src/index.ts` file as the app entry point

## Configure NPM Scripts

- [x] Add `dev`, `build`, and `start` scripts in `package.json`
- [x] Update `tsup.config.ts` with proper config (`entry`, `splitting`, `sourcemap`, etc.)
- [x] Add `format`, `lint`, and `lint:fix` scripts in `package.json`

## Run the App

- [x] Run `npm run dev`
- [x] Visit `http://localhost:3000` to verify the server is running

## (Optional) Setup Project Structure

- [x] Create envConfig.ts and validate environment variables

## Setup server

- [x] Create server.ts file
- [x] Setup rate limiter
- [x] Setup cors
- [x] Setup helmet
- [x] Setup body parser
- [x] Setup trust proxy
