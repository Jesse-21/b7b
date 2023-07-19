# B7B - an open-source [BEB](https://github.com/bebprotocol/protocol) dimension browser

_See [bebprotocol/universe](https://github.com/bebprotocol/universe) for the active development of beb.quest dimensions._

<img src="./b7b_logo.png" width="200" />

[B7B](https://b7b.xyz) is a static web client for beb.quest. It is not tied to or centralized to beb.quest, and uses an open-source [resolver contract](https://github.com/bebprotocol/contracts) to browse and query dimensions.

### Deployments:

- **Production:** [b7b.xyz](https://b7b.xyz)
  - Deployed manually with `railway up`, served with `yarn start`.
- _Development:_ [b5b.xyz](https://b5b.xyz)
  - Latest commit, deployed from `docs/` to Github Pages
- _B5B Universe Development:_ [universe.b5b.xyz/graphql](https://universe.b5b.xyz/graphql)
  - Deployed manually with `railway up` using [bebprotocol/universe](https://github.com/bebprotocol/universe)

## Contribution Guidelines

The **bebprotocol/b7b** repo follows the [conventional commits guidelines](https://www.conventionalcommits.org/en/v1.0.0/#summary), please be sure to respect them when committing.

When opening a Pull Request and you are not already a core contributor to [@bebprotocol](https://github.com/bebprotocol), be sure to explain your pull request in greater detail so there's less churn when reviewing and we can get your changes landed ASAP, thank you!

### Setup

```
$ cd app
$ yarn install
$ yarn dev
```

### Testing Production

Production is comprised of static files, you can serve these files with any tool, e.g.:

```
$ cd docs
$ python3 -m http.server
```

or `yarn start`.
