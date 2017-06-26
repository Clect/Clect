let fs = require('fs');
let logger = require('./logger').getLogger(module);


function Util() {}

/**
 * @constructor
 */
Util.prototype.JsonError = function(msg) {
	this.msg = msg;
}

/**
 * @constructor
 */
Util.prototype.JsonOk = function(data) {
	this.data = data;
}

/**
 * @constructor
 */
Util.prototype.TmplError = function(msg) {
	this.msg = msg;
}

/**
 * @constructor
 */
Util.prototype.TmplResult = function(name, data) {
	this.name = name;
	this.data = data;
}

Util.prototype.JsonOk = function(data) {
	this.data = data;
}

Util.prototype.TmplNone = function() {}





Util.prototype.generateSecondMenu = function(fileName) {
	const url = './public/doc/' + fileName + '.md';
    let content = fs.readFileSync(url, 'utf-8');
    let SecondMenu = content.match(/^\s*(#{2})\s+(\S+)/gm);
	SecondMenu = SecondMenu.map(function(x){
		let ret = x.match(/[\u4e00-\u9fa5]/g)||[];
		return ret.join('');
	})
	return SecondMenu;
}

module.exports = new Util();