
    //#container .column
var waterFall = (function() {
    //初始化布局
    var arrHeight = []; //列的高度
    var columns = function() { //计算页面最多可以放多少列
            var bodyW = $('#container')[0].clientWidth,
                pinW = $(".column")[0].offsetWidth;
            return Math.floor(bodyW / pinW);
        }
        //设置瀑布流居中
    var getHtml = function() {
            var cols = $('.column'), //获得已有的列数
                arrHtml = [];
            for (var i = 0, col; col = cols[i++];) {
                var htmls = col.innerHTML.match(/<img(?:.|\n|\r|\s)*?p>/gi); //获取一个columns的
                arrHtml = arrHtml.concat(htmls);
            }
            return arrHtml;
        }
        //获得数组中最低的高度
    var getMinIndex = function() { //获得最小高度的index
        var minHeight = Math.min.apply(null, arrHeight); //获得最小高度
        for (var i in arrHeight) {
            if (arrHeight[i] === minHeight) {
                return i;
            }
        }
    }
    var createCol = function() {
            var cols = columns(), //获得列数
                contain = $("#container")[0];
            contain.innerHTML = ''; //清空数据
            for (var i = 0; i < cols; i++) {
                var span = document.createElement("span");
                span.className = "column";
                contain.appendChild(span);
            }
        }
        //初始化列的高度
    var initHeight = function() {
            var cols = columns(),
            	arr = [];
            for (var i = 0; i < cols; i++) {
            	arr.push(0);
            }
            arrHeight = arr;
        }
     //创建一个ele并且添加到最小位置
    var createArticle = function(html){
    	var cols = $('.column'),
    		index = getMinIndex(),
    		ele = document.createElement('article');
    	ele.className = "panel";;
    	ele.innerHTML = html;
    	cols[index].appendChild(ele);
    	arrHeight[index] += ele.clientHeight;
    }
    //遍历获得的html然后添加到页面中
    var reloadImg = function(htmls) {
        for (var i = 0, html, index; html = htmls[i++];) {
            createArticle(html);
        }

    }
    var onload = function() {
            var contain = $("#container")[0], //获得容器
                arrHtml = getHtml(); //获得现有的所有瀑布流块
            //创建列，然后进行加载
            createCol();
            //初始化arrHeight
            initHeight();
            //进行页面的重绘
            reloadImg(arrHtml);
            return this;
        }
        //设置滑动加载
    var isLoad=function() { //是否可以进行加载
        var scrollTop = document.documentElement.scrollTop || document.body.scrollTop,
            wholeHeight = document.documentElement.clientHeight || document.body.clientHeight,
            point = scrollTop + wholeHeight; //页面底部距离header的距离
        var lastHei = Math.min.apply(null,arrHeight);
        return (lastHei < point) ? true : false;
    }

    var dealScroll = (function(){
    	window.onscroll = ()=>{dealScroll();}
    	var container = $('#container')[0];
    	return function(){
    		if(isLoad()){
    			for(var i = 0,html,data;data = dataInt[i++]; ){
    				html = tpl.temp(data.src); //获得数据然后添加模板
    				//createArticle(html);//不想无线循环
    			}
    		}
    		return this;
    	}
    })();

    var tpl = {
        temp(src) {
            return `
            <img src="http://cued.xunlei.com/demos/publ/img/P_00${src}" alt=""/>
                <p>titile</p>
            </article>
            `;
        }
    }
    var resize = (function(){
        window.onresize = ()=>{resize();};
        var flag;
        return function(){
            clearTimeout(flag);
            flag = setTimeout(()=>{onload();},500);
            return this;
        }
    })();

    var dataInt = [{
        'src': '1.jpg'
    }, {
        'src': '2.jpg'
    }, {
        'src': '3.jpg'
    }, {
        'src': '4.jpg'
    }];


    return {
        onload,
        dealScroll,
        resize
    }
})();

window.onload = function() {
    waterFall.onload();
}
