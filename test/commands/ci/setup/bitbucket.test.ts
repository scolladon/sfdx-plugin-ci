import { test } from '@salesforce/command/lib/test';

const COMMAND_NAME = 'ci:setup:bitbucket'

describe(COMMAND_NAME, () => {
  test
    .stdout()
    .command([COMMAND_NAME])
    .it(`runs ${COMMAND_NAME}`, ctx => {
      //expect(ctx.stdout).to.contain('Copy of the \'bitbucket - pipelines.yml\' file to the');
    });
});