

module.exports  =
{
    name: "pxtable",
    channel:"项目表定义",
    fields: {
        id: {type: 'Long', dName: "编号"},
        name: {type: 'String', dName: "名称",show:'yes'},
        description: {type: 'String', dName: "说明",show:'yes'},
        tcolumn: {type: 'Long', dName: "表字段", show:'list', refer: {module:"pxtablecolumn",map:"OneToMany",mapField:"tableId"}},
        defineText: {type: 'String', dName: "表结构定义",show:'text'},
        status: {type: 'int', dName: "是否使用",show:'select',refer:{module:'dictionary',map:"ManyToOne",category:"data_status"}}
    }
}