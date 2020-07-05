import { SfdxCommand } from '@salesforce/command';
import { Messages } from '@salesforce/core';
import { AnyJson } from '@salesforce/ts-types';
import * as puppeteer from 'puppeteer';

const sleep = t => new Promise(r => setTimeout(() => r(), t));

// https://help.salesforce.com/articleView?id=000335222&type=1&mode=1
// Step 1 to 6

// Initialize Messages with the current plugin directory
Messages.importMessagesDirectory(__dirname);

// Load the specific messages for this file. Messages from @salesforce/command, @salesforce/core,
// or any library that is using the messages framework can also be loaded this way.
// const messages = Messages.loadMessages('sfdx-plugin-ci', COMMAND_NAME);

export default class Ppset extends SfdxCommand {
  protected static requiresUsername = true;

  public async run(): Promise<AnyJson> {
    this.ux.startSpinner(`Resetting ${this.org.getOrgId()} code coverage...`);

    const conn = this.org.getConnection();
    conn.metadata.pollTimeout = 240000;
    // START DELETE CODE COVERAGE

    const deleteTestResult = async () => {
      const browser = await puppeteer.launch({
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
        headless: !(process.env.BROWSER_DEBUG === 'true')
      });
      const page = await browser.newPage();
      await page.goto(
        `${conn.instanceUrl}/secur/frontdoor.jsp?sid=${conn.accessToken}`,
        { waitUntil: ['domcontentloaded', 'networkidle0'] }
      );
      const navigationPromise = page.waitForNavigation();

      await page.goto(`${conn.instanceUrl}/07M`);
      await navigationPromise;
      await page.click('li:nth-child(1) .btn');
      await navigationPromise;
    };

    const selectApexCodeCoverage = async () => {
      const result = await conn.tooling.query(
        'select id from ApexCodeCoverage'
      );
      return result.records.map(record => record['Id']);
    };

    const deleteApexCodeCoverage = async ids => {
      if (!ids || ids.length === 0) {
        return;
      }
      await conn.tooling.sobject('ApexCodeCoverage').delete(ids);
    };

    const selectApexCodeCoverageAggregate = async () => {
      const result = await conn.tooling.query(
        'select id from ApexCodeCoverageAggregate'
      );
      return result.records.map(record => record['Id']);
    };

    const deleteApexCodeCoverageAggregate = async ids => {
      if (!ids || ids.length === 0) {
        return;
      }
      await conn.tooling.sobject('ApexCodeCoverageAggregate').delete(ids);
    };

    const createContainer = async () => {
      const result = await conn.tooling
        .sobject('MetadataContainer')
        .create({ name: 'AwsomeMDC' + new Date().getTime() });
      return result['id'];
    };

    const getClassNames = async () => {
      const result = await conn.tooling.query(
        'select id, Name, Body from ApexClass WHERE NamespacePrefix = null'
      );
      return result.records.filter(el =>
        el['Name'].toLowerCase().includes('test')
      );
    };

    const createApexClassMember = async options => {
      const apexClassMemberArray = options.classes.map(meta => ({
        Body: meta.Body,
        MetadataContainerId: options.containerId,
        ContentEntityId: meta.Id
      }));
      if (apexClassMemberArray.length !== 0) {
        await conn.tooling
          .sobject('ApexClassMember')
          .create(apexClassMemberArray);
      }
    };

    const createContainerAsyncRequest = async containerId => {
      const result = await conn.tooling
        .sobject('ContainerAsyncRequest')
        .create({
          IsCheckOnly: true,
          MetadataContainerId: containerId,
          IsRunTests: false
        });
      return result['Id'];
    };

    const getAsyncRequest = async containerAsyncRequestId => {
      if (!containerAsyncRequestId) {
        return;
      }
      let result;
      let poll = true;
      do {
        result = await conn.tooling.query(
          `select Id, MetadataContainerId, MetadataContainerMemberId, State, IsCheckOnly, DeployDetails, ErrorMsg from ContainerAsyncRequest WHERE Id = '${containerAsyncRequestId}'`
        );
        poll = result.records.every(r => r.State !== 'Queued');
        if (poll) {
          await sleep(1000);
        }
      } while (poll);
    };

    const deleteContainer = async containerId => {
      if (!containerId) {
        return;
      }
      await conn.tooling.sobject('MetadataContainer').delete(containerId);
    };

    this.ux.setSpinnerStatus('delete test result');
    await deleteTestResult();
    this.ux.setSpinnerStatus('get code coverage');
    const codeCoverageIds = await selectApexCodeCoverage();
    this.ux.setSpinnerStatus(`delete code coverage ${codeCoverageIds.length}`);
    await deleteApexCodeCoverage(codeCoverageIds);
    this.ux.setSpinnerStatus('get code coverage aggregate');
    const codeCoverageAggregateIds = await selectApexCodeCoverageAggregate();
    this.ux.setSpinnerStatus(
      `delete code coverage aggregate ${codeCoverageAggregateIds.length}`
    );
    await deleteApexCodeCoverageAggregate(codeCoverageAggregateIds);

    this.ux.setSpinnerStatus('create container');
    const aContainerId = await createContainer();
    this.ux.setSpinnerStatus(`get test classes ${aContainerId}`);
    const testClasses = await getClassNames();
    this.ux.setSpinnerStatus(`create apex class member ${testClasses.length}`);
    await createApexClassMember({
      classes: testClasses,
      aContainerId
    });
    this.ux.setSpinnerStatus('create async container');
    const aContainerAsyncRequestId = await createContainerAsyncRequest(
      aContainerId
    );
    this.ux.setSpinnerStatus(
      `get async container result ${aContainerAsyncRequestId}`
    );
    await getAsyncRequest(aContainerAsyncRequestId);
    this.ux.setSpinnerStatus(`delete container ${aContainerId}`);
    await deleteContainer(aContainerId);

    this.ux.stopSpinner('Done.');
    return null;
  }
}
