'use strict';

module.exports = function(content, file, conf){
    var reg2 = /(#\*[\s\S]*?(?:\*#|$)|##[^\n\r\f]*)|(?:#(parse|widget)\s*\(\s*('|")(.*?)\3)/ig;

    content = content.replace(reg2, function(m, comment, directive, quote, url) {
        if (url) {
            var info = fis.project.lookup(url, file);
            file.addRequire(info.id);
            if (info.file && info.file.isFile()) {
                file.addLink(info.file.subpath);
            }
        } 

        return m;
    });

	return content;
};
