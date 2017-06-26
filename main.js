'use strict';
let koa = require('koa');
let koaBody = require('koa-body');
let staticCache = require('koa-static-cache');
let gzip = require('koa-gzip');
let path = require('path');
let ejs = require('ejs');
let fs = require('fs');
let convert = require('koa-convert');
let objectAssign = require('object-assign');
let logger = require('./lib/logger').getLogger(module);
let app = new koa();

app.use(convert(gzip()));

app.use(staticCache(path.join(__dirname, 'static'), {
		'gzip': true
}));
app.use(convert(koaBody({formidable:{uploadDir: '/tmp'}, multipart: true})));

app.use(convert(function*loggerAsync(next) {
	let now = new Date();

	try {
		yield next;
	} catch(err) {
		logger.error(err.message, err.stack);
	} finally {
		let delta = new Date() - now;
		delta = (delta / 1000).toFixed(2);
		let logObj = {
			'cost': delta,
			'req': {
				'method': this.method,
				'host': this.host,
				'path': this.path,
				'query': this.query,
				'search': this.search,
				'body': this.request.body,
				'agent': this.request.get('user-agent'),
				'accept-encoding': this.request.get('accept-encoding'),
				'ip': this.ip,
				'ips': this.ips,
				'x-real-ip': this.request.get('x-real-ip'),
				'sid': this.cookies.get('www_sid')||'',
				'user': this.xuser?this.xuser.user_id:'not_login',
				'referer': this.request.get('referer'),
			},
			'res': {
				'status': this.status,
				'length': this.length
			}
		};

		logger.info(JSON.stringify(logObj));
	}
}));

app.use(convert(function*initHelpersAsync(next) {
	this.U = require('./lib/util');
	this.xfields = objectAssign({}, this.request.body.fields || this.request.body);
	this.xfiles = objectAssign({}, this.request.body.files);
	
	yield next;
}));

app.use(convert(function*routeAsync(next){
    let path = this.path;
    if(/\.\./.test(path)) {
		path = '/';
	}
	if(!/^(\/[\/a-zA-Z\d\-\_\.]+)+$/.test(path)) {
		path = '/';
	}

    if(path == '/') path = '/self';
	let actionFn = './action' + path + '.js';
	if(!fs.existsSync(actionFn)) {
		yield next;
		return;
	}
	
    let ret = null;
	let data = null;
	let action = require(actionFn);
	ret = yield (action.bind(this))(next);

	if(ret instanceof this.U.JsonError) {
		data = {
			'success': false,
			'error': ret.msg
		}
	} else if(ret instanceof this.U.JsonOk) {
		data = {
			'success': true,
			'data': ret.data
		}
	} else if(ret instanceof this.U.TmplNone) {
		data = undefined;
	} else {
		if(ret instanceof this.U.TmplError) {
			ret = new this.U.TmplResult('error', {
				'msg': ret.msg
			});
		}

		if(ret instanceof this.U.TmplResult) {
			let fn = './templates/' + ret.name + '.ejs';
			fn = fn.toLocaleLowerCase();
			if(!fs.existsSync(fn)){
				this.throw(404);
				return;
			}
			// console.log(ret);
			data = ejs.render(
				fs.readFileSync(fn).toString(),
				{
					'compname':ret.name,
					'data':ret,
					'opt': {},
				},
				{
					'filename':fn
				});
		}
	}

	if(typeof(data) == 'object') {
		data = JSON.stringify(data, null, 2);
		this.set('Content-Type', 'application/json');
	}
	
	if(data !== undefined) {
		this.body = data;
	}
}));
app.listen(10000)
logger.info('Listen on port: 10000');
