# asana-to-jira

This does some preprocessing on Asana CSV exports to make it easier to import to JIRA.

Process:

- Infer task type from parent id
- Infers epics and stories from epic column (currently hardcoded)
- Infer done column status from Date Completed

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

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).
