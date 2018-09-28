

module.exports  =
{
    name: "xcolumn",
    channel:"表字段定义",
    fields: {
        id: {type: 'Long', dName: "编号"},
        name: {type: 'String', dName: "名称",show:'yes'},
        description: {type: 'String', dName: "表说明",show:'yes'},
        mytable: {type: 'Long', dName: "表", show:'yes', refer: {module:'xdefine',map:"ManyToOne",mapField:"yes"}},

        fieldtype: {type: 'String', dName: "表字段类型", show:'select', refer: {module:'dictionary',map:"ManyToOne",category:"fieldtype"}},
        isenable: {type: 'int', dName: "是否使用",show:'select',refer:{module:'dictionary',map:"ManyToOne",category:"tablestatus"}}
    }
}