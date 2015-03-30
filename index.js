var fs = require('fs');

/**
 * 
 * @param {String} input input file path
 * @param {String} output out put file path
 * 
 * @returns {undefined}
 */
var parser = function (input, output) {

    if (arguments.length === 0) {
        throw new Error('Input file not specified.');
    }

    if (!fs.existsSync(input)) {
        throw new Error('Input file does not exist.');
    }

    var raw_html = fs.readFileSync(input);

    // @todo performance concern
    var result = raw_html.toString().match(/src="data:image\/png;base64,([^"]*)"/);
    if (!result || !result[1]) {
        throw new Error('Invalid format in input file.');
    }

    var dataString = result[1];

    var buffered = new Buffer(dataString, 'base64');

    if (output === undefined) {
        throw new Error("Output not specified");
    } else if ('string' === typeof output) {
        fs.writeFileSync(output, buffered);
    } else {
        throw new Error('Output not supported');
    }
};

module.exports = parser;