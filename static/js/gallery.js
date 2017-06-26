function gallery(photo){
    var imgBox = $([
        `<div class="mask">`,
            `<img src="${photo.src}" />`,
        `</div>`,
    ].join('\n'));
    
    imgBox.appendTo($('body'));
    $('.mask img').click(function(){
        $('.mask').hide();
    })
}