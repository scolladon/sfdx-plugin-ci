import { flags, SfdxCommand } from '@salesforce/command';
import { Messages, SfdxProject } from '@salesforce/core';
import { AnyJson, JsonArray } from "@salesforce/ts-types";
import { findInDir } from '../../../utils/findInDir';
import { parseStringAsync } from '../../../utils/xml2jsHelper';

import * as fs from 'fs';
import * as path from 'path';
import * as xml2js from 'xml2js';

// Initialize Messages with the current plugin directory
Messages.importMessagesDirectory(__dirname);
const COMMAND_NAME = 'ppset'

// Load the specific messages for this file. Messages from @salesforce/command, @salesforce/core,
// or any library that is using the messages framework can also be loaded this way.
const messages = Messages.loadMessages('sfdx-plugin-ci', COMMAND_NAME);
const INPUT_DELIMITER = ':'

const profilePackageMapping = {
    applicationVisibilities: {xmlTag: 'CustomApplication', key: 'application'},
    categoryGroupVisibilities: {xmlTag: 'DataCategoryGroup', key: 'dataCategoryGroup'},
    classAccesses: {xmlTag: 'ApexClass', key: 'apexClass'},
    customMetadataTypeAccesses: {xmlTag: 'CustomMetadata', key: 'name'},
    customPermissions: {xmlTag: 'CustomPermission', key: 'name'},
    customSettingAccesses: {xmlTag: 'CustomObject', key: 'name'},
    externalDataSourceAccesses: {xmlTag: 'ExternalDataSource', key: 'externalDataSource'},
    fieldPermissions: {xmlTag: 'CustomField', key: 'field'},
    layoutAssignments: {xmlTag: 'Layout', key: 'layout'}, // recordtype
    objectPermissions: {xmlTag: 'CustomObject', key: 'object'},
    pageAccesses: {xmlTag: 'ApexPage', key: 'apexPage'},
    recordTypeVisibilities: {xmlTag: 'RecordType', key: 'recordType'},
    tabVisibilities: {xmlTag: 'CustomTab', key: 'tab'},
    tabSettings: {xmlTag: 'CustomTab', key: 'tab'},
}

export default class Ppset extends SfdxCommand {

    public static description = messages.getMessage('command', []);

    protected static flagsConfig = {
        packages: flags.array({
            char: 'p',
            description: messages.getMessage('packagesFlagDescription', [INPUT_DELIMITER]),
            delimiter: INPUT_DELIMITER,
            map: (val: string) => path.parse(val),
            required: true
        }),
        sources: flags.array({
            char: 's',
            description: messages.getMessage('sourcesFlagDescription', [INPUT_DELIMITER]),
            delimiter: INPUT_DELIMITER,
            map: (val: string) => path.parse(val)
        }),
        "permissions-type": flags.array({
            char: 't',
            description: messages.getMessage('permissionsTypeFlagDescription', [Object.keys(profilePackageMapping).join('|'), INPUT_DELIMITER]),
            delimiter: INPUT_DELIMITER
        }),
        "user-permissions": flags.array({
            char: 'r',
            description: messages.getMessage('userPermissionsFlagDescription', [INPUT_DELIMITER]),
            delimiter: INPUT_DELIMITER
        }),
    };

    protected static requiresProject = true;

    public async run(): Promise<AnyJson> {

        const project = await SfdxProject.resolve();
        const projectJson = await project.resolveProjectConfig();
        const basePath = project.getPath();
        const packageDirectories = projectJson['packageDirectories'] as JsonArray;
        const defaultDir = packageDirectories.reduce((a, v) => v['default'] == true ? a = v['path'] : a = a, '');

        const sources = this.flags.sources || []
        const userPermissions = this.flags['user-permissions'] || []
        const dirList = packageDirectories.filter(dir => sources.includes(dir));
        if(dirList.length == 0) {
            dirList.push(defaultDir);
        }

        const packages = await Promise.all(this.flags.packages.map(async packageFile => await parseStringAsync(fs.readFileSync(path.format(packageFile)))));
        const allowedPermissions = this.flags['permissions-type'] || []

        this.ux.startSpinner(`${COMMAND_NAME} running...`);

        dirList.forEach(dir =>
            findInDir(path.join(basePath, `${dir}`), /(\.profile)|(\.permissionset)/)
            .filter(file => {
                const fileName = path.parse(file).name.split('.')[0];
                return packages.some(jsonObject=>jsonObject['Package']['types'] && jsonObject['Package']['types'].filter(x=>x.name[0] === 'Profile')[0].members.includes(fileName)) 
                || packages.some(jsonObject=>jsonObject['Package']['types']['PermissionSet'] && jsonObject['Package']['types'].filter(x=>x.name[0] === 'PermissionSet')[0].members.includes(fileName))
            })
            .forEach(async file => {
                // Filter content based on the package.xml and the ppset
                const content = await parseStringAsync(fs.readFileSync(file));
                const permissionContent = Object.values(content)[0]
                let authorizedKeys = Object.keys(permissionContent).filter(x => Object.keys(profilePackageMapping).includes(x))
                if(allowedPermissions.length > 0) {
                    authorizedKeys = authorizedKeys.filter(x=>allowedPermissions.includes(x));
                }

                authorizedKeys.forEach(permission => {
                    const values = new Set();
                    packages.forEach(jsonObject => 
                        jsonObject['Package']['types'] && jsonObject['Package']['types']
                        .filter(e => e.name[0] === profilePackageMapping[permission].xmlTag)
                        .forEach(element => element.members.forEach(member => values.add(member)))
                    )
                    permissionContent[permission] = permissionContent[permission].filter(element => 
                        values.has(element[profilePackageMapping[permission].key][0])
                    );
                })

                const inFileUserPermissions = permissionContent['userPermissions'] || []
                permissionContent['userPermissions'] = inFileUserPermissions.filter(up => userPermissions.includes(up.name[0]))

                const builder = new xml2js.Builder()
                fs.writeFileSync(file,builder.buildObject(content));
            })
        );
        this.ux.setSpinnerStatus('');
        this.ux.stopSpinner(`done`);
        return null;
    }
}
