var parser = require('..');
var fs = require('fs');
var expect = require('chai').expect;

var OUTPUT_FILE = __dirname + '/artifacts/output.png';
var INPUT_FILE = __dirname + '/artifacts/in.violet.html';
var INVALID_FILE = __dirname + '/artifacts/not_a_valid.html';


/**
 * remove the output file if any
 */
function clean() {
    if (fs.existsSync(OUTPUT_FILE)) {
        fs.unlinkSync(OUTPUT_FILE);
    }
}

describe('The parser', function () {
    beforeEach(clean);
    afterEach(clean);

    it('should work as expected', function () {
        parser(INPUT_FILE, OUTPUT_FILE);
    });

    describe('depeding on arguments,', function () {
        it('shoud throw an exception when input file not specified', function () {
            expect(function () {
                parser();
            }).throws('not specified');
        });
        it('shoud throw an exception when input file does not exist', function () {
            expect(function () {
                parser('/tmp/j4h4yf83x/' + Date.now());
            }).throws('not exist');
        });
        it('shoud throw an exception when input file in wrong format', function () {
            expect(function () {
                parser(INVALID_FILE, OUTPUT_FILE);
            }).throws("format");
        });
        it('shoud throw an exception when output file not specified', function () {
            expect(function () {
                parser(INPUT_FILE);
            }).throws();
        });
        it('shoud throw an exception when output is not a string', function () {
            expect(function () {
                parser(INPUT_FILE, function () {

                });
            }).throws('not supported');
        });
    });
});