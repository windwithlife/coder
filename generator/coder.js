#!/usr/bin/env node

var fs = require('fs');
var path = require('path');
var exec = require('child_process').exec;
var spawn = require('child_process').spawn;
var NPM = (process.platform === 'win32') ? 'npm.cmd' : 'npm';
var mainGenerator = require('./lib/common_creator');

function init(byFiles, setting) {
    mainGenerator.initProject(byFiles,setting);
    console.log('initialize the project env!');
}

function generator(cmdOptions,platformName, withframework) {
    //生成代码
    //verboseCommand = verbose ? ' --verbose' : '';
    mainGenerator.generateCode(cmdOptions, platformName, withframework);
}

module.exports.init = init;
module.exports.generate = generator;
module.exports.usage = function(){return mainGenerator.generatorPromptMsg()};