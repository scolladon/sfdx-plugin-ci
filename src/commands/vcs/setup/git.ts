import { flags, SfdxCommand } from '@salesforce/command';
import { Messages, SfdxError } from '@salesforce/core';
import { AnyJson } from '@salesforce/ts-types';
import * as commandExists from 'command-exists';
import * as fs from 'fs';
import * as path from 'path';

Messages.importMessagesDirectory(__dirname);

const messages = Messages.loadMessages('sfdx-plugin-ci', 'git');

const GIT_FOLDER = '.git';

const templateFolder = path.resolve(__dirname, '../../../../template/vcs/setup/git/');
const templateFiles = ['gitignore', 'gitattributes'];
const rmTemplateFiles = [{ filename: 'attributes', path: `${GIT_FOLDER}/info` }, { filename: 'config', path: GIT_FOLDER }];
const clis = ['sfdcm', 'smp'];

export default class Git extends SfdxCommand {

  public static description = messages.getMessage('command');

  protected static flagsConfig = {
    output: flags.directory({ char: 'o', description: messages.getMessage('outputFlag'), default: './' }),
    'release-manager': flags.boolean({ char: 'r', description: messages.getMessage('releaseManagerFlag') })
  };

  protected static requiresProject = false;

  public async run(): Promise<AnyJson> {
    if (!fs.existsSync(path.join(path.resolve(this.flags.output)))) {
      this.ux.log(messages.getMessage('folderDoNotExist', [this.flags.output]));
      return null;
    }
    if (!fs.existsSync(path.join(path.resolve(this.flags.output), GIT_FOLDER))) {
      this.ux.log(messages.getMessage('errorNotGitRepo', [this.flags.output]));
      return null;
    }

    templateFiles.forEach(templateFile => {
      fs.copyFile(path.resolve(templateFolder, templateFile), path.resolve(this.flags.output, `.${templateFile}`), err => {
        if (err) throw new SfdxError(messages.getMessage('errorCopyFailed', [templateFile, path.resolve(this.flags.output)]));
        this.ux.log(messages.getMessage('successCopy', [templateFile, path.resolve(this.flags.output)]));
      });
    });

    if (this.flags['release-manager']) {
      if (clis.every(commandExists.sync)) {
        rmTemplateFiles.forEach(templateFile => {
          try {
            fs.appendFileSync(path.resolve(this.flags.output, templateFile.path, templateFile.filename), fs.readFileSync(path.resolve(templateFolder, templateFile.filename)));
            this.ux.log(messages.getMessage('successCopy', [templateFile.filename, path.resolve(this.flags.output, templateFile.path)]));
          } catch (error) {
            throw new SfdxError(error.getMessage());
          }
        });
      } else {
        this.ux.log(messages.getMessage('prerequisiteNotFullfilled'));
      }
    }

    return null;
  }
}
