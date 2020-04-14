
var path = require('path');
var fs   = require('fs');
require('shelljs/global');


function checkPath(pathName) {
    var isExist = fs.existsSync(pathName);
    if(!isExist){
        mkdir('-p', pathName);
    }  
}
// var codeTools = require('../code_tools');
// var xtools = require('../xtools');
//var PathConfig = require('../path_config');



let TemplateRoot = '/generator/templates/';
let TargetRoot = '../files/';

 class PathConfig{

   
    constructor(){
        
        this.basePackage="com.simple.server.auto";
        this.languageExt = 'js';
        this.srcRoot = '/pages/';
        console.log('init papth config');
    }
  
    initWithRootPath(srcRoot,projectConfig){
        this.srcRoot = srcRoot;
        this.currentRootPath = process.cwd();
        this.projectConfig = projectConfig;
        console.log(this.projectConfig);
    }
    javaPackageToPath(packageName){
        if (packageName) {
            var pathtmp;
            packageName.split('.').forEach(function(item) {
                if (pathtmp) {
                    pathtmp += item +"/" ;
                }
                else {
    
                    pathtmp = '/' + item + '/';
                }
    
            });
            return pathtmp;
        }
        return "/";
    }
    getPrjectPath(){
        let projectConfig = this.projectConfig;
        let projctPath  = '';
        projctPath = projctPath + this.projectConfig.sideType;
        projctPath = projctPath + '-' + this.projectConfig.language;

        if (!this.projectConfig.framework){
             projctPath = projctPath + '-' + 'none';
        }else{
            projctPath = projctPath +'-' + this.projectConfig.framework;
        }
        if (!this.projectConfig.platform){
            projctPath = projctPath +  '-all';
        }else{
            projctPath = projctPath + '-' +  this.projectConfig.platform;
        }
       
        //generatorSelector = targetConfig.sideType + '-' + targetConfig.language + '-' + targetConfig.framework + targetConfig.platform;
        //console.log('Project Path is :' + projctPath);
        return projctPath;
    }
    rootPath(){
        return this.currentRootPath;
    }
    templateRoot(){
        return path.join(this.currentRootPath, TemplateRoot,this.getPrjectPath());
    }
    targetRoot(){
        let pathName  = path.join(this.currentRootPath,TargetRoot,this.projectConfig.projectId,this.projectConfig.sideType);
        checkPath(pathName);
        return pathName;
    }
    templateView(pageName){
        let pathName  = path.join(this.templateRoot(),"/views/");
        //checkPath(pathName);
        return pathName;
    }
    templateModel(pageName){
        let pathName  = path.join(this.templateRoot(),"/models/");
        //checkPath(pathName);
        return pathName;
    }
    templateServer(moduleName){
        let pathName  = path.join(this.templateRoot(),"/server/");
        //checkPath(pathName);
        return pathName;
    }
    templateCopyFiles(){
        let pathName  = path.join(this.templateRoot(),"/copyfiles");
        //checkPath(pathName);
        return pathName;
    }
    targetCopyFiles(){
        let pathName  = path.join(this.targetRoot(),"/");
        checkPath(pathName);
        return pathName;
    }
    targetSrcRoot(){
        let pathName  = path.join(this.targetRoot(),this.srcRoot);
        checkPath(pathName);
        return pathName;
    }
    targetView(moduleName){
        let pathName  = path.join(this.targetSrcRoot(),moduleName,'/');
        checkPath(pathName);
        return pathName;
    }
    targetModel(moduleName){
        let pathName  = path.join(this.targetSrcRoot(),moduleName,'/models/');
        checkPath(pathName);
        return pathName;
    }
    targetServer(moduleName,typeName){
        let typePath ='/';
        if (typeName){
            typePath = typeName + '/';
        }
        let pathName  = path.join(this.targetSrcRoot(),this.javaPackageToPath(this.basePackage),typePath);
        //console.log(this.basePackage);
        //console.log(this.javaPackageToPath(this.basePackage));
        //console.log(pathName);
        checkPath(pathName);
        return pathName;
    }
}


module.exports = PathConfig;



