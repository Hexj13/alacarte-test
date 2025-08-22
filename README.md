# ALaCarte E2E Testing Framework

## Project Description

This repository contains automated end-to-end tests for the A La Carte platform - a system for searching and booking tourism services.

## Technology Stack

<details>
<summary>List of technologies used in the project</summary>

- [TypeScript](https://www.typescriptlang.org/) - strongly typed programming language built on JavaScript
- [Playwright](https://playwright.dev/) - framework for web testing and automation
- [ESLint](https://eslint.org/) - static code analyzer
- [Allure](https://docs.qameta.io/allure/) - flexible lightweight multi-language test reporting tool

</details>

## How to set up and run tests

<details>
<summary>To set up</summary>

- Pull the branch
- Run `npm install` from the root folder
- Run `npx playwright install` from the root folder (only for the first setup)

</details>

<details>
<summary>To run tests locally</summary>

- To run all existing tests run `npm run test` from the root folder
- To run a specific test add the spec name to the previous command, e.g.
  `npm run test search.spec.ts`
- To run a specific test in debug mode use the `test:debug` script, e.g.
  `npm run test:debug search.spec.ts`

</details>

<details>
<summary>To run tests in Docker</summary>

- Make sure you have Docker installed and started
- Run `docker build -t alacarte-e2e .` from the root folder to build the Docker image
- Run `docker run --env-file ./.env alacarte-e2e` from the root folder
  to run the container and execute tests inside it

</details>

<details>
<summary>To generate and open Allure report locally</summary>

After tests run, the `allure-results` folder will be created.
To generate and open an Allure report locally, run from the root folder:

`npm run allure`

</details>

## Best practices and project conventions

<details>
<summary>XPath Guide</summary>

XPath (XML Path Language) is a query language used for navigating elements
within the structure of HTML or XML documents.
In this project, XPath is used for:

- Locating elements by their text or attributes
- Navigating the DOM hierarchy (up, down, forward, backward)
- Filtering elements using conditions like `not`, `contains`, `last()`, etc.
- Building selectors in complex and dynamic layouts

Below is a reference table covering all key constructs and functions
used in the project.

| XPath Expression                                                | Description                                                                                   |
|-----------------------------------------------------------------|-----------------------------------------------------------------------------------------------|
| `/`                                                             | Selects the **immediate child** of the current node (used for exact paths)                    |
| `//div`                                                         | Selects all `<div>` elements anywhere in the document                                         |
| `.`                                                             | Refers to the **current** node                                                                |
| `..`                                                            | Refers to the **parent** of the current node                                                  |
| `//input[@type="text"]`                                         | Finds all `<input>` elements with `type="text"`                                               |
| `//a[contains(@aria-label, "homepage")]`                        | Finds `<a>` elements where `aria-label` contains "homepage"                                   |
| `//input[@required]`                                            | Selects all `<input>` elements that **have** the `required` attribute                         |
| `//input[starts-with(@placeholder, "Enter")]`                   | Selects `<input>` where `placeholder` starts with "Enter"                                     |
| `//*[@*="some-value"]`                                          | Any element where **any attribute** equals `"some-value"`                                     |
| `//div[@role="dialog" and @aria-hidden="false"]`                | Selects `<div>` with both `role="dialog"` and `aria-hidden="false"`                           |
| `//div[@class="block"][last()]`                                 | Finds the **last** `<div>` with class `"block"`                                               |
| `//ul/li/span`                                                  | Finds all `<span>` elements inside `<li>` inside `<ul>`                                       |
| `//div/following-sibling::div/*[@viewBox]`                      | Finds children of following `div` siblings that have a `viewBox` attribute                    |
| `//section/descendant::button[text()="Submit"]`                 | Finds any `<button>` with text "Submit" inside a `<section>`                                  |
| `//div/parent::div/following-sibling::div[@role="listbox"]/div` | Finds a `div` inside a `div[role="listbox"]` that **follows the parent** of the current `div` |
| `//span[@class="label"]/preceding-sibling::input`               | Selects `<input>` that is a **preceding sibling** of `<span class="label">`                   |
| `//button/ancestor::form`                                       | Selects the closest ancestor `<form>` of a `<button>`                                         |
| `//button[text()="Submit"]`                                     | Finds a `<button>` with exact text "Submit"                                                   |
| `//span[text()="Done"]`                                         | Selects `<span>` with exact text "Done"                                                       |
| `//*[contains(text(), "Read more")]`                            | Finds any element containing the text "Read more"                                             |
| `//*[contains(., "text")]`                                      | Selects any element that **contains** the text "text", including text in **nested elements**  |
| `not(contains(text(), "Submit"))`                               | A condition: the text **does not contain** "Submit"                                           |
| `//div[1]//button[contains(@aria-label, "shopping cart")]`      | Finds a button inside the **first** `div`, where `aria-label` contains "shopping cart"        |
| `//div[3]`                                                      | Selects the **third** `<div>` among siblings at the same level                                |
| `//div[last()]`                                                 | Selects the **last** `<div>` in the current level                                             |
| `//li[position() < 3]`                                          | Finds the first two `<li>` elements                                                           |
| `//li[position() > 1 and position() < 4]`                       | Selects the 2nd and 3rd `<li>` elements                                                       |
| `//span[not(.//*[@viewBox])]`                                   | Finds `<span>` elements that **do not contain** any descendants with a `viewBox` attribute    |
| `//header[@id="header"]`                                        | Finds a `<header>` element with `id="header"`                                                 |

</details>

<details>
<summary>Code linting</summary>

After creating new tests or refactoring, be sure to use the configured linter before
pushing your changes for review.

- To analyze code and fix issues, run from the root folder:
  - `npm run lint` for analysis and getting a list of all issues
  - `npm run lint:fix` for automatic refactoring and fixing all found issues
  - `npm run lint:md` for analysis and getting a list of all
    [README.md](README.md) issues

</details>

<details>
<summary>Branching policy</summary>

Depending on the purpose of the work, different types of branches are used.
The naming conventions below help maintain clarity and consistency across the repository.

- `main` – the main stable branch used to run automated tests
- `feature/*` – temporary branches created for developing new automated tests,
  implementing new features or approaches, or improving the current test
  framework. The branch name should follow the format:
  `feature/<ticket_id>-<feature_name>`. Once merged, the branch must be deleted
- `bugfix/*` – temporary branches used to fix existing automated tests, unstable
  behavior, or other issues. The branch name should follow the format:
  `bugfix/<ticket_id>-<short_description>`. Once merged, the branch must be deleted

</details>

<details>
<summary>Creating a branch for development</summary>

To create a remote branch and check it out, follow these steps:

1. Make sure you don't have any local changes that haven't been stashed or pushed,
   as they may be lost
2. Run `git checkout main`
3. Run `git branch | grep -v "main" | xargs git branch -D`
4. Run `git fetch --prune`
5. Run `git pull origin main`
6. Run `git push origin main:<new_branch_name>`,
   e.g. `git push origin main:feature/TA-304-header`
7. Run `git checkout <new_branch_name>`,
   e.g. `git checkout feature/TA-304-header`

</details>

<details>
<summary>Rebase</summary>

Before publishing a pull request and asking for review, rebase your branch onto
`main` and make sure everything still works. General steps for the rebasing process onto the `main` branch:

1. Go to the branch that needs to be published to PR
2. Enter `git fetch origin` (This syncs your main branch with the latest changes)
3. Enter `git rebase origin/main`
4. Fix merge conflicts that arise
5. Enter `git rebase --continue`
6. Repeat the previous 2 steps as necessary as merge conflicts arise in
   later commits
7. Once the rebase is complete, enter `git push origin HEAD --force-with-lease`

You can learn more about rebasing in the official [git rebase](https://git-scm.com/docs/git-rebase)
documentation or in the article [The Ultimate Guide to Git Merge and Git Rebase](https://www.freecodecamp.org/news/the-ultimate-guide-to-git-merge-and-git-rebase/)

</details>

<details>
<summary>Pull Requests</summary>

All pull requests that are not in `Draft` status must comply with the requirements
listed below.  
After the pull request has been published and is ready for review, you must additionally
notify other AQAs.

- `General Requirements`
  - `Isolation`: A pull request should address a single specific task.  
    If a PR includes multiple concerns, it should be split into smaller ones.  
    For example, developing new tests should not be mixed with unrelated refactoring
    or improvements
  - `Title`:
    - Must be limited to 50 characters
    - Must not end with a period
    - Should use present tense or imperative mood
    - Must contain the task key
  - `Description`:
    - Must be clear and detailed
    - Must describe all the changes introduced
    - Must end with a period
    - Must include references to other PRs it depends on, if any
    - Must include links to documentation for new libraries/tools if they were added
    - Must include references to related tasks, documentation, CI artifacts, etc.,
      if needed
  - `Commits`:
    - All commits must be squashed into one
    - The branch must be rebased onto the latest `main` before the review
  - `Assignees`:
    - The PR author must assign themselves as the responsible person
    - Must maintain and accompany the pull request until it is completed
  - `Reviewers`:
    - The PR author must add all QA members as reviewers
- `Comments`
  - `Review Comments`:
    - All remarks and suggestions must be left as comments in the pull request
    - Comments must be constructive and aimed at improving the code
  - `Comment Resolution`: Every comment must be addressed:
    - Either by making the appropriate changes
    - Or by providing a clear explanation why the comment cannot be accepted

</details>

## Assignment of folders and files

<details>
<summary>Folders and files</summary>

All test files with the `.spec.ts` extension are stored in the [specs](src/specs) folder

- [eslint-rules](eslint-rules) - Here are all the supporting files with custom
  rules for [ESLint](https://eslint.org/)
- [fixtures](src/fixtures) - Here are all the supporting files with data
  that we are using in tests
- [pageobjects](src/pageobjects) - Here are page objects of all pages and components
  with elements of which we interact during running autotests
- [utils](src/utils) - Here are some helper functions, methods, and utils

At the root folder we have these files:

- [.editorconfig](.editorconfig) - configuration file that defines consistent coding
  styles (e.g., indentation, line endings) across different editors and IDEs
- [.gitignore](.gitignore) - file that specifies which files and directories
  to ignore in a Git repository
- [config.ts](config.ts) - checks that environment variables are set; exits the process
  with an error if not
- [eslint.config.mts](eslint.config.mts) - basic configuration file for [ESLint](https://eslint.org/)
- [global-setup.ts](global-setup.ts) - [Playwright](https://playwright.dev/)
  global setup script
- [Dockerfile](Dockerfile) - defines the instructions to build a Docker image for
  the project environment, including base image, dependencies, and setup commands
- [playwright.config.ts](playwright.config.ts) - basic configuration file for [Playwright](https://playwright.dev/)
- [tsconfig.json](tsconfig.json) - basic configuration file for [TypeScript](https://www.typescriptlang.org/)

</details>

## Allure TestOps

<details>
<summary>TestOps Test Suite Structure and Mapping</summary>

In our TestOps setup, we configured a structured approach to test suite nesting with
a **maximum depth of 3 levels**. At **any level of nesting**, you are allowed to
have both test cases and (if allowed by depth) nested suites.

To support this structure, we use custom fields:

- **Parent suite** (`psuite`) – the highest-level suite.  
  Can contain:
  - test cases
  - nested **Intermediate suites**

- **Intermediate suite** (`isuite`) – second-level suite.  
  Can contain:
  - test cases
  - nested **Suites**

- **Suite** (`suite`) – third-level suite.  
  Can contain:
  - test cases only (no further nesting allowed)

This suite hierarchy allows for a clear and consistent test organization,
while maintaining compatibility with TestOps reporting and dashboards.

### Label-Based Mapping

In TestOps, we configured **label-based mapping** to automatically assign test cases
and suites to the appropriate custom fields. This is done using the following labels:

- `psuite` → maps to **Parent suite**
- `isuite` → maps to **Intermediate suite**
- `suite` → maps to **Suite**

Make sure these labels are correctly set in your tests to ensure proper suite
assignment and display in TestOps.

</details>

<details>
<summary>Rules and Best Practices for Writing Tests</summary>

To ensure consistency and proper integration with Allure TestOps, all test
specifications must follow the rules outlined below.

### Allure Labeling via `allureSetup` Helper

A dedicated helper function `allureSetup` is used to apply appropriate labels
(`psuite`, `isuite`, `suite`) to each test case during execution. These labels
correspond to custom fields in Allure TestOps and are essential for maintaining
the proper hierarchical architecture of test cases.

---

### Required Setup in All Specs

Every spec must:

1. Include the following import:

   ```ts
   import { allureSetup } from '@utils/allureSetup';
   ```

2. Extend the Playwright test context using:

   ```ts
   const test = base.extend({
     page: async ({ page }, use, testInfo) => {
       await allureSetup(testInfo);
       await use(page);
     }
   });
   ```

This guarantees that each test is properly labeled and tracked in Allure TestOps.

</details>
