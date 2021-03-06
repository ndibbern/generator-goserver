/*
 * © Copyright IBM Corp. 2018
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Tests here do not stub out the subgenerators, so for the app generator
 * the real build and refresh subgenerators get called.
 */

'use strict';
const common = require('../lib/common.js');
const path = require('path');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');
const PROJECT_NAME = 'Project Name';

describe('Go Generator integration test for default when application type not specified', function () {
  this.timeout(5000);
  
  beforeEach(() => {

    // Mock the options, set up an output folder and run the generator
    return helpers
      .run(path.join(__dirname, '../../generators/app'))
      .withOptions({
        bluemix: JSON.stringify({
          name: PROJECT_NAME,
        })
      })
      .toPromise(); // Get a Promise back when the generator finishes
  });

  describe('basic file structure for any project type test', () => {
    const expected = Object.keys(common.commonFile).map(key => common.commonFile[key]);

    it('generates the expected application files', () => {
      assert.file(expected);
    });
  });

  describe(common.commonFile.server_go, () => {
    it('contains default message', () => {
      assert.fileContent(common.commonFile.server_go, 'c.String(http.StatusOK, "You are now running a blank Go application")')
    });
  });

  describe(common.commonFile.README_md, () => {
    it('contains default project name', () => {
      assert.fileContent(
        common.commonFile.README_md,
        PROJECT_NAME
      );
    });

    it('contains IBM Cloud badge', () => {
      assert.fileContent(
        common.commonFile.README_md,
        '[![](https://img.shields.io/badge/IBM%20Cloud-powered-blue.svg)](https://bluemix.net)'
      );
    });
  });

  describe(common.commonFile.gitignore, () => {
    it('contains .DS_Store', () => {
      assert.fileContent(common.commonFile.gitignore, '.DS_Store');
    });
  });
});
