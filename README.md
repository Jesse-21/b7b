# B7B, an open-source [BEB](https://github.com/bebverse/protocol) dimension browser

<img src="./b7b_logo.png" width="200" />

B7B is a static web client for the open BEB Protocol. It is not tied to or centralized to BEBverse servers, and uses an open-source [resolver contract](https://github.com/bebverse/contracts) to browse and query dimensions.

## Contribution Guidelines

The **bebverse/b7b** repo follows the [conventional commits guidelines](https://www.conventionalcommits.org/en/v1.0.0/#summary), please be sure to respect them when committing.

When opening a Pull Request and you are not already a core contributor to [@bebverse](https://github.com/bebverse), be sure to explain your pull request in greater detail so there's less churn when reviewing and we can get your changes landed ASAP, thank you!

### Setup

```
$ cd app
$ yarn install
$ yarn dev
```

### Testing Production

Production is static files with hash routing, you can serve these files with any tool, e.g.:

```
$ cd docs
$ python3 -m http.server
```
