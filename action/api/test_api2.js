
module.exports = function*(){

    for(var i = 0;i < 1000000;i++){
    }

    return new this.U.JsonOk({
        'content':"this is B",
    });
}