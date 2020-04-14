/**
 * Created by zhangyq on 2016/5/1.
 */

var path = require('path');
var fs = require('fs');
var codeTools = require('./code_tools');

function firstUpperCase(str) {
    if (!str) {
        return ''
    }
    let strResult = str.substring(0, 1).toUpperCase() + str.substring(1);
    return strResult;
}

class ModuleDefines {
    constructor() {
        this.pSetting = {};
        this.pSetting.basePackage = "com.simple.bz.auto";
        this.pSetting.apiServer = "127.0.0.1:8080";
        this.pSetting.enables = [];
        this.modules = {};
        this.contracts = {};
        this.defines = [];
        console.log('initialize the ModuleDefines!');
    }

    addModuleDefine(moduleName, moduleDefine) {
        this.modules[moduleName] = moduleDefine;
    }
    getProjectSetting() {
        return this.projectSetting;
    }
    getModuleDefineByName(moduleName) {
        //return this.modules[moduleName];
        return this.moduleDefines[moduleName];
    }
    modules() {
        return this.defines;
    }

    getServiceContractDefineByName(contractName) {
        return this.contracts[contractName];
    }

    loadDefinesFromParams(modules) {

        let that = this;
        this.defines = modules;
        this.defines.forEach(function (module) {
            that.adjustModulesData(module);
        })


    }
    parseInterfaceParams(params){
        let fields = [];
        for (let param in params){
            let className = codeTools.firstUpper(param);
            fields.push({name:param,className:className, type:params[param]});
        }
        return fields;
    }
    adjustModulesData(module) {
        let that = this;
        module.domains = [];
        module.dtos = [];
        module.tables.forEach(function (table) {
            table.refers = [];
            console.log('table info ************################');
            //console.log(table);
            let requestDtoDefines = [];
            let responseDtoDefines = [];
            table.columns.forEach(function (col) {
                let clsName = codeTools.firstUpper(col.name);
                let fieldType = col.fieldType;
                let fieldName = col.name;
                requestDtoDefines.push({ name: fieldName, className: clsName, type: fieldType });
                if (col.referModule) {
                    let referModuleClass = codeTools.firstUpper(col.referModule);

                    let mapType = "OneToOne";
                    if (col.map == 1) { mapType = "OneToMany"; }
                    if (col.map == 2) { mapType = "ManyToOne"; }
                    if (col.map == 3) { mapType = "ManyToMany"; }
                    if (col.map < 0) { mapType = "NULL"; }
                    table.refers.push({ name: col.referModule, className: referModuleClass, mapType: mapType });

                    if ((col.map == 1) || (col.map == 3)) {
                        fieldType = "List<" + referModuleClass + ">";
                        fieldName = col.referModule + 's';
                    } else if (col.map == 2) {
                        fieldName = col.referModule + "Id";
                        fieldType = 'Long';
                    }

                }
                clsName = codeTools.firstUpper(fieldName);
                responseDtoDefines.push({ name: fieldName, className: clsName, type: fieldType });

            });
            let requestDtoName = table.name + "RequestDTO";
            let requestDtoClass = codeTools.firstUpper(requestDtoName);
            let requestDto = { name: requestDtoName, className: requestDtoClass, defines: requestDtoDefines };
            let responseDtoName = table.name + "ResponseDTO";
            let responseDtoClass = codeTools.firstUpper(responseDtoName);
            let responseDto = { name: responseDtoName, className: responseDtoClass, defines: responseDtoDefines };

            module.dtos.push(requestDto);
            module.dtos.push(responseDto);
            let domainClassName =  codeTools.firstUpper(table.name);
            let domainItem = { name: table.name, className:domainClassName, domainId:table.id,tableFields: table.columns, refers: table.refers };
            module.domains.push(domainItem);
        });


        module.domains.forEach(function (domainItem) {
            domainItem.interfaces = [];
            module.interfaces.forEach(function (interfaceItem) {
                    interfaceItem.inputType = '';
                    if (interfaceItem.inputParams) {
                        console.log(interfaceItem.inputParams);
                        let params = that.parseInterfaceParams(JSON.parse(interfaceItem.inputParams));
                        console.log(params);
                        if (params.length == 1) {
                            interfaceItem.inputType = params[0].type;
                            interfaceItem.inputName = params[0].name;
                        } else if (params.length > 1) {
                            let requestName = interfaceItem.name + 'Request';
                            let requestNameClass = firstUpperCase(requestName);
                            let inputDTO = { name: requestName, className: requestNameClass, defines: params };
                            module.dtos.push(inputDTO);
                            interfaceItem.inputType = requestNameClass;

                        }

                    }
                        interfaceItem.outputType = '';
                        if (interfaceItem.outputParams) {
                            console.log(interfaceItem.outputParams);
                            let params = that.parseInterfaceParams(JSON.parse(interfaceItem.outputParams));
                            console.log(params);
                            if (params.length == 1) {
                                interfaceItem.outputType = params[0].type;
                                interfaceItem.outputName = params[0].name;
                            } else if (params.length > 1) {
                                let responseName = interfaceItem.name + 'Response';
                                let responseNameClass = firstUpperCase(responseName);
                                let outputDTO = { name: responseName, className: responseNameClass, defines: params };
                                module.dtos.push(outputDTO);
                                interfaceItem.outputType = responseNameClass;
                            }



                        }
                        if (interfaceItem.domainId == domainItem.domainId) {
                            //以保证表名修改Domain名称一致
                            interfaceItem.domain = domainItem.name;
                            domainItem.interfaces.push(interfaceItem);
                        }
                    });

        });
        module.storeDomains = module.domains;
        module.serviceDomains = module.domains;
        console.log('**************************' + module.name + '模块的所有域 Begin**********************');
        console.log(module.domains);
        console.log('**************************' + module.name + '模块的所有域 End**********************');

    }
    loadDefinesFromFiles(moduleDefinePath) {

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
    loadContractsFromFiles(moduleDefinePath) {

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
                var service_name = mdefine.namespace + mdefine.service_name;
                that.contracts[service_name] = mdefine;
            }
        });

        this.adjustContractsData();

    }
    adjustContractsData() {
        for (var contractName in this.contracts) {
            var contract = this.contracts[contractName];
            this.adjustContract(contract);

        }
    }
    adjustContract(contract) {
        contract.serviceCLS = firstUpperCase(contract.service_name);
        contract.operations.forEach(function (operation) {
            operation.requestCLS = firstUpperCase(contract.module) + firstUpperCase(operation.name) + "Request";
            operation.responseCLS = firstUpperCase(contract.module) + firstUpperCase(operation.name) + "Response";
            for (var field in operation.requestType) {
                var fieldDef = { 'type': operation.requestType[field] };
                fieldDef.nameCLS = firstUpperCase(field);
                operation.requestType[field] = fieldDef;
            }
            for (var field in operation.responseType) {
                var fieldResDef = { 'type': operation.responseType[field] };
                fieldResDef.nameCLS = firstUpperCase(field);
                operation.responseType[field] = fieldResDef;
            }
        })

        var properties = {};

        properties.define = contract;
        properties.moduleName = contract.module;
        properties.moduleNameCLS = firstUpperCase(properties.moduleName);

        properties.serviceName = contract.service_name;
        properties.serviceCLS = contract.serviceCLS;
        properties.packageName = this.projectSetting.basePackage;
    }


    adjustData() {
        for (var moduleName in this.modules) {
            var module = this.modules[moduleName];
            this.adjustFields(module);

        }
    }

    adjustFields(module) {
        module.properties = {};
        module.properties.isAssociation = module.isAssociation;
        module.properties.moduleDefine = module.fields;
        module.properties.moduleName = module.name;
        module.properties.moduleNameCLS = firstUpperCase(module.name);

        module.properties.packageName = this.projectSetting.basePackage;
        module.properties.apiServer = this.projectSetting.apiServer;

        module.properties.refers = {};
        for (var field in module.fields) {
            var fieldDef = module.fields[field];
            fieldDef.name = field;
            fieldDef.nameCLS = firstUpperCase(field);
            if (fieldDef.refer) {

                fieldDef.refer.moduleCLS = firstUpperCase(fieldDef.refer.module);
                module.properties.refers[fieldDef.refer.module] = fieldDef.refer;

                if (fieldDef.refer.map == 'ManyToMany') {
                    var mapName = module.name + fieldDef.refer.module;
                    fieldDef.refer.associationTable = mapName;
                    fieldDef.show = "M2MList";
                    var newMapModule = { isAssociation: 'yes' };
                    newMapModule.name = mapName;
                    newMapModule.fields = {};
                    newMapModule.fields["id"] = { type: 'Long' };
                    newMapModule.fields["name"] = { type: 'String' };
                    newMapModule.fields[module.name + "Id"] = { type: 'Long' };
                    newMapModule.fields[module.name + "Name"] = { type: 'String' };
                    newMapModule.fields[fieldDef.refer.module + "Id"] = { type: 'Long' };
                    newMapModule.fields[fieldDef.refer.module + "Name"] = { type: 'String' };

                    this.modules[mapName] = newMapModule;
                    this.projectSetting.enables.push(mapName);
                    this.adjustFields(newMapModule);
                }
                if (fieldDef.refer.associationField == 'yes') {
                    module.properties.isChildModule = true;
                    module.properties.parentModule = fieldDef.refer.module;
                    module.properties.parentMapField = field;
                    var referModule = this.modules[fieldDef.refer.module];
                    referModule.fields["v" + module.name] = { type: 'Long', dName: module.remark, show: 'list', refer: { module: module.name, map: "OneToMany", mapField: field } };
                }
            }
        }

    }

    buildParams(module) {
        var params = Object.assign({}, module.properties);
        //params.moduleDefine = module.fields;
        return params;
    }
}
module.exports = ModuleDefines;

