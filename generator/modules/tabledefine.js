

module.exports  =
{
    name: "tabledefine",
    channel:"表定义",
    fields: {
        id: {type: 'Long', dName: "编号"},
        name: {type: 'String', dName: "名称",show:'yes'},
        description: {type: 'String', dName: "表说明",show:'yes'},
        tcolumn: {type: 'Long', dName: "表字段", show:'list', refer: {module:"tablecolumn",map:"OneToMany",mapField:"mytable"}},
        isenable: {type: 'int', dName: "是否使用",show:'select',refer:{module:'dictionary',map:"ManyToOne",category:"tablestatus"}}
    }
}