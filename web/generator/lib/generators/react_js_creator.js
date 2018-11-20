
var path = require('path');
var fs   = require('fs');
var codeTools = require('../code_tools');
var xtools = require('../xtools');
var config = require('../config');




function createConfigRouter(moduleName,moduleDefine){

    var filename =  "router.js";
    var tFilename = filename;
    templateFile = config.workRouterTemplatePath() + tFilename ;
    moduleFile   = config.targetModuleRouterPath() + filename;
    var params = config.buildBaseParams();
    codeTools.generateCode(templateFile,params,moduleFile);

};

function createClientReduxItem(itemName){
    var filename =  itemName + ".js";
    var tFilename = filename;
    templateFile = path.join(config.workReduxTemplatePath(),tFilename );
    moduleFile   = path.join(config.targetModuleReduxPath(), filename);
    var params = config.buildBaseParams();
    codeTools.generateCode(templateFile,params,moduleFile);
}


function createClientReduxFlow(){

    //actions
    createClientReduxItem("actions/index");

    //reducers
    createClientReduxItem("reducers/index");
    createClientReduxItem("reducers/homeReducer");
    createClientReduxItem("reducers/listReducer");
    createClientReduxItem("reducers/addReducer");
    createClientReduxItem("reducers/updateReducer");
    createClientReduxItem("reducers/deleteReducer");

};

function createReleasePackageFiles(){

    var filename =  "webpack.config.js";
    tFilename = filename;
    var releaseFilename = config.endName + "." +filename;
    var templateFile = config.workReleasePackageTemplatePath() + tFilename ;
    var moduleFile   =  config.targetReleasePackagePath() + releaseFilename;
    var params = config.buildBaseParams();
    codeTools.generateCode(templateFile,params,moduleFile);

};

function buildParams(moduleName,moduleDefine){
    var params = Object.assign({},moduleDefine.properties);
    return params;
}
function createModel(moduleName,moduleDefine){
    var filename =  "model.js";
    var tFilename = filename;
    var templateFile = config.workModelTemplatePath() + filename;
    var moduleFile   = config.targetModuleModelPath() + tFilename ;
    var params = buildParams(moduleName,moduleDefine);
    codeTools.generateCode(templateFile,params,moduleFile);

};
function createFunctionViewAndController(fName, moduleName,moduleDefine){
    var filename =  fName + ".js";
    var tFilename = filename;

    templateFile = config.workControllerTemplatePath() + tFilename ;
    moduleFile   = config.targetModuleControllerPath() + filename;
    var params = buildParams(moduleName,moduleDefine);
    console.log("create code file by template file:" + templateFile + "targetfile:" + moduleFile);
    codeTools.generateCode(templateFile,params,moduleFile);
};


function createModuleBaseDirectories(moduleName){
    xtools.mkdirX(config.targetWebResourceRootPath());
    codeTools.createDirectory(config.targetModuleRootPath());
    codeTools.createDirectory(config.targetModuleControllerPath());
    codeTools.createDirectory(config.targetModuleModelPath());
    codeTools.createDirectory(config.targetModuleRouterPath());
    codeTools.createDirectory(config.targetModuleConfigPath());
    codeTools.createDirectory(config.targetModuleComponentsPath());
    codeTools.createDirectory(config.targetWebResourceCommonPath());

}
function generateFrameworkDirectories(){
    console.log(config.targetWebRootPath());
    xtools.mkdirX(config.targetWebRootPath());
    xtools.mkdirX(config.targetWebResourceRootPath());
}




function generateClientModule(moduleName,moduleDefine){
    config.module = moduleName;
    createModuleBaseDirectories(moduleName);
    createModel(moduleName,moduleDefine);
    createConfigRouter(moduleName,moduleDefine);
    createFunctionViewAndController("add",moduleName,moduleDefine);
    createFunctionViewAndController("edit",moduleName,moduleDefine);
    createFunctionViewAndController("list",moduleName,moduleDefine);
    createFunctionViewAndController("detail",moduleName,moduleDefine);
    createFunctionViewAndController("association",moduleName,moduleDefine);
    //createFunctionViewAndController("home",moduleName,moduleDefine);

}

function generateModuleByName(moduleName,defines,platformName){
    //initPathEnv(defines);
    //var mdefine = defines[moduleName];
    var mdefine = defines;
    if (!mdefine){return;}
    if (defines.properties.isAssociation){return;};
    //console.log('module defines:' + JSON.stringify(mdefine));
    config.platform= platformName;
    generateClientModule(mdefine.name,mdefine);

}

function initPathEnv(projectDefines,platformName){
    var currentPath = process.cwd();
    var targetRoot = path.join(process.cwd(), "/../files",platformName);
    config.workRootPath = currentPath;
    config.targetRootPath = targetRoot;
    config.platform = platformName;
    config.basePackage = projectDefines.basePackage;
    config.apiServer = projectDefines.apiServer;
    config.endName = "client";
    //config.defines = defines;
    console.log("workRootPath:" + config.workRootPath + " Code-targetServerPath:" + config.targetRootPath);
    console.log("platformname:" + config.platform);


}


function copyFrameworkFiles(){

    console.log("begin to copy framework files" + config.workFrameworkTemplatePath());

    xtools.copyDirEx(config.workFrameworkTemplatePath(),config.targetWebRootPath());

}




function generateFramework(withframework){
    generateFrameworkDirectories();
    console.log(withframework);
    if (withframework){
        copyFrameworkFiles();
    }

}
function generateCommon(sideName){
    //copyFrameworkFiles();
}
function initProjectEnv(defines){
    initPathEnv(defines);
}

exports.generateFramework = generateFramework;
exports.generateModuleByName = generateModuleByName;
exports.generateCommon = generateCommon;
exports.initEnv = initPathEnv;

exports.coderDefine = {name:"rjx",desc:"create a react js framework and related project code"};


