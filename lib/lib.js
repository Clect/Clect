let printf = require('printf');
let MongoClient = require('mongodb').MongoClient;

let mongo = require('mongodb'),
    Server = mongo.Server,
    Db = mongo.Db;
let server = new Server('123.56.134.122', 27017, { auto_reconnect: true });
let db = new Db('info', server);

function Lib() {

}
Lib.prototype.selectDB = function*(dbName, collectionName) {
    let dbUrl = 'mongodb://123.56.134.122:27017/' + dbName;
    let p = MongoClient.connect(dbUrl);

    return yield p.then(function(db){
        return db.collection(collectionName).find({}).sort({'time':-1}).toArray();
    })
    .then(function(data){
        return data;
    });
    //console.log(p)
};

Lib.prototype.isnertDB = function*(data, dbName, collectionName){
    let dbUrl = 'mongodb://123.56.134.122:27017/' + dbName;
    let p = MongoClient.connect(dbUrl);

    return yield p.then(function(db){

        return db.collection(collectionName).insertOne({
            'time':new Date(),
            'data':data,
        })
    })
    .then(function(err,result){
        if(err){
            //console.log(err);
        }
        console.log('insert success');
        return 1;
    });
}

Lib.prototype.updateDB = function*(res,data, dbName, collectionName){
    let dbUrl = 'mongodb://123.56.134.122:27017/' + dbName;
    let p = MongoClient.connect(dbUrl);
    console.log(res,data);
    return yield p.then(function(db){
        return db.collection(collectionName).updateMany(res,{$set:data})
    })
    .then(function(err,result){
        if(err){
            //console.log(err);
        }
        console.log('update success');
        return 1;
    });
}




Lib.prototype.formAtTime = function (d) {
    if (!d) d = new Date();
    if (!(d instanceof Date)) d = new Date(d);
    return printf('%04d-%02d-%02d %02d:%02d:%02d',
        d.getFullYear(), d.getMonth() + 1, d.getDate(),
        d.getHours(), d.getMinutes(), d.getSeconds()
    );
}

Lib.prototype.sleepAsync = function *(sec) {
	yield new Promise(function(accept, reject) {
		setTimeout(accept, sec * 1000);
	})
};


module.exports = new Lib();