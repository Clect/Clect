var request = require('sync-request');

module.exports = function*(){
    // https://bbs.cnuer.cn/
	var method = 'POST';
	var url = 'http://www.clect.cn/';
	var html = request(method, url).getBody().toString();
	return new this.U.JsonOk({
        'content':"sucess",
    });
}