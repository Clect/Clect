let co = require('co');
let lib = require('../lib/lib.js'); 


module.exports = function*(){
    console.log('have fun working');

    let ret = null;
    let DBdata = null;

    try{
        DBdata = yield lib.selectDB('huaban','pic');
    }catch(err){
        console.error(err);
    }
    //console.log(DBdata[0].data);
    ret = DBdata[0].data;
    for(let i = 0;i < ret.length;i++){
        ret[i] = 'http://img.hb.aicdn.com/' + ret[i].file.key;
    }
    console.log(ret.length);
    return new this.U.TmplResult('havefun',ret);
}