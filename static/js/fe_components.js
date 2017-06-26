//首页幻灯片效果

var pptList = $('.putibabyPPT .pptInner .ppt');
var pptLength = pptList.length;
var bodyWidth = $('body').width();
var eleWidth = pptList.width();
var eleHeight = pptList.height();
const DELAY = 4000;
$('.putibabyPPT .pptInner').width(bodyWidth * (pptLength + 1));
$('.putibabyPPT .pptInner').height(eleHeight);
$('.putibabyPPT .pptBox').height(eleHeight);
$('.putibabyPPT .pptTop').height(eleHeight);
$('.putibabyPPT .bottom').width(bodyWidth);

var pptInterval = setInterval('my_slide(1)', DELAY);

var putibaby_ul = $('.putibabyPPT ul');
for(var i = 0;i < pptLength - 1;i++){
    putibaby_ul.append("<li data-li-id=" + i + "></li>")
}
$('.putibabyPPT ul li').click(function(){
    var that = $(this);
    var data_li_id = that.attr('data-li-id');
    my_slide(1, data_li_id);
});


var my_slide = (function(){
    var pptInner = $('.putibabyPPT .pptInner');
    var cur = 0;// 当前幻灯片ID
    var syncPPT = 1;// 同时展示的PPT数量
    $($('.putibabyPPT li')[cur]).addClass('active');
    return function(dir, p){
        clearInterval(pptInterval);
        pptInterval = setInterval('my_slide(1)', DELAY);
        if(dir == 0){ // 解决分辨率变化的问题, 重新获取ppt宽度
            eleWidth = $('.putibabyPPT .pptInner .ppt').width();
            return;
        }
        else if(cur == pptLength - syncPPT && dir > 0){// 最右页往右跳
            cur = 0;
            pptInner.css({ 'left': (-cur * eleWidth) + 'px' });
        }
        else if(cur == 0 && dir < 0){// 最左页往左跳
            cur = pptLength - syncPPT;
            pptInner.css({ 'left': (-cur * eleWidth) + 'px' });
        }
        p === undefined ? cur += +dir : cur = +p;// 如果指定位置存在，则跳到指定位置
        pptInner.animate({ 'left': (-cur * eleWidth) + 'px' }, 'normal', 'swing',
            function() { // 动画的回调函数
                if(cur == pptLength - syncPPT) {
                    cur = 0;
                }
                else if(cur == 0){
                    cur = pptLength - syncPPT;
                }
                pptInner.css({ 'left': (-cur * eleWidth) + 'px' });
                $('.putibabyPPT li').removeClass('active');
                $($('.putibabyPPT li')[cur == pptLength - syncPPT ? 0 : cur]).addClass('active');
            }
        );
    }
})();


// 处理分辨率变化的情况下的 ppt 样式问题
window.onresize = pptResize;

function pptResize() {
    bodyWidth = $('body').width();
    if(bodyWidth < 1200)return;
    eleWidth = $('.putibabyPPT .pptInner .ppt').width();
    eleHeight = $('.putibabyPPT .pptInner .ppt').height();
    $('.putibabyPPT .pptInner').width(bodyWidth * (pptLength + 1));
    $('.putibabyPPT .pptInner').height(eleHeight);
    $('.putibabyPPT .pptBox').height(eleHeight);
    $('.putibabyPPT .pptTop').height(eleHeight);
    $('.putibabyPPT .bottom').width(bodyWidth);
    my_slide(0);
}



// **********************************************
// *                                            *
// *                                            *
// *               neteasePPT                   *
// *                                            *
// *                                            *
// **********************************************
var N_pptList = $('.neteasePPT .pptInner .ppt');
var N_pptLength = N_pptList.length;
var N_eleWidth = $('.neteasePPT .pptInner .ppt').width();
$('.neteasePPT .pptInner').width(N_pptLength * N_eleWidth);

var putibaby_ul = $('.neteasePPT ul');
for(var i = 0;i < pptLength - 3;i++){
    putibaby_ul.append("<li></li>")
}
var my_Nslide = (function(){
    var x = $('.neteasePPT .pptInner');
    var xUnit = 400;
    var cur = 0;
    var N = pptLength;
    $($('.neteasePPT li')[cur]).addClass('active');
    $($('.neteasePPT .ppt .shade')[cur + 1]).hide();
    return function(dir){
        //解决拼接处平滑衔接的问题
        if(cur == N - 3 && dir > 0){
            cur = 0;
            x.css({
                'left': (-cur * xUnit) + 'px'
            });
        }
        else if(cur == 0 && dir < 0){
            cur = N-3;
            x.css({
                'left': (-cur * xUnit) + 'px'
            });
        }

        cur += dir;
        var xN = cur;
        x.animate({
            'left': (-cur * xUnit) + 'px'
        }, 'fast', 'swing',
        function() {
            if(cur == N - 3) {
                cur = 0;
            }
            else if(cur == 0){
                cur = N - 3;
            }
            x.css({
                'left': (-cur * xUnit) + 'px'
            });
            $('.neteasePPT li').removeClass('active');
            $($('.neteasePPT li')[cur]).addClass('active');
        });
        $('.neteasePPT .ppt .shade').show();
        $($('.neteasePPT .ppt .shade')[cur + 1 == N-2 ? 1 : cur+1]).hide();
        $('.neteasePPT .ppt').removeClass('active',"fast");
        $($('.neteasePPT .ppt')[cur + 1 == N-2 ? 1 : cur+1]).addClass('active',"fast");
    }
})();

// **********************************************
// *                                            *
// *                                            *
// *               dragable                     *
// *                                            *
// *                                            *
// **********************************************

var drag = createDraggableObject();

drag.init($('.dragable')[0]);

/** 
 * 创建可拖拽对象的工厂方法 
 */  
function createDraggableObject() {  
    return {  
        obj: null, left: 0, top: 0,  
        oldX: 0, oldY: 0, isMouseLeftButtonDown: false,  
        init: function (obj) {  
            this.obj = obj;  
            var that = this;  
            this.obj.onmousedown = function (args) {  
                var evt = args || event;  
                this.style.zIndex = 100;  
                that.isMouseLeftButtonDown = true;  
                that.oldX = evt.clientX;  
                that.oldY = evt.clientY;  
                if (this.currentStyle) {  
                    that.left = parseInt(this.currentStyle.left);  
                    that.top = parseInt(this.currentStyle.top);  
                }  
                else {  
                    var divStyle = document.defaultView.getComputedStyle(this, null);  
                    that.left = parseInt(divStyle.left);  
                    that.top = parseInt(divStyle.top);  
                }  
            };  
            this.obj.onmousemove = function (args) {  
                that.move(args || event);  
            };  
            this.obj.onmouseup = function () {  
                that.isMouseLeftButtonDown = false;  
                this.style.zIndex = 0;  
            };  
        },  
        move: function (evt) {  
            if (this.isMouseLeftButtonDown) {  
                var dx = parseInt(evt.clientX - this.oldX);  
                var dy = parseInt(evt.clientY - this.oldY);  
                this.obj.style.left = (this.left + dx) + 'px';  
                this.obj.style.top = (this.top + dy) + 'px';  
            }  
        }  
    };  
}  

// **********************************************
// *                                            *
// *                                            *
// *                   flat                     *
// *                                            *
// *                                            *
// **********************************************



// **********************************************
// *                                            *
// *                                            *
// *                 updateFile                 *
// *                                            *
// *                                            *
// **********************************************
/*
$(".upfilebtn").click(function(){
    var xhr = new XMLHttpRequest();
    //var file = document.getElementById('updateFileInput').files[0];
    var fd = new FormData();
    var uri = './api/test_post';
    //fd.append("file",file);

    xhr.open('POST', uri, true);

    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
            var ret = JSON.parse(xhr.responseText);
            console.log(ret);
        }
    }.bind(this);
    
    $.ajax({
        type: "POST",
        url: "./api/test_post",
        dataType : "json",
        processData: false,  // 注意：让jQuery不要处理数据
        contentType: false,  // 注意：让jQuery不要设置contentType
        data: fd
    }).success(function(msg) {
        console.log(msg);
    }).fail(function(msg) {
        console.log(msg);
    });
   
})
 */