

module.exports  =
{
    name: "book",
    channel:"课本",
    fields: {
        id: {type: 'Long', dName: "编号"},
        name: {type: 'String', dName: "名称",show:'yes'},
        text: {type: 'String', dName: "题目描述",show:'yes'},
        level: {type: 'Long', dName: "适用读者级别", show:'list', refer: {module:"level",map:"OneToMany"}},
        sex: {type: 'int', dName: "性别",show:'select',refer:{module:'dictionary',map:"ManyToOne",category:"sex"}},
        pic: {type: 'String', dName: "图片",show:'image'}
    }
}