
var path = require('path');
var fs   = require('fs');
var codeTools = require('../code_tools');
var xtools = require('../xtools');
var PathConfig = require('../path_config');
var ParamsHelper = require('../params_helper');
pathConfig = new PathConfig();
paramsHelper = new ParamsHelper();

function createModel(moduleName,tableDefine){
    let templateFilename =   "/model.js";
    let targetFileName = codeTools.firstUpper(tableDefine.name) + "Store.js";

    templateFilename = pathConfig.templateModel() + templateFilename ;
    targetFileName   = pathConfig.targetModel(moduleName)+ targetFileName;
    var params = paramsHelper.buildParamsByTable(moduleName,tableDefine);
    codeTools.generateCode(templateFilename,params,targetFileName);

};
function createView(moduleName,tableDefine,viewName){
    let templateFilename =  viewName + ".js";
    let targetFileName = tableDefine.name + "_"+viewName + ".js";

    templateFilename = pathConfig.templateView() + templateFilename ;
    targetFileName   = pathConfig.targetView(moduleName)+ targetFileName;
    var params = paramsHelper.buildParamsByTable(moduleName,tableDefine);
    codeTools.generateCode(templateFilename,params,targetFileName);
};


function generatePagesByTable(moduleName,tableDefine){
    
    createModel(moduleName,tableDefine);
    //createView(moduleName,tableDefine,'add');
    //createView(moduleName,tableDefine,'edit');
    createView(moduleName,tableDefine,'detail');
    //createView(moduleName,tableDefine,'list');
   
}

function generateModuleByName(moduleDefine){
    
    console.log('module defines:' + JSON.stringify(moduleDefine));
    moduleDefine.tables.forEach(function(table){
        generatePagesByTable(moduleDefine.name,table);
    });
}


function generateFramework(){
   
    xtools.copyDirEx(pathConfig.templateCopyFiles(),pathConfig.targetCopyFiles());
}


function initPathEnv(proConfig){
   
    pathConfig.initWithRootPath("/pages/",proConfig);
    paramsHelper.initParamsFromProject(proConfig);
    projectConfig = proConfig;
    console.log("workRootPath:" + pathConfig.rootPath()+'templateroot' + pathConfig.templateRoot()+ "Code-targetServerPath:" + pathConfig.targetRoot());   
}

exports.generateFramework = generateFramework;
exports.generateModuleByName = generateModuleByName;
//exports.generateCommon = generateCommon;
exports.initEnv = initPathEnv;

exports.coderDefine = {name:"web-reactjs-nextjs-all",desc:"create a react js framework and related project code"};


