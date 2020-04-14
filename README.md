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
sfdx-plugin-ci/1.2.1 darwin-x64 node-v13.12.0
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
* [`sfdx source:delta:generate [-t <string>] [-f <string>] [-o <filepath>] [-a <number>] [-r <filepath>] [-d] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`](#sfdx-sourcedeltagenerate--t-string--f-string--o-filepath--a-number--r-filepath--d---json---loglevel-tracedebuginfowarnerrorfataltracedebuginfowarnerrorfatal)
* [`sfdx source:prepare:ppset -p <array> [-s <array>] [-t <array>] [-r <array>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`](#sfdx-sourceprepareppset--p-array--s-array--t-array--r-array---json---loglevel-tracedebuginfowarnerrorfataltracedebuginfowarnerrorfatal)
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

_See code: [lib/commands/ci/setup/bitbucket.js](https://github.com/scolladon/sfdx-plugin-ci/blob/v1.2.1/lib/commands/ci/setup/bitbucket.js)_

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

_See code: [lib/commands/ci/setup/gitlab.js](https://github.com/scolladon/sfdx-plugin-ci/blob/v1.2.1/lib/commands/ci/setup/gitlab.js)_

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

_See code: [lib/commands/ci/setup/jwt.js](https://github.com/scolladon/sfdx-plugin-ci/blob/v1.2.1/lib/commands/ci/setup/jwt.js)_

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

_See code: [lib/commands/ci/setup/pmd.js](https://github.com/scolladon/sfdx-plugin-ci/blob/v1.2.1/lib/commands/ci/setup/pmd.js)_

## `sfdx source:delta:generate [-t <string>] [-f <string>] [-o <filepath>] [-a <number>] [-r <filepath>] [-d] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`

Create the '%s' template file in the <output> folder

```
USAGE
  $ sfdx source:delta:generate [-t <string>] [-f <string>] [-o <filepath>] [-a <number>] [-r <filepath>] [-d] [--json] 
  [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]

OPTIONS
  -a, --api-version=api-version                                                     [default: 48] salesforce API version

  -d, --generate-delta                                                              generate delta files in <output>
                                                                                    folder

  -f, --from=from                                                                   commit sha from where the diff is
                                                                                    done [git rev-list --max-parents=0
                                                                                    HEAD]

  -o, --output=output                                                               [default: ./output] source package
                                                                                    specific output

  -r, --repo=repo                                                                   [default: .] git repository location

  -t, --to=to                                                                       [default: HEAD] commit sha to where
                                                                                    the diff is done

  --json                                                                            format output as json

  --loglevel=(trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL)  [default: warn] logging level for
                                                                                    this command invocation
```

_See code: [lib/commands/source/delta/generate.js](https://github.com/scolladon/sfdx-plugin-ci/blob/v1.2.1/lib/commands/source/delta/generate.js)_

## `sfdx source:prepare:ppset -p <array> [-s <array>] [-t <array>] [-r <array>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`

prepare profile and permission

```
USAGE
  $ sfdx source:prepare:ppset -p <array> [-s <array>] [-t <array>] [-r <array>] [--json] [--loglevel 
  trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]

OPTIONS
  -p, --packages=packages
      (required) package.xml paths to use to filter profile and permission set. Delimiter: ':'

  -r, --user-permissions=user-permissions
      list of the userPermission to keep. Delimiter: ':'

  -s, --sources=sources
      sources paths where to apply the filtering (use default if empty). Delimiter: ':'

  -t, --permissions-type=permissions-type
      list of the permission types to filter with the package 
      <applicationVisibilities|categoryGroupVisibilities|classAccesses|customMetadataTypeAccesses|customPermissions|custom
      SettingAccesses|externalDataSourceAccesses|fieldPermissions|layoutAssignments|objectPermissions|pageAccesses|recordT
      ypeVisibilities|tabVisibilities|tabSettings>. Delimiter: ':'

  --json
      format output as json

  --loglevel=(trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL)
      [default: warn] logging level for this command invocation
```

_See code: [lib/commands/source/prepare/ppset.js](https://github.com/scolladon/sfdx-plugin-ci/blob/v1.2.1/lib/commands/source/prepare/ppset.js)_

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

_See code: [lib/commands/vcs/setup/git.js](https://github.com/scolladon/sfdx-plugin-ci/blob/v1.2.1/lib/commands/vcs/setup/git.js)_
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
