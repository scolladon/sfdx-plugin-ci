sfdx-plugin-ci [![CircleCI](https://circleci.com/gh/scolladon/sfdx-plugin-ci/tree/master.svg?style=shield)](https://circleci.com/gh/scolladon/sfdx-plugin-ci/tree/master) [![codecov](https://codecov.io/gh/scolladon/sfdx-plugin-ci/branch/master/graph/badge.svg)](https://codecov.io/gh/scolladon/sfdx-plugin-ci)
==============

CI Scaffolder and Helper plugin

[![Version](https://img.shields.io/npm/v/sfdx-plugin-ci.svg)](https://npmjs.org/package/sfdx-plugin-ci)
[![Greenkeeper](https://badges.greenkeeper.io/scolladon/sfdx-plugin-ci.svg)](https://greenkeeper.io/)
[![Known Vulnerabilities](https://snyk.io/test/github/scolladon/sfdx-plugin-ci/badge.svg)](https://snyk.io/test/github/scolladon/sfdx-plugin-ci)
[![Downloads/week](https://img.shields.io/npm/dw/sfdx-plugin-ci.svg)](https://npmjs.org/package/sfdx-plugin-ci)
[![License](https://img.shields.io/npm/l/sfdx-plugin-ci.svg)](https://github.com/scolladon/sfdx-plugin-ci/blob/master/package.json)

<!-- install -->
<!-- usage -->
```sh-session
$ npm install -g sfdx-plugin-ci
$ sfdx COMMAND
running command...
$ sfdx (-v|--version|version)
sfdx-plugin-ci/0.0.0 darwin-x64 node-v10.16.3
$ sfdx --help [COMMAND]
USAGE
  $ sfdx COMMAND
...
```
<!-- usagestop -->
<!-- commands -->
* [`sfdx ci:setup:bitbucket [-o <directory>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`](#sfdx-cisetupbitbucket--o-directory---json---loglevel-tracedebuginfowarnerrorfataltracedebuginfowarnerrorfatal)
* [`sfdx ci:setup:gitlab [-o <directory>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`](#sfdx-cisetupgitlab--o-directory---json---loglevel-tracedebuginfowarnerrorfataltracedebuginfowarnerrorfatal)
* [`sfdx ci:setup:jwt -p <string> [-o <directory>] [-e <string>] [--verbose] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`](#sfdx-cisetupjwt--p-string--o-directory--e-string---verbose---json---loglevel-tracedebuginfowarnerrorfataltracedebuginfowarnerrorfatal)
* [`sfdx ci:setup:pmd [-o <directory>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`](#sfdx-cisetuppmd--o-directory---json---loglevel-tracedebuginfowarnerrorfataltracedebuginfowarnerrorfatal)
* [`sfdx vcs:setup:git [-o <directory>] [-r] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`](#sfdx-vcssetupgit--o-directory--r---json---loglevel-tracedebuginfowarnerrorfataltracedebuginfowarnerrorfatal)

## `sfdx ci:setup:bitbucket [-o <directory>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`

Create the 'bitbucket-pipelines.yml' template file in the <output> folder

```
USAGE
  $ sfdx ci:setup:bitbucket [-o <directory>] [--json] [--loglevel 
  trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]

OPTIONS
  -o, --output=output                                                               [default: ./] Target folder where to
                                                                                    install the bitbucket-pipelines.yml

  --json                                                                            format output as json

  --loglevel=(trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL)  [default: warn] logging level for
                                                                                    this command invocation
```

_See code: [lib/commands/ci/setup/bitbucket.js](https://github.com/scolladon/sfdx-plugin-ci/blob/v0.0.0/lib/commands/ci/setup/bitbucket.js)_

## `sfdx ci:setup:gitlab [-o <directory>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`

Create the '.gitlab-ci.yml' template file in the <output> folder

```
USAGE
  $ sfdx ci:setup:gitlab [-o <directory>] [--json] [--loglevel 
  trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]

OPTIONS
  -o, --output=output                                                               [default: ./] Target folder where to
                                                                                    install the .gitlab-ci.yml

  --json                                                                            format output as json

  --loglevel=(trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL)  [default: warn] logging level for
                                                                                    this command invocation
```

_See code: [lib/commands/ci/setup/gitlab.js](https://github.com/scolladon/sfdx-plugin-ci/blob/v0.0.0/lib/commands/ci/setup/gitlab.js)_

## `sfdx ci:setup:jwt -p <string> [-o <directory>] [-e <string>] [--verbose] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`

Create the encoded private key and the certificate

```
USAGE
  $ sfdx ci:setup:jwt -p <string> [-o <directory>] [-e <string>] [--verbose] [--json] [--loglevel 
  trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]

OPTIONS
  -e, --env=env                                                                     [default: env] Environment name

  -o, --output=output                                                               [default: ./] Target folder where to
                                                                                    install the .gitlab-ci.yml

  -p, --password=password                                                           (required) Password used to encrypt
                                                                                    the private key

  --json                                                                            format output as json

  --loglevel=(trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL)  [default: warn] logging level for
                                                                                    this command invocation

  --verbose                                                                         emit additional command output to
                                                                                    stdout
```

_See code: [lib/commands/ci/setup/jwt.js](https://github.com/scolladon/sfdx-plugin-ci/blob/v0.0.0/lib/commands/ci/setup/jwt.js)_

## `sfdx ci:setup:pmd [-o <directory>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`

Create the 'apex-ruleset.xml' template file in the <output> folder

```
USAGE
  $ sfdx ci:setup:pmd [-o <directory>] [--json] [--loglevel 
  trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]

OPTIONS
  -o, --output=output                                                               [default: ./] Target folder where to
                                                                                    install the bitbucket-pipelines.yml

  --json                                                                            format output as json

  --loglevel=(trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL)  [default: warn] logging level for
                                                                                    this command invocation
```

_See code: [lib/commands/ci/setup/pmd.js](https://github.com/scolladon/sfdx-plugin-ci/blob/v0.0.0/lib/commands/ci/setup/pmd.js)_

## `sfdx vcs:setup:git [-o <directory>] [-r] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`

Create the '.gitignore' and '.gitattributes' file in the <output> folder

```
USAGE
  $ sfdx vcs:setup:git [-o <directory>] [-r] [--json] [--loglevel 
  trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]

OPTIONS
  -o, --output=output                                                               [default: ./] Target folder where to
                                                                                    install the git files

  -r, --release-manager                                                             Also deploy git merge driver for
                                                                                    profile, permission set,
                                                                                    package.xml, destructiveChanges.xml,
                                                                                    destructiveChangesPost.xml and
                                                                                    destructiveChangesPre.xml

  --json                                                                            format output as json

  --loglevel=(trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL)  [default: warn] logging level for
                                                                                    this command invocation
```

_See code: [lib/commands/vcs/setup/git.js](https://github.com/scolladon/sfdx-plugin-ci/blob/v0.0.0/lib/commands/vcs/setup/git.js)_
<!-- commandsstop -->
* [`sfdx ci:setup:bitbucket [-o <directory>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`](#sfdx-cisetupbitbucket--o-directory---json---loglevel-tracedebuginfowarnerrorfataltracedebuginfowarnerrorfatal)
* [`sfdx ci:setup:gitlab [-o <directory>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`](#sfdx-cisetupgitlab--o-directory---json---loglevel-tracedebuginfowarnerrorfataltracedebuginfowarnerrorfatal)
* [`sfdx ci:setup:jwt -p <string> [-o <directory>] [-e <string>] [--verbose] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`](#sfdx-cisetupjwt--p-string--o-directory--e-string---verbose---json---loglevel-tracedebuginfowarnerrorfataltracedebuginfowarnerrorfatal)
* [`sfdx ci:setup:pmd [-o <directory>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`](#sfdx-cisetuppmd--o-directory---json---loglevel-tracedebuginfowarnerrorfataltracedebuginfowarnerrorfatal)
* [`sfdx vcs:setup:git [-o <directory>] [-r] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`](#sfdx-vcssetupgit--o-directory--r---json---loglevel-tracedebuginfowarnerrorfataltracedebuginfowarnerrorfatal)

## `sfdx ci:setup:bitbucket [-o <directory>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`

Create the 'bitbucket-pipelines.yml' template file in the <output> folder

```
USAGE
  $ sfdx ci:setup:bitbucket [-o <directory>] [--json] [--loglevel 
  trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]

OPTIONS
  -o, --output=output                                                               [default: ./] Target folder where to
                                                                                    install the bitbucket-pipelines.yml

  --json                                                                            format output as json

  --loglevel=(trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL)  [default: warn] logging level for
                                                                                    this command invocation
```

_See code: [lib/commands/ci/setup/bitbucket.js](https://github.com/scolladon/sfdx-plugin-ci/blob/v0.0.0/lib/commands/ci/setup/bitbucket.js)_

## `sfdx ci:setup:gitlab [-o <directory>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`

Create the '.gitlab-ci.yml' template file in the <output> folder

```
USAGE
  $ sfdx ci:setup:gitlab [-o <directory>] [--json] [--loglevel 
  trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]

OPTIONS
  -o, --output=output                                                               [default: ./] Target folder where to
                                                                                    install the .gitlab-ci.yml

  --json                                                                            format output as json

  --loglevel=(trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL)  [default: warn] logging level for
                                                                                    this command invocation
```

_See code: [lib/commands/ci/setup/gitlab.js](https://github.com/scolladon/sfdx-plugin-ci/blob/v0.0.0/lib/commands/ci/setup/gitlab.js)_

## `sfdx ci:setup:jwt -p <string> [-o <directory>] [-e <string>] [--verbose] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`

Create the encoded private key and the certificate

```
USAGE
  $ sfdx ci:setup:jwt -p <string> [-o <directory>] [-e <string>] [--verbose] [--json] [--loglevel 
  trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]

OPTIONS
  -e, --env=env                                                                     [default: env] Environment name

  -o, --output=output                                                               [default: ./] Target folder where to
                                                                                    install the .gitlab-ci.yml

  -p, --password=password                                                           (required) Password used to encrypt
                                                                                    the private key

  --json                                                                            format output as json

  --loglevel=(trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL)  [default: warn] logging level for
                                                                                    this command invocation

  --verbose                                                                         emit additional command output to
                                                                                    stdout
```

_See code: [lib/commands/ci/setup/jwt.js](https://github.com/scolladon/sfdx-plugin-ci/blob/v0.0.0/lib/commands/ci/setup/jwt.js)_

## `sfdx ci:setup:pmd [-o <directory>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`

Create the 'apex-ruleset.xml' template file in the <output> folder

```
USAGE
  $ sfdx ci:setup:pmd [-o <directory>] [--json] [--loglevel 
  trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]

OPTIONS
  -o, --output=output                                                               [default: ./] Target folder where to
                                                                                    install the bitbucket-pipelines.yml

  --json                                                                            format output as json

  --loglevel=(trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL)  [default: warn] logging level for
                                                                                    this command invocation
```

_See code: [lib/commands/ci/setup/pmd.js](https://github.com/scolladon/sfdx-plugin-ci/blob/v0.0.0/lib/commands/ci/setup/pmd.js)_

## `sfdx vcs:setup:git [-o <directory>] [-r] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`

Create the '.gitignore' and '.gitattributes' file in the <output> folder

```
USAGE
  $ sfdx vcs:setup:git [-o <directory>] [-r] [--json] [--loglevel 
  trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]

OPTIONS
  -o, --output=output                                                               [default: ./] Target folder where to
                                                                                    install the git files

  -r, --release-manager                                                             Also deploy git merge driver for
                                                                                    profile, permission set,
                                                                                    package.xml, destructiveChanges.xml,
                                                                                    destructiveChangesPost.xml and
                                                                                    destructiveChangesPre.xml

  --json                                                                            format output as json

  --loglevel=(trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL)  [default: warn] logging level for
                                                                                    this command invocation
```

_See code: [lib/commands/vcs/setup/git.js](https://github.com/scolladon/sfdx-plugin-ci/blob/v0.0.0/lib/commands/vcs/setup/git.js)_
