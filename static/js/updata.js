$(".upbtn").click(function(){

    var xhr = new XMLHttpRequest();
    var file = document.getElementById('updateFileInput').files[0];
    var fd = new FormData();
    var uri = './api/test_api';
    fd.append("file",file);

    xhr.open('POST', uri, true);

    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
            var ret = JSON.parse(xhr.responseText);
        }
    }.bind(this);
    
    //fd.append('target', target);
   // fd.append('file', file);

    xhr.send(fd);
})


$(".A").click(function(){
    console.log("Btn A");
    $.ajax('./api/test_api')
    .done(function(x){
        console.log(x.data.content);
    })
})

$(".B").click(function(){
    console.log("Btn B");
    $.ajax('./api/test_api2')
    .done(function(x){
        console.log(x.data.content);
    })
})