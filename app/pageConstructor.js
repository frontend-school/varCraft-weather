var fs = require('fs');

function construct(template, tiles) {
    template = fs.readFileSync(template, 'utf8');

    var content = template;
    for (var placeholder in tiles) {
        if (tiles.hasOwnProperty(placeholder)) {
            var tile = fs.readFileSync(tiles[placeholder]);
            content = content.replace(placeholder, tile);
        }
    }
    return content;
}

exports.construct = construct;