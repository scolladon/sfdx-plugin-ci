import { flags, SfdxCommand } from '@salesforce/command';
import { Messages, SfdxError } from '@salesforce/core';
import { AnyJson } from '@salesforce/ts-types';
import * as fs from 'fs';
import * as path from 'path';

// Initialize Messages with the current plugin directory
Messages.importMessagesDirectory(__dirname);

// Load the specific messages for this file. Messages from @salesforce/command, @salesforce/core,
// or any library that is using the messages framework can also be loaded this way.
const messages = Messages.loadMessages('sfdx-plugin-ci', 'bitbucket');

const templateFolder = path.resolve(__dirname, '../../../../template/ci/setup/bitbucket/');
const templateFile = 'bitbucket-pipelines.yml';

export default class Bitbucket extends SfdxCommand {

  public static description = messages.getMessage('command', [templateFile]);

  protected static flagsConfig = {
    output: flags.directory({ char: 'o', description: messages.getMessage('outputFlag'), default: './' })
  };

  protected static requiresProject = false;

  public async run(): Promise<AnyJson> {
    if (!fs.existsSync(path.join(path.resolve(this.flags.output)))) {
      this.ux.log(messages.getMessage('folderDoNotExist', [this.flags.output]));
      return null
    }
    fs.copyFile(path.resolve(templateFolder, templateFile), path.resolve(this.flags.output, templateFile), err => {
      if (err) {
        throw new SfdxError(messages.getMessage('errorCopyFailed', [templateFile, path.resolve(this.flags.output)]));
      }
      this.ux.log(messages.getMessage('successCopy', [templateFile, path.resolve(this.flags.output)]));
    });
    return null
  }
}
