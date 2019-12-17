import { test } from '@salesforce/command/lib/test';

const COMMAND_NAME = 'ci:setup:pmd'

describe(COMMAND_NAME, () => {
  test
    .stdout()
    .command([COMMAND_NAME])
    .it(`runs ${COMMAND_NAME}`, ctx => {
      //expect(ctx.stdout).to.contain(`Copy of the 'apex-ruleset.xml' file to the`);
    });
});