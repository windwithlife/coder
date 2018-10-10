/**
 * Created by zhangyq on 2016/5/1.
 */

var path = require('path');
var fs = require('fs');


function firstUpperCase(str) {
    if (!str) {
        return ''
    }
    let strResult = str.substring(0, 1).toUpperCase() + str.substring(1);
    return strResult;
}

var ModuleDefines = function () {
    this.pSetting = {};
    this.pSetting.basePackage = "com.simple.bz.auto";
    this.pSetting.apiServer = "127.0.0.1:8080";
    this.pSetting.enables = [];
    this.modules = {};
    console.log('initialize the ModuleDefines!');
}

ModuleDefines.prototype.addModuleDefine = function (moduleName, moduleDefine) {
    this.modules[moduleName] = moduleDefine;
}
ModuleDefines.prototype.getProjectSetting = function () {
    return this.projectSetting;
}
ModuleDefines.prototype.getModuleDefineByName = function (moduleName) {
    return this.modules[moduleName];
}

ModuleDefines.prototype.loadDefinesFromParams = function (pSetting, pModules) {
    this.pSetting = pSetting;
    pModules.forEach(function(m){
        this.modules[m.name] = m;
    });
    this.adjustData();
    //this.modules = modules;
}

ModuleDefines.prototype.loadDefinesFromFiles = function (moduleDefinePath) {

    var that = this;
    var mPath = moduleDefinePath;
    var files = fs.readdirSync(mPath);
    files.forEach(function (file) {
        var filePath = mPath + file;
        var stats = fs.statSync(filePath);
        if (!stats.isDirectory()) {
            var mdefine = require(filePath);
            if (!mdefine.name) {
                return;
            }
            console.log(filePath);
            var moduleName = mdefine.name;
            that.modules[moduleName] = mdefine;
        }
    });

    var setting = require(mPath + "config");
    this.projectSetting = setting;
    this.adjustData();

}

ModuleDefines.prototype.adjustData = function () {
    for (var moduleName in this.modules){
        var module  = this.modules[moduleName];
        this.adjustFields(module);
        //this.adjustRelation();
    }
}

ModuleDefines.prototype.adjustFields = function (module) {
    module.properties = {};
    module.properties.isAssociation = module.isAssociation;
    module.properties.moduleDefine = module.fields;
    module.properties.moduleName = module.name;
    module.properties.moduleNameCLS = firstUpperCase(module.name);

    module.properties.packageName  = this.projectSetting.basePackage;
    module.properties.apiServer  = this.projectSetting.apiServer;

    module.properties.refers = {};
    for (var field in module.fields){
        var fieldDef  = module.fields[field];
        fieldDef.name = field;
        fieldDef.nameCLS = firstUpperCase(field);
        if (fieldDef.refer){

            fieldDef.refer.moduleCLS = firstUpperCase(fieldDef.refer.module);
            module.properties.refers[fieldDef.refer.module] = fieldDef.refer;

            if (fieldDef.refer.map=='ManyToMany'){
                var mapName = module.name + fieldDef.refer.module;
                fieldDef.refer.associationTable = mapName;
                fieldDef.show = "M2MList";
                var newMapModule = {isAssociation:'yes'};
                newMapModule.name = mapName;
                newMapModule.fields={};
                newMapModule.fields["id"] = {type: 'Long'};
                newMapModule.fields["name"] = {type: 'String'};
                newMapModule.fields[module.name +"Id"] = {type: 'Long'};
                newMapModule.fields[module.name +"Name"] = {type: 'String'};
                newMapModule.fields[fieldDef.refer.module +"Id"] = {type: 'Long'};
                newMapModule.fields[fieldDef.refer.module +"Name"] = {type: 'String'};

                this.modules[mapName] = newMapModule;
                this.projectSetting.enables.push(mapName);
                this.adjustFields(newMapModule);
            }
            if (fieldDef.refer.mapField=='yes'){
                module.properties.isChildModule = true;
                module.properties.parentModule = fieldDef.refer.module;
                module.properties.parentMapField = field;
            }
        }
    }

}

ModuleDefines.prototype.buildParams = function (module) {
    var params = Object.assign({},module.properties);
    //params.moduleDefine = module.fields;
    return params;
}

module.exports = ModuleDefines;

