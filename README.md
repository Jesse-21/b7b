# B7B - A BEB Protocol Client

<img src="./b7b_logo.png" width="200" />

B&B is a static web client for the open BEB Protocol. It is not tied to or centralized to BEBverse, and uses an open source resolver contract to query dimensions.

## Contribution Guidelines

The **bebverse/b7b** repo follows the [conventional commits guidelines](https://www.conventionalcommits.org/en/v1.0.0/#summary), please be sure to respect them when committing.

When opening a Pull Request and you are not already a core contributor to [@bebverse](https://github.com/bebverse), be sure to explain your pull request in greater detail so there's less churn when reviewing and we can get your changes landed ASAP, thank you!

### Setup

```
$ cd app
$ yarn install
$ yarn start
```

### Testing Production

Production is static files with hash routing, you can serve these files with any tool, e.g.:

```
$ cd docs
$ python3 -m http.server
```
