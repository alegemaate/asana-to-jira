# Asana to Jira

[![Build and Deploy](https://github.com/alegemaate/asana-to-jira/actions/workflows/deploy-pages.yml/badge.svg)](https://github.com/alegemaate/asana-to-jira/actions/workflows/deploy-pages.yml) [![Maintainability](https://api.codeclimate.com/v1/badges/56ebdc88c8294c446739/maintainability)](https://codeclimate.com/github/alegemaate/asana-to-jira/maintainability)

This does some preprocessing on Asana CSV exports to make it easier to import to JIRA.

Process:

- Add parent task ID (from parent name) which allows importing subtasks
- Infer task type from parent id
- Infers epics from custom Epic field
- Infer done column status from Date Completed

## Demo

[View working demo here](https://alegemaate.com/asana-to-jira/)

## Note

For epic imports you will need a Company Managed project. They do not work with Team managed because of limitations of the uploader.

## Project setup

```
yarn install
```

### Compiles and hot-reloads for development

```
yarn serve
```

### Compiles and minifies for production

```
yarn build
```

### Run your unit tests

```
yarn test:unit
```

### Lints and fixes files

```
yarn lint
```
