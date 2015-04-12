var fs = require('fs');

//var a = (__dirname + '\\index.html').toString();
//var b = (__dirname + '\\block\\b-login-form\\b-login-form.html').toString();
//var content;
//construct(a, b);

function construct(wrapper, tile) {
    tile = fs.readFileSync(tile, 'utf8');
    wrapper = fs.readFileSync(wrapper, 'utf8');

    var content = wrapper.replace('@content', tile);
    return content;
};

exports.construct = construct;