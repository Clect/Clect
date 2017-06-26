let co = require('co');
let lib_path = '../../lib/';
let fs = require('fs');
let lib = require(lib_path + 'lib.js');

co(function *() {
	try {
		yield main();
	} catch(err) {
		console.error(err.message, err.stack);
	}
});
function*main(){
	let ss = yield Pro();
	console.log(ss);
}

function*Pro(){
	let p = new Promise(function(s,f){
		console.log('Promise');
		s();
	});

	return yield p.then(a => 2);
}