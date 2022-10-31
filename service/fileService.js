
var fs = require("fs");
var path = require("path");
let co = require('co');//异步控制器
const {imgPath,webUrl} = require('../config/config.default.js');


let findImagesFile = async (ctx,next) =>{
    let {pageNum,pageSize} = ctx.query

    var filesList = [];
    //查找文件，递归
    var items = findFiles(imgPath,filesList)
    let res = await co(function* (){
    if(items ==null){
            ctx.throw({success: false,code: 400, message: "配置文件不存在"})
        }
    let pages =  Math.ceil(items.length/pageSize)
    let records = new Array()    
    for(let i=(pageNum-1)*pageSize;i< pageNum*pageSize;i++){
        records.push(items[i])
        if(items[i+1]==null){
            break
        }
    }
    var result = {
        data: {
            current: pageNum,
            records: items,
            total: items.length,
            pages: pages,
            size: pageSize
        },
        code: 200,      
        success: true,
    }
    return result
    })
    ctx.body = res
}

// 返回  {fileName: '', filePath: '', url: '' }
//通用文件查找方法，


let findFiles=(filepath,filesList = [])=>{
    let fileNames = fs.readdirSync(filepath)
        fileNames.forEach(element => {
            var fullpath = path.join(filepath,element);
		    var stats = fs.statSync(fullpath)
            if(stats.isDirectory()){
               findFiles(fullpath,filesList)
            }else{
                filesList.push({fileName: element,filePath: fullpath,url: `${webUrl}${fullpath}`})
            }
        });
        return filesList;
    }


module.exports = {findImagesFile}