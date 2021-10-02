# Next UI Contributing Guide

Hello!, I am very excited that you are interested in contributing with Next UI. However, before submitting your contribution, be sure to take a moment and read the following guidelines.

- [Code of Conduct](https://github.com/jrgarciadev/nextui/blob/main/CODE_OF_CONDUCT.md)
- [Extraction request guidelines](#pull-request-guidelines)
- [Development Setup](#development-setup)
- [Tests](#tests)
- [Visual Changes](#visual-changes)
- [Documentation](#documentation)
- [Breaking Changes](#breaking-changes)
- [Becoming a maintainer](#becoming-a-maintainer)

## Pull Request Guidelines

- The `main` branch is basically a snapshot of the latest stable version. All development must be done in dedicated branches.
- Make sure that Github Actions are green
- It is good to have multiple small commits while working on the PR. We'll let GitHub squash it automatically before the merge.
- If you add a new feature:
  - Add the test case that accompanies it.
  - Provide a compelling reason to add this feature. Ideally, I would first open a suggestion topic and green it before working on it.
- If you correct an error:
  - If you are solving a special problem, add (fix #xxxx [, # xxx]) (# xxxx is the problem identification) in your PR title for a better launch record, for example update entities encoding / decoding (fix # 3899).
  - Provide a detailed description of the error in the PR. Favorite live demo.
  - Add the appropriate test coverage, if applicable.

## Development Setup

After cloning the repository, execute the following commands in the root folder:

1. Install dependencies

```bash
yarn

#or

yarn install
```

We use [Yarn](https://yarnpkg.com/) for dependency management and for the project workspaces.

2. Run development environment

```bash
yarn dev
```

This command will start the `Next.js` development server for the documentation and the `Storybook` server.

## Tests

All commits that fix bugs or add features need a test. You can run `yarn test -- src/button ` for component specific tests.

## Visual Changes

When making a visual change, please provide screenshots
and/or screencasts of the proposed change. This will help us to understand the
desired change easier.

Until NextUI has a stable release new components will be created only for the core team.

## Documentation

Please update the docs with any API changes, the code and docs should always be in sync.

The main documentation lives in the `packages/docs/content` folder, the project uses MDX and all `NextUI` are already imported.

## Breaking changes

Breaking changes should be accompanied with deprecations of removed functionality. The deprecated APIs themselves should not be removed until the minor release after that.

## Becoming a maintainer

If you are interested in becoming a NextUI maintainer, start by
reviewing issues and pull requests. Answer questions for those in need of
troubleshooting. Join us in the
[Discord Community](https://discord.gg/9b6yyZKmH4) chat room.
Once we see you helping, either we will reach out and ask you if you want to
join or you can ask one of the current maintainers to add you. We will try our
best to be proactive in reaching out to those that are already helping out.

GitHub by default does not publicly state that you are a member of the
organization. Please feel free to change that setting for yourself so others
will know who's helping out. That can be configured on the [organization
list](https://github.com/orgs/nextui-org/people) page.

Being a maintainer is not an obligation. You can help when you have time and be
less active when you don't. If you get a new job and get busy, that's alright.
