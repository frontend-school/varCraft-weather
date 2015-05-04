var fs = require('fs'),
    appFolder='../dist/';

function constructPage(page){
    var currentTemplate = fs.readFileSync(page.index,'utf-8');
    for(var item in page){
        if((page.hasOwnProperty(item)) && (item != 'index') && (typeof page[item] != 'object')){
            var content = (fs.existsSync(page[item]) && fs.readFileSync(page[item],'utf-8')) || page[item];
            currentTemplate = currentTemplate.replace(item, content);
        }
        if((page.hasOwnProperty(item)) && (typeof page[item] == 'object')){
            var result = constructPage(page[item]);
            currentTemplate = currentTemplate.replace(item, result);
        }
    }
    return currentTemplate;
}

exports.constructPage = constructPage;