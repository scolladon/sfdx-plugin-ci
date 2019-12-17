import { test } from '@salesforce/command/lib/test';

const COMMAND_NAME = 'vcs:setup:git'

describe(COMMAND_NAME, () => {
  test
    .stdout()
    .command([COMMAND_NAME])
    .it(`runs ${COMMAND_NAME}`, ctx => {
      //expect(ctx.stdout).to.contain(`Copy of the 'gitattributes' file to the`);
      //expect(ctx.stdout).to.contain(`Copy of the 'gitignore' file to the`);
    });
});
