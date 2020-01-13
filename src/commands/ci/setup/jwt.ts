import { flags, SfdxCommand } from '@salesforce/command';
import { Messages, SfdxError } from '@salesforce/core';
import { AnyJson } from '@salesforce/ts-types';
import * as fs from 'fs';
import * as openssl from 'openssl-nodejs';
import * as fse from 'fs-extra';
import * as path from 'path';

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
};

export default class Jwt extends SfdxCommand {

  /* Use another lib openssl-nodejs and fs-extra to create the temporary folder and files required to the generation of the certificat
COUNTRY_NAME="FR"
STATE="France"
LOCALITY="Paris"
ORGANIZATION_NAME="sfdx"
ORGANIZATIONAL_UNIT="jwt:auth"
COMMON_NAME="jwt.auth.com"
EMAIL="sfdx@jwt.auth"
CERTIFICATE_EXPIRE_DAYS=365

#### CREATE CERTIFICATE AND PRIVATE KEY ############################################################
#
mkdir ./tmp 2>/dev/null
cd tmp
openssl genrsa -des3 -passout pass:x -out server.pass.key 2048 2>/dev/null
openssl rsa -passin pass:x -in server.pass.key -out server.key 2>/dev/null
openssl req -new -key server.key -out server.csr \
            -subj "/C=$COUNTRY_NAME/ST=$STATE/L=$LOCALITY/O=$ORGANIZATION_NAME/OU=$ORGANIZATIONAL_UNIT/CN=$COMMON_NAME/emailAddress=$EMAIL" 2>/dev/null

openssl x509 -req -sha256 -days $CERTIFICATE_EXPIRE_DAYS -in server.csr -signkey server.key -out "$ENV.crt" 2>/dev/null


mkdir ../build 2>/dev/null
mkdir ../certificate 2>/dev/null

openssl aes-256-cbc -salt -e -in server.key -out "${ENV}_server.key.enc" -pass pass:$PASSWORD 2>/dev/null
mv "${ENV}_server.key.enc" ../build
mv "$ENV.crt" ../certificate
cd ..
rm -rf tmp
echo "$ENV.crt in the build folder"
echo "${ENV}_server.key.enc created in the certificate folder"
  */

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
    try {
      const tmpDir = 'tmp';
      fse.mkdirSync(tmpDir);
      openssl(`genrsa -des3 -passout pass:x -out ${tmpDir}/server.pass.key 2048`);
      openssl(`rsa -passin pass:x -in ${tmpDir}/server.pass.key -out ${tmpDir}/server.key`);
      openssl(`req -new -key ${tmpDir}/server.key -out ${tmpDir}/server.csr -subj "/C=FR/ST=FRANCE/L=PARIS/O=sfdx/OU=sfdx:auth:jwt/CN=jwt/emailAddress=sfdx@jwt.auth`);
      openssl(`x509 -req -sha256 -days 365 -in ${tmpDir}/server.csr -signkey ${tmpDir}/server.key -out "${this.flags.output}/${this.flags.env}.crt"`);
      openssl(`aes-256-cbc -salt -e -in ${tmpDir}/server.key -out "${this.flags.output}/${ENV}_server.key.enc" -pass pass:${this.flags.password}`);
      fse.rmdirSync(tmpDir);

      this.ux.log(messages.getMessage('successCopy', [`${ENV}_server.key.enc`, path.resolve(this.flags.output)]));
      this.ux.log(messages.getMessage('successCopy', [`${this.flags.env}.crt`, path.resolve(this.flags.output)]));
    } catch (ex) {
      throw new SfdxError(messages.getMessage('errorKeyGeneration'));
    }
    return null;
  }
}
