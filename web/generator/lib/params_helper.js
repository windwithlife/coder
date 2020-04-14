
var path = require('path');
var fs   = require('fs');
var codeTools = require('./code_tools');

 class ParamsHelper {
    
    constructor(){
        this.basePackage="com.simple.server.auto";
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
        params.packageName = this.basePackage;
        params.moduleDefine = tableDefine;
        params.moduleName = moduleName;
        params.tableName = tableDefine.name;
        params.name = tableDefine.name;
        params.className = codeTools.firstUpper(tableDefine.name);
        params.moduleClassName = codeTools.firstUpper(moduleName);
        params.tableClassName = codeTools.firstUpper(tableDefine.name);
        params.refers = [];
        params.fields = [];
        tableDefine.columns.forEach(function(col){
            let clsName = codeTools.firstUpper(col.name);
            //Map Type
            let mapType = "OneToOne";
            if (col.map == 1){mapType = "OneToMany";}
            if (col.map == 2){mapType = "ManyToOne";}
            if (col.map == 3){mapType = "ManyToMany";}
            if (col.map < 0){mapType = "NULL";}
            var referModuleClass;
            if(col.referModule){
                referModuleClass = codeTools.firstUpper(col.referModule);
                params.refers.push({name:col.referModule,className:referModuleClass,mapType:mapType});
            }
            // Field Type
            let fieldType = col.fieldType;
            let fieldColumnType = col.fieldType;
            if (col.fieldType == 'int'){fieldColumnType = 'Long'};
            if (col.fieldType == 'Text'){fieldColumnType = 'String'};
            params.fields.push({def:col,name:col.name,className:clsName,
                mapType:mapType,mapField:col.mapField,referModule:col.referModule,referModuleClass:referModuleClass,
                columnType:fieldColumnType});
            
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
        params.refers = defineData.refers;
        params.interfaces = defineData.interfaces;
        params.interfaces.forEach(function(interfaceObj){
            //interfaceObj.responseName = interfaceObj.name + 'Response';
            if(interfaceObj.requestMethod == 'get'){
                interfaceObj.requestName = 'query';
                interfaceObj.requestMethodType = "GET";
            }else{
                interfaceObj.requestName = 'post';
                interfaceObj.requestMethodType = "POST";
            }
            interfaceObj.responseDataName = interfaceObj.name + 'Response';
        })
        return params;

    }

    buildParamsByDTO(moduleName,defineData){
        let params = {
            projectName:this.projectName,      
        }
        params.define = defineData;
        params.moduleName = moduleName;
        params.name = defineData.name;
        params.moduleClassName = codeTools.firstUpper(moduleName);
        params.nameClassName = codeTools.firstUpper(defineData.name);
        params.className = codeTools.firstUpper(defineData.name);
        params.fields = defineData.defines;
        //params.fields = defineData.tableFields;
        //params.interfaces = defineData.interfaces;
        
        return params;

    }
    buildParamsByPage(moduleName,defineData){
        let params = {
            projectName:this.projectName,      
        }
        params.define = defineData;
        params.moduleName = moduleName;
        params.name = defineData.name;
        params.moduleClassName = codeTools.firstUpper(moduleName);
        params.nameClassName = codeTools.firstUpper(defineData.name);
        //params.fields = defineData.tableFields;
        params.domains = [];
        params.interfaces = defineData.interfaces;

        params.interfaces.forEach(function(interfaceObj){
            interfaceObj.requestURL = interfaceObj.name;
            if(interfaceObj.requestMethod == 'get'){
                interfaceObj.requestMethodName = 'query';
                interfaceObj.requestMethodType = 'GET';
            }else{
                interfaceObj.requestMethodName = 'post';
                interfaceObj.requestMethodType = 'POST';
            }
            interfaceObj.responseDataName = interfaceObj.name + 'Response';
            
            let haveThisDomain = false;
            params.domains.forEach(function(domainItem){
                if(domainItem == interfaceObj.domain){
                    haveThisDomain = true;
                }
            });
            if (!haveThisDomain){
                params.domains.push(interfaceObj.domain);
            }

            interfaceObj.fullName = interfaceObj.domain + "." + interfaceObj.name;
            interfaceObj.resultDataObjName = interfaceObj.name + 'Response';
            interfaceObj.inputParamObjName = interfaceObj.name + "InputParam";
            interfaceObj.invokeName = interfaceObj.fullName  + "("+ interfaceObj.inputParamObjName +').then(this.composeResultData.bind(this,'+'"' +interfaceObj.resultDataObjName+ '"' +'))';

        })

        params.widgets = defineData.widgets;
        params.widgets.forEach(function(item){
            item.className =  codeTools.firstUpper(item.name);
            item.fileName =  item.name;
        });

        return params;

    }
    
}


module.exports = ParamsHelper;



