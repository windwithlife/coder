
var path = require('path');
var fs   = require('fs');
var codeTools = require('./code_tools');

 class ParamsHelper {
    
    ParamsHelper(){
        this.basePackage="com.simple.bz.auto";
        this.apiServer ="127.0.0.1:8080";
        this.sideType ='web';
        this.language = 'js';
        this.framework='nextjs';
        this.platform ='all';
        console.log('init project config');
    }
    initParamsFromProject(setting){
        this.sideType = setting.sideType;
        this.language = setting.language;
        this.framework = setting.framework;
        this.platform  = setting.platform;
        this.projectId = setting.projectId;
        this.projectName = setting.projectName;
    }
    buildParamsByTable(moduleName,tableDefine){

        let params = {
            projectName:this.projectName,      
        }
        params.moduleDefine = tableDefine;
        params.moduleName = moduleName;
        params.tableName = tableDefine.name;
        params.moduleClassName = codeTools.firstUpper(moduleName);
        params.tableClassName = codeTools.firstUpper(tableDefine.name);
        params.refers = [];
        params.fields = [];
        tableDefine.columns.forEach(function(col){
            let clsName = codeTools.firstUpper(col.name);
            params.fields.push({def:col,name:col.name,cls:clsName});
            if(col.referModule){
                var referModuleClass = codeTools.firstUpper(col.referModule);
                params.refers.push({module:col.referModule,cls:referModuleClass,map:col.referMap});
            }
        });
        return params;

    }
    buildParamsByDomain(moduleName,defineData){
        let params = {
            projectName:this.projectName,      
        }
        params.define = defineData;
        params.moduleName = moduleName;
        params.name = defineData.name;
        params.moduleClassName = codeTools.firstUpper(moduleName);
        params.nameClassName = codeTools.firstUpper(defineData.name);
        params.fields = defineData.tableFields;
        params.interfaces = defineData.interfaces;
        params.interfaces.forEach(function(interfaceObj){
            //interfaceObj.responseName = interfaceObj.name + 'Response';
            if(interfaceObj.requestMethod == 'get'){
                interfaceObj.requestMethodName = 'query';
            }else{
                interfaceObj.requestMethodName = 'post';
            }
            interfaceObj.responseDataName = interfaceObj.name + 'Response';
        })
        return params;

    }
    
}


module.exports = ParamsHelper;



