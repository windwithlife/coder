
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
    
}


module.exports = ParamsHelper;



