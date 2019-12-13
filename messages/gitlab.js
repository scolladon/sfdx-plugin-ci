module.exports = {
  "command": "Create the '%s' template file in the <output> folder",
  "outputFlag": "Target folder where to install the .gitlab-ci.yml",
  "examples": [
    `$ sfdx ci:setup:gitlab --output ../output/folder
    Copy of the '.gitlab-ci.yml' file to the '../output/folder/' folder done
    `
  ],
  "errorCopyFailed": "Copy of the '%s' file to the '%s' folder failed",
  "folderDoNotExist": "'%s' folder do not exist",
  "successCopy": "Copy of the '%s' file to the '%s' folder done"
};
