# asana-to-jira

This does some preprocessing on Asana CSV exports to make it easier to import to JIRA.

Process:

- Add parent task ID (from parent name) which allows importing subtasks
- Infer task type from parent id
- Infers epics and stories from epic column (currently hardcoded)
- Infer done column status from Date Completed

## Demo

[View working demo here](https://alegemaate.com/asana-to-jira/)

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
