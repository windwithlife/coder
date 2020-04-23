
var path = require('path');
var fs   = require('fs');
var codeTools = require('../code_tools');
var xtools = require('../xtools');
var PathConfig = require('../path_config');
var ParamsHelper = require('../params_helper');
pathConfig = new PathConfig();
paramsHelper = new ParamsHelper();

function generateEntity(moduleName,defineData){
    let templateFilename =   pathConfig.templateServer() + "/entity.java";
    let targetFileName = pathConfig.targetServer(moduleName,'entity') + codeTools.firstUpper(defineData.name) + ".java";
    var params = paramsHelper.buildParamsByTable(moduleName,defineData);
    codeTools.generateCode(templateFilename,params,targetFileName);

};
function generateDAO(moduleName,defineData){
    let templateFilename =   pathConfig.templateServer() + "/DAO.java";
    let targetFileName = pathConfig.targetServer(moduleName,"dao") + codeTools.firstUpper(defineData.name) + "Repository.java";
    var params = paramsHelper.buildParamsByTable(moduleName,defineData);
    codeTools.generateCode(templateFilename,params,targetFileName);

};

function generateService(moduleName,defineData){
    let templateFilename =   pathConfig.templateServer() + "/service.java";
    let targetFileName = pathConfig.targetServer(moduleName,'service') + codeTools.firstUpper(defineData.name) + "Service.java";
    var params = paramsHelper.buildParamsByTable(moduleName,defineData);
    codeTools.generateCode(templateFilename,params,targetFileName);

};
function generateController(moduleName,defineData){
    let templateFilename =   pathConfig.templateServer() + "/controller.java";
    let targetFileName = pathConfig.targetServer(moduleName,'controller') + codeTools.firstUpper(defineData.name) + "Controller.java";
    var params = paramsHelper.buildParamsByTable(moduleName,defineData);
    codeTools.generateCode(templateFilename,params,targetFileName);

};

function generateModuleController(moduleName,defineData){
    let templateFilename =   pathConfig.templateServer() + "/ModuleController.java";
    let targetFileName = pathConfig.targetServer(moduleName,'controller') + codeTools.firstUpper(defineData.name) + "ModuleController.java";
    var params = paramsHelper.buildParamsByDomain(moduleName,defineData);
    codeTools.generateCode(templateFilename,params,targetFileName);

};
function generateDTO(moduleName,defineData){
    let templateFilename =   pathConfig.templateServer() + "/dto.java";
    let targetFileName = pathConfig.targetServer(moduleName,'dto')  + defineData.nameClassName +".java";
    var params = paramsHelper.buildParamsByDTO(moduleName,defineData);
    codeTools.generateCode(templateFilename,params,targetFileName);
};

function generateStore(moduleName,defineData){
    let templateFilename =   "/model.js";
    let targetFileName = codeTools.firstUpper(defineData.name) + "Store.js";

    templateFilename = pathConfig.templateModel() + templateFilename ;
    targetFileName   = pathConfig.targetModel(moduleName)+ targetFileName;
    var params = paramsHelper.buildParamsByDomain(moduleName,defineData);
    codeTools.generateCode(templateFilename,params,targetFileName);

};

function generatePage(moduleName,defineData){
    //let templateFilename =   "/model.js";
    let targetFileName = pathConfig.targetView(moduleName) + codeTools.firstUpper(defineData.name) + ".js";
    templateText = defineData.defineText;
    var params = paramsHelper.buildParamsByPage(moduleName,defineData);
    codeTools.generateCodeFileByText(templateText,params,targetFileName);

};

function generateModuleByName(moduleDefine){
    
    //console.log('module defines:' + JSON.stringify(moduleDefine));
    moduleDefine.tables.forEach(function(item){
        generateEntity(moduleDefine.name,item);
        generateDAO(moduleDefine.name,item);
        generateService(moduleDefine.name,item);
        generateController(moduleDefine.name,item);
        
    });
    moduleDefine.dtos.forEach(function(item){
        generateDTO(moduleDefine.name,item);
    });

    moduleDefine.domains.forEach(function(domainItem){
        if(domainItem.domainType =='module'){
            generateModuleController(moduleDefine.name,domainItem);
        }
        
        //generateStore(moduleDefine.name,domainItem);
    });

}


function generateFramework(release){
    if (!pathConfig.targetMicroServicesIsReady()){
        xtools.copyDirEx(pathConfig.templateMicroServicesCopyFiles(),pathConfig.targetMicroServicesCopyFiles());
    }
    xtools.copyDirEx(pathConfig.templateCopyFiles("microserver"),pathConfig.targetCopyFiles(release.name));
}


function initPathEnv(proConfig){
    let srcRootPath =  "/" + proConfig.name + "/src/main/java/";
    pathConfig.initWithRootPath(srcRootPath,proConfig);
    paramsHelper.initParamsFromProject(proConfig);
    projectConfig = proConfig;
    console.log("workRootPath:" + pathConfig.rootPath()+'templateroot' + pathConfig.templateRoot()+ "Code-targetServerPath:" + pathConfig.targetRoot());   
}

exports.generateFramework = generateFramework;
exports.generateModuleByName = generateModuleByName;
exports.initEnv = initPathEnv;

exports.coderDefine = {name:"server-java-springboot-all",desc:"create a springboot framework server code"};


