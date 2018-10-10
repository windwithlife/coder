

module.exports  =
{
    name: "tablecolumn",
    channel:"表字段定义",
    fields: {
        id: {type: 'Long', dName: "编号"},
        name: {type: 'String', dName: "列名称",show:'yes'},
        description: {type: 'String', dName: "表说明",show:'yes'},
        mytable: {type: 'Long', dName: "所属表", show:'select', refer: {module:'tabledefine',map:"ManyToOne",mapField:"yes"}},
        fieldtype: {type: 'int', dName: "表字段类型", show:'select', refer: {module:'dictionary',map:"ManyToOne",category:"field_type"}},
        show: {type: 'int', dName: "界面显示方式", show:'select', refer: {module:'dictionary',map:"ManyToOne",category:"show_type"}},
        refer: {type: 'String', dName: "关联表", show:'yes'},
        map: {type: 'int', dName: "关联关系", show:'select', refer: {module:'dictionary',map:"ManyToOne",category:"map_relation"}},
        mapField: {type: 'String', dName: "关联字段", show:'yes'}
    }
}