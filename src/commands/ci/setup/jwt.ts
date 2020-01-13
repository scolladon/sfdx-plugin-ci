import { flags, SfdxCommand } from '@salesforce/command';
import { Messages, SfdxError } from '@salesforce/core';
import { AnyJson } from '@salesforce/ts-types';
import { execSync } from 'child_process';
import * as fs from 'fs';
import * as fse from 'fs-extra';
import * as path from 'path';

// Initialize Messages with the current plugin directory
Messages.importMessagesDirectory(__dirname);

const messages = Messages.loadMessages('sfdx-plugin-ci', 'jwt');

const tmpFolder = 'tmp';

export default class Jwt extends SfdxCommand {

  public static description = messages.getMessage('command');

  protected static flagsConfig = {
    output: flags.directory({ char: 'o', description: messages.getMessage('outputFlag'), default: './' }),
    password: flags.string({ char: 'p', description: messages.getMessage('passwordFlag'), required: true }),
    env: flags.string({ char: 'e', description: messages.getMessage('envFlag'), default: 'env' }),
    verbose: flags.builtin()
  };

  protected static requiresProject = false;

  public async run(): Promise<AnyJson> {

    if (!fs.existsSync(path.join(path.resolve(this.flags.output)))) {
      this.ux.log(messages.getMessage('folderDoNotExist', [this.flags.output]));
      return null;
    }
    fse.ensureDirSync(tmpFolder);
    try {
      execSync(`openssl genrsa -des3 -passout pass:x -out ${path.join(tmpFolder, 'server.pass.key')} 2048 2>/dev/null`);
      execSync(`openssl rsa -passin pass:x -in ${path.join(tmpFolder, 'server.pass.key')} -out ${path.join(tmpFolder, 'server.key')}  2>/dev/null`);
      execSync(`openssl req -new -key ${path.join(tmpFolder, 'server.key')} -out ${path.join(tmpFolder, 'server.csr')} -subj "/C=FR/ST=FRANCE/L=PARIS/O=sfdx/OU=sfdx:auth:jwt/CN=jwt/emailAddress=sfdx@jwt.auth"  2>/dev/null`);
      execSync(`openssl x509 -req -sha256 -days 365 -in ${path.join(tmpFolder, 'server.csr')} -signkey ${path.join(tmpFolder, 'server.key')} -out ${path.join(this.flags.output, this.flags.env + '.crt')}  2>/dev/null`);
      execSync(`openssl aes-256-cbc -salt -e -in ${path.join(tmpFolder, 'server.key')} -out ${path.join(this.flags.output, this.flags.env + '_server.key.enc')} -pass pass:${this.flags.password}  2>/dev/null`);
    } catch (ex) {
      throw new SfdxError(messages.getMessage('errorKeyGeneration'));
    }
    fse.removeSync(tmpFolder);
    this.ux.log(messages.getMessage('successCopy', [`${this.flags.env}_server.key.enc`, path.resolve(this.flags.output)]));
    this.ux.log(messages.getMessage('successCopy', [`${this.flags.env}.crt`, path.resolve(this.flags.output)]));
    return null;
  }
}
