module.exports = {
  "command": "Create the '.gitignore' and '.gitattributes' file in the <output> folder",
  "outputFlag": "Target folder where to install the git files",
  "releaseManagerFlag": "Also deploy git merge driver for profile, permission set, package.xml, destructiveChanges.xml, destructiveChangesPost.xml and destructiveChangesPre.xml",
  "examples": [
    `$ sfdx vcs:setup:git --output ../output/folder
    Copy of the '.gitignore' file to the '../output/folder' folder done
    Copy of the '.gitattributes' file to the '../output/folder' folder done
    `
  ],
  "prerequisiteNotFullfilled": "Release manager config not installed. smp & sfdcm command line must be installed",
  "errorCopyFailed": "Copy of the '%s' file to the '%s' folder failed",
  "errorNotGitRepo": "Error : the '%s' folder is not a git repository",
  "folderDoNotExist": "'%s' folder do not exist",
  "successCopy": "Copy of the '%s' file to the '%s' folder done"
};
