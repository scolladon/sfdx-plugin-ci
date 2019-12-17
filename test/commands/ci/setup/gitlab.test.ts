import { test } from '@salesforce/command/lib/test';

const COMMAND_NAME = 'ci:setup:gitlab'

describe(COMMAND_NAME, () => {
  test
    .stdout()
    .command([COMMAND_NAME])
    .it(`runs ${COMMAND_NAME}`, ctx => {
      //expect(ctx.stdout).to.contain(`Copy of the '.gitlab-ci.yml' file to the`);
    });
});