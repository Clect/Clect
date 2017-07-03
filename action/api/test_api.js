
module.exports = function*(){
    console.log(this.xfields);
    return new this.U.JsonOk({
        'content':"this is A",
    });
}