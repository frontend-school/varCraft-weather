var fs = require('fs');

function construct(wrapper, tile) {
    tile = fs.readFileSync(tile, 'utf8');
    wrapper = fs.readFileSync(wrapper, 'utf8');

    var content = wrapper.replace('@content', tile);
    return content;
};

exports.construct = construct;