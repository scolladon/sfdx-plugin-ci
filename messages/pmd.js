module.exports = {
  "command": "Create the '%s' template file in the <output> folder",
  "outputFlag": "Target folder where to install the bitbucket-pipelines.yml",
  "examples": [
    `$ sfdx ci:setup:pmd --output ../output/folder
    Copy of the 'apex-ruleset.xml' file to the '../output/folder/' folder done
    `
  ],
  "errorCopyFailed": "Copy of the '%s' file to the '%s' folder failed",
  "folderDoNotExist": "'%s' folder do not exist",
  "successCopy": "Copy of the '%s' file to the '%s' folder done"
};
