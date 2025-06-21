# Automation Activity

This project contains automated tests and scripts for the automation activity. It is built using Node.js and TypeScript along with Playwright for end-to-end testing.

## Prerequisites

- **Node.js**: Install the latest LTS version from [nodejs.org](https://nodejs.org/).
- **TypeScript**: Install globally by running `npm install -g typescript` or as a project dependency.
- **pnpm**: Install globally by running `npm install -g pnpm`.

## Setup

1. Clone this repository:

   ```bash
   git clone https://github.com/markjobenjoco/automation-activities.git
   ```

2. Install the dependencies using pnpm:

   ```bash
   pnpm install
   ```

3. (Optional) If TypeScript is not installed globally, you can run the TypeScript compiler using:
   ```bash
   npx tsc --version
   ```

## Available Scripts

The following scripts are defined in the package.json:

- **test**: Runs the Playwright tests.
  ```bash
  pnpm test
  ```
- **test:ui**: Launches the Playwright test runner in UI mode.
  ```bash
  pnpm test:ui
  ```
- **report**: Opens the Playwright test report.
  ```bash
  pnpm report
  ```

## Project Structure

- **/automation** - Contains automation scripts and configuration.
- **/tests** - Contains Playwright test files.
- **playwright.config.ts** - Configuration file for Playwright.
- **package.json** - Project dependencies and scripts.
