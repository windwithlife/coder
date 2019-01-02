var path = require('path');
var fs = require('fs');
var codeTools = require('./code_tools');
var ModuleDefine = require('./module_define');
var moduleDefines = new ModuleDefine();

var generatorList = [];
//var moduleDefines = {basePackage:"com.simple.bz",apiServer:"127.0.0.1:8080",enables: [], modules: {}};

var config = {
    workRootPath: process.cwd(),
    workModulesPath: function () {return path.join(this.workRootPath, "generator/modules/")},
    workContractsPath: function () {return path.join(this.workRootPath, "generator/contracts/")},
    rootGeneratorsPath: function () {return path.join(this.workRootPath,"generator/lib/generators/");},
};


function findGeneratorByName(name) {
    var foundGenerator;
    generatorList.forEach(function (generator) {
        if (generator.coderDefine.name == name) {
            foundGenerator = generator;
            return;
        }
    });

    return foundGenerator;
}
function generatorPromptMsg(name) {
    var msg = 'Usage:\n';
    generatorList.forEach(function (generator) {
        var cmd = generator.coderDefine.name;
        var desc = generator.coderDefine.name;
        msg = msg + "Command:[" + cmd + "] --Function:" + desc + "\n";
    });

    return msg;
}

function loadGenerators() {
    var mPath = config.rootGeneratorsPath();
    var files = fs.readdirSync(mPath);
    files.forEach(function (file) {
        var filePath = path.join(mPath, file);
        console.log("generater file:" + filePath);
        var stats = fs.statSync(filePath);
        if (!stats.isDirectory()) {
            var generator = require(filePath);
            if (!generator.coderDefine) {
                return;
            }
            if (!generator.coderDefine.name) {
                return;
            }
            generatorList.push(generator);
        }
    });
}
function initGenerators() {
    initPathEnv();
    loadGenerators();
}
function initPathEnv() {
    var currentPath = process.cwd() + "/";
    console.log("currentPath is:" + currentPath);
    config.workRootPath = currentPath;
}

function initProject(byFiles, setting) {
    initGenerators();
    if (byFiles==true){
        moduleDefines.loadDefinesFromFiles(config.workModulesPath());
        moduleDefines.loadContractsFromFiles(config.workContractsPath());
    }else{
        moduleDefines.loadDefinesFromParams(setting.projectSetting, setting.modules);
    }
    console.log("finished init project ! new project!");
}
function generateCode(language, type,subtype, withFramework,withCommonModules) {
    console.log('getplatformName:' + platformName + "withframework:"  + withFramework);

    initGenerators();
    var generatorSelector = 'java-web';
    if(subtype){
        generatorSelector = language + '-' + type + '-' +subtype;
    }else{
        generatorSelector = language + '-' + type;
    }

    var generator = findGeneratorByName(generatorSelector);
    if (!generator) {
        console.log("Generator named:[" + language + "] not found!");
        return;
    }

    generator.initEnv(moduleDefines.getProjectSetting(),platformName);


    if (!withFramework){withFramework = false;}
    generator.generateFramework(withFramework);


    if (withCommonModules){
        generator.generateCommon();
    }
    moduleDefines.getProjectSetting().enables.forEach(function (moduleName) {
        generator.generateModuleByName(moduleName, moduleDefines.getModuleDefineByName(moduleName),platformName);
    });

    moduleDefines.contracts.forEach(function (contractName) {
        generator.generateContractByName(contractName, moduleDefines.getServiceContractDefineByName(contractName),platformName);
    });

    console.log("generated code by define file in modules directory\n");

}

exports.generateCode = generateCode;
exports.generatorPromptMsg = generatorPromptMsg;
exports.initProject = initProject;





