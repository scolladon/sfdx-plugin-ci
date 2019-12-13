import { flags, SfdxCommand } from '@salesforce/command';
import { Messages, SfdxError } from '@salesforce/core';
import { AnyJson } from '@salesforce/ts-types';
import * as fs from 'fs';
import * as path from 'path';
import * as node_openssl from 'node-openssl-cert';

// Initialize Messages with the current plugin directory
Messages.importMessagesDirectory(__dirname);

const messages = Messages.loadMessages('sfdx-plugin-ci', 'jwt');


const CSR_OPTIONS = {
  hash: 'sha512',
  subject: {
    countryName: 'FR',
    stateOrProvinceName: 'France',
    localityName: 'Paris',
    organizationName: 'sfdx',
    organizationalUnitName: 'sfdx:auth:jwt',
    emailAddress: 'sfdx@jwt.auth'
  }
}

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
      return null
    }

    const openssl = new node_openssl();
    const results = [];
    openssl.generateRSAPrivateKey({
      encryption: {
        password: this.flags.password,
        cipher: 'des3'
      },
      rsa_keygen_bits: 2048,
      rsa_keygen_pubexp: 65537,
      format: 'PKCS8'
    }, (errPrivatekey, key, cmdKEY) => {
      if (errPrivatekey) throw new SfdxError(messages.getMessage('errorKeyGeneration'))
      results.push({
        'filename': `${this.flags.env}.encoded.private.key`,
        'content': key
      })
      openssl.generateCSR(CSR_OPTIONS, key, this.flags.password, (errCSR, csr, cmdCSR) => {
        if (errCSR) throw new SfdxError(messages.getMessage('errorKeyGeneration'));
        openssl.selfSignCSR(csr, {}, key, this.flags.password, (errCRT, crt, cmdCRT) => {
          if (errCRT) throw new SfdxError(messages.getMessage('errorKeyGeneration'))
          results.push({
            'filename': `${this.flags.env}.crt`,
            'content': crt
          })
          if (this.flags.verbose) {
            this.ux.log(cmdKEY)
            this.ux.log(cmdCSR)
            this.ux.log(cmdCRT)
          }
          results.forEach(file => {
            fs.writeFile(path.resolve(this.flags.output, file.filename), file.content, err => {
              if (err) {
                throw new SfdxError(messages.getMessage('errorCopyFailed', [file.filename, path.resolve(this.flags.output)]));
              }
              this.ux.log(messages.getMessage('successCopy', [file.filename, path.resolve(this.flags.output)]));
            });
          })
        });
      });
    });
    return null
  }
}