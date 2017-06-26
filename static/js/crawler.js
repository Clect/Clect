let lib_path = '../../lib/';

let co = require('co');
let request = require('co-request');
let fs = require('fs');
let lib = require(lib_path + 'lib.js');

let curCookieJar = request.jar();
co(function *() {
	try {
		yield main();
		process.exit(0);
	} catch(err) {
		console.error(err.message, err.stack);
		process.exit(1);
	}
});

function *main()
{
	while(true) {
		try {
			let toContinue = yield realMain();
			if(toContinue) {//暂时先跳出了
				break;
			}
			yield lib.sleepAsync(5);
		} catch(err) {
			yield lib.sleepAsync(5);
			console.log(err);
		}
	}
}
function *realMain(){
    console.log('crawler work!');
    let url = 'http://huaban.com/boards/24116838/?md=newbn&beauty=&iup62nnm&max=661665817&limit=800&wfl=1';
    let url_Referer = 'http://huaban.com/boards/24116838/?md=newbn&beauty';

    let content = yield loadPage(url,url_Referer);
	content = JSON.parse(content);
	let PicArray = content.board.pins;
	//let DBdata = yield lib.selectDB('huaban','pic');
	//let isn = noRepeat(PicArray,DBdata[0].data);//数组去重，重组
    let pp = yield lib.isnertDB(isn,'info','info');
    return true;
}

function *loadPage(url, url2)
{
//	console.log(curCookieJar);
	while(true) {
		//yield delay();
		var headers = {};

		headers.Referer = url2;
		headers['X-Requested-With'] = "XMLHttpRequest";
		headers['X-Request']="JSON";

		var resp = yield request({
			'url': url,
			'jar': curCookieJar,
			'headers': headers
		});
		/*
		fs.writeFile("console.txt",JSON.stringify(resp), function(err) {
			if(err) {
				return console.log(err);
			}
		});
		console.log("The file was saved!");
		*/
		var body = resp.body;
		//console.log(resp);
		return body;
	}
}
function *delay()
{
	console.log('delay 5 second');
	yield lib.sleepAsync(5);
}
function noRepeat(Array_A,Array_B){
	console.log(Array_A.length,Array_B.length);
	let ret = Array_A;
	for(let i = 0;i < Array_A.length;i++){
		for(let j = 0;j < Array_B.length;j++){
			if(Array_A[i].file.key != Array_B[j].file.key){
				console.log(Array_B[j].file.key)
			}
		}
	}
	return ret;
}