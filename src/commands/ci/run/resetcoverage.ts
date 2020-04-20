import { SfdxCommand } from '@salesforce/command';
import { Messages } from '@salesforce/core';
import { AnyJson, } from '@salesforce/ts-types';
import * as puppeteer from "puppeteer";

// Initialize Messages with the current plugin directory
Messages.importMessagesDirectory(__dirname);
const COMMAND_NAME = 'resetcoverage';

// Load the specific messages for this file. Messages from @salesforce/command, @salesforce/core,
// or any library that is using the messages framework can also be loaded this way.
const messages = Messages.loadMessages('sfdx-plugin-ci', COMMAND_NAME);

export default class Ppset extends SfdxCommand {

    protected static requiresUsername = true;


    public async run(): Promise<AnyJson> {

        this.ux.startSpinner(`${COMMAND_NAME} running...`);
        /*
const instanceUrl = this.org.getConnection().instanceUrl;

    const POST_LOGIN_PATH = "/lightning/setup/ApexTestQueue/page?address=%2F07M";
    
    this.ux.startSpinner('Fixing Contract Field History', null, { stdout: true });
    this.debug(`DEBUG Login to Scratch Org`);

    const browser = await puppeteer.launch({
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
      headless: !(process.env.BROWSER_DEBUG === 'true')
    });
    const page = await browser.newPage();
    await page.goto(
      `${instanceUrl}/secur/frontdoor.jsp?sid=${
        this.org.getConnection().accessToken
      }&startURL=${encodeURIComponent(POST_LOGIN_PATH)}`,
      { waitUntil: ["domcontentloaded", "networkidle0"] }
    );
    const navigationPromise = page.waitForNavigation();

    this.debug(`DEBUG Opening Contract Field History Tracking page`);
    await page.goto(
      `${instanceUrl}/ui/setup/layout/FieldHistoryTracking?pEntity=Contract`
    );
    await navigationPromise;

    this.debug(`DEBUG Clicking 'Save' button`);
    await page.click("table > tbody > tr > #topButtonRow > .btn:nth-child(1)");
    await navigationPromise;
    
    this.debug(`DEBUG Closing browser`);
    await browser.close();

    this.ux.stopSpinner('Done.');

    return { message: 'Fixed Contract Fied History Tracking'};
        */

        
        this.ux.setSpinnerStatus('');
        this.ux.stopSpinner('done');

          const conn = this.org.getConnection();
          conn.metadata.pollTimeout= 240000;
          var testClasses = [];
 -
          // START DELETE CODE COVERAGE
 
          var deleteTestResult = function(){
            
            const browser = await puppeteer.launch({
              args: ['--no-sandbox', '--disable-setuid-sandbox'],
              headless: !(process.env.BROWSER_DEBUG === 'true')
            });
            const page = await browser.newPage();
            await page.goto(
              `${conn.instanceUrl}/secur/frontdoor.jsp?sid=${
                conn.accessToken
              }`,
              { waitUntil: ["domcontentloaded", "networkidle0"] }
            );
            const navigationPromise = page.waitForNavigation();
        
            await page.goto(
              `${conn.instanceUrl}/07M`
            );
            await navigationPromise;
            await page.click("ul > li > input.btn");
            await navigationPromise;
          }
 
          var selectApexCodeCoverage = function() {
            
            return new Promise(function(resolve,reject){
              conn.tooling.query('select id from ApexCodeCoverage'
            , (error, result) => {
                if(error) {
                  reject(error);
                  return;
                }
                var ids = [];
                for(var i in result.records) {
                  ids.push(result.records[i].Id);
                }
                //deleteApexCodeCoverage
                resolve(ids);
              });
            });
          }
 
          var deleteApexCodeCoverage = function(ids) {
            
            return new Promise(function(resolve,reject){
              if(ids.length > 0) {
                conn.tooling.sobject('ApexCodeCoverage').delete(ids
                  , function(error, result) {
                  if(error) {
                    reject(error);
                    return;
                  }
                  resolve();
                  return;
                  //deleteApexCodeCoverageAggregate();
                });
              } else {
                resolve();
              }
            });
          }
 
 
          var selectApexCodeCoverageAggregate = function() {
            
            return new Promise(function(resolve,reject){
              conn.tooling.query('select id from ApexCodeCoverageAggregate'
            , function(error, result) {
                if(error) {
                  reject(error);
                  return;
                }
                var ids = [];
                for(var i in result.records) {
                  ids.push(result.records[i].Id);
                }
                resolve(ids);
                //deleteApexCodeCoverageAggregate
              });
            });
          }
 
          var deleteApexCodeCoverageAggregate = function(ids) {
            
            return new Promise(function(resolve,reject){
              if(ids.length > 0) {
                conn.tooling.sobject('ApexCodeCoverageAggregate').delete(ids
                  , function(error, result) {
                  if(error) {
                    reject(error);
                    return;
                  }
                  resolve();
                  //createContainer();
                });
              } else {
                resolve();
              }
            })
          }
 
          ////////START METHOD COMPILE CLASSES////////
          var createContainer = function() {
            
            return new Promise(function(resolve,reject){
              conn.tooling.sobject('MetadataContainer').create({name:'AwsomeMDC'+new Date().getTime()}, function(err, result){
                if(err){
                  reject(err);
                  return;
                }
                resolve(result.id);
                //getClassNames(createApexClassMember);
              });
            })
          }
 
          ///Get Class Names///
          var getClassNames = function() {
            
            return new Promise(function(resolve,reject){
              var MetadataArray = [];
              conn.tooling.query("select id, Name, Body from ApexClass WHERE NamespacePrefix = null")
              .on("record", function(result){
                MetadataArray.push(result);
              })
              .on("end", function(query){
                testClasses = MetadataArray.filter(function(el) {
                    return el.Name.toLowerCase().includes('test');
                });
                resolve({'classNames' : MetadataArray});
              })
              .on("error",function(err){reject(err);})
              .run({autoFetch : true, maxFetch : 1000 });
            });
 
          }
 
          //Create member
          var createApexClassMember = function(options) {
            
            return new Promise(function(resolve,reject){
              var apexClassMemberArray = options[4].classNames.map(function(meta) {
                return {Body: meta.Body,
                        MetadataContainerId: options[3],
                        ContentEntityId: meta.Id};
              });
              if(apexClassMemberArray.length > 0){
                conn.tooling.sobject('ApexClassMember').create(
                  apexClassMemberArray, function(err, result) {
                    if(err) {
                      reject(err);
                      return;
                    }
                    resolve(options[3]);
                  //createContainerAsyncRequest(containerId);
                });
              } else {
                resolve(options[3])
              }
            });
          }
 
 
          var createContainerAsyncRequest = function(containerId) {
            
            return new Promise(function(resolve,reject){
              conn.tooling.sobject('ContainerAsyncRequest').create({
                IsCheckOnly: true,
                MetadataContainerId: containerId,
                IsRunTests:false // Improve here ?
                }, function(err, res) {
                if(err) {
                  reject(err);
                  return;
                }
                resolve({"containerId":containerId,"id":res.id});
                //pollContainer(containerId, res.id);
              });
            })
 
          }
 
          var getAsyncRequest = function(options) {
            
            return new Promise(function(resolve,reject){
              (function pollAsyncRequestStatus(){
                var fields;
 
                fields = ['Id', 'MetadataContainerId', 'MetadataContainerMemberId', 'State', 'IsCheckOnly', 'DeployDetails', 'ErrorMsg'];
                conn.tooling.sobject('ContainerAsyncRequest')
                .find(
                  { Id: options.id },
                  fields
                )
                .execute(function(err, results) {
                  if (err) {
                    reject(err);
                    return;
                  }
                  if (results[0].State !== 'Queued') {
                    resolve(options.containerId);
                  } else {
                    setTimeout(pollAsyncRequestStatus, 1000);
                  }
                });
              })();
            })
 
          }
 
          var deleteContainer = function(containerId) {
            
            return new Promise(function(resolve,reject){
              // Put the name here
              if(containerId){
                conn.tooling.sobject('MetadataContainer').delete(containerId, function(err, res) {
                  if (err) {
                    reject(err);
                    return;
                  }
                  resolve();
                });
              } else {
                resolve();
              }
            })
          }
 
          ///Get IDs of the testClasses and runs the tests. Then refresh angular controller to display the results.
          var runTests = function() {
            
            return new Promise(function(resolve,reject){
              var classIDs = testClasses.map(function(record){
                return record.Id;
              });
              if(classIDs.length > 0){
                conn.tooling.runTestsAsynchronous(classIDs,function(error,result){
                  if(error) {
                    reject(error);
                    return;
                  }
                  resolve(result);
                });
              } else {
                resolve();
              }
            })
          }
 
          var getAsyncTestStatus = function(ParentJobId){
            
            return new Promise(function(resolve,reject){
              if(ParentJobId) {
                (function pollAsyncTestStatus(){
                  conn.tooling.query("select Id, Status, ApexClassId FROM ApexTestQueueItem where ParentJobId = '" + ParentJobId + "'", function(error, result) {
                    if(error) {
                      reject(error);
                      return;
                    }
                    var PollAgain = false;
 
                    for(var i in result.records) {
                      if(result.records[i].Status !== 'Completed'){
                        PollAgain = true;
                        break;
                      }
                    }
                    if(PollAgain) {
                      setTimeout(pollAsyncTestStatus, 1000);
                    } else {
                      resolve(result);
                    }
                  });
                })();
              } else {
                resolve();
              }
            })
          }
          ////////END METHOD COMPILE CLASSES////////
 
          ////////START METHOD COVERAGE PREDICTION CLASSES////////
 
          //******** works for new apex classes ********//
          // var predictedCoverage = function(totalLinesProd, totalLinesCoveredProd, totalLinesPackaged, totalLinesCoveredPackaged) {
          //   return ((totalLinesCoveredProd + totalLinesCoveredPackaged) / (totalLinesProd + totalLinesPackaged)) * 100;
          // }
          ////////END METHOD COVERAGE PREDICTION CLASSES////////
 		

        Promise.all([deleteTestResult(),selectApexCodeCoverage().then(deleteApexCodeCoverage),selectApexCodeCoverageAggregate().then(deleteApexCodeCoverageAggregate),createContainer(),getClassNames()])
        .then(createApexClassMember)
        .then(createContainerAsyncRequest)
        .then(getAsyncRequest)
        .then(function(containerId){return Promise.all([runTests().then(getAsyncTestStatus),deleteContainer(containerId)])})


    }
  }
  