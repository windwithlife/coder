

module.exports  =
{
    name: "xmodule",
    channel:"模块",
    fields: {
        id: {type: 'Long', dName: "编号"},
        name: {type: 'String', dName: "名称",show:'yes'},
        description: {type: 'String', dName: "说明",show:'yes'},
        myproject: {type: 'Long', dName: "所属项目", show:'select', refer: {module:'project',map:"ManyToOne",mapField:"yes"}},
        mytables: {type: 'Long', dName: "所用表", show:'list', refer: {module:'table',map:"ManyToMany",mapTable:"table_xmodule"}},
        isenable: {type: 'int', dName: "是否使用",show:'select',refer:{module:'dictionary',map:"ManyToOne",category:"enablestatus"}}
    }
}