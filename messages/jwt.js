module.exports = {
  "command": "Create the encoded private key and the certificate",
  "outputFlag": "Target folder where to install the .gitlab-ci.yml",
  "passwordFlag": "Password used to encrypt the private key",
  "envFlag": "Environment name",
  "examples": [
    `$ sfdx ci:setup:jwt --output ../output/folder -p test -e dev
    Create certificat and encrypted private key for 'dev' env
    `
  ],
  "errorKeyGeneration": "Could not generate certificat and encrypted private key",
  "folderDoNotExist": "'%s' folder do not exist",
  "errorCopyFailed": "Copy of the '%s' file to the '%s' folder failed",
  "successCopy": "'%s' file created in '%s' folder"
};
