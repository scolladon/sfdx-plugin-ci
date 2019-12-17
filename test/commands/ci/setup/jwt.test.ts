import { test } from '@salesforce/command/lib/test';

const COMMAND_NAME = 'ci:setup:jwt'

describe(COMMAND_NAME, () => {
  test
    .stdout()
    .command([COMMAND_NAME, '-p', 'password'])
    .it(`runs ${COMMAND_NAME} -p password`, ctx => {
      //expect(ctx.stdout).to.contain(`env.encoded.private.key' file created in`);
      //expect(ctx.stdout).to.contain(`env.crt' file created in`);
    });
});