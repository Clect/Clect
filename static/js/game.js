var i = 0;
var id = 0;
var offset = 500;
var moveTime = 3000;
var health = 10;
$(function(){
    $('.begin').click(function(){
        var that = $(this);
        that.hide();
        gameBegin();
    });
});

$('.sword').click(function(){
    $('.monsterA:eq(0)').remove();
});
$('.wands').click(function(){
    $('.monsterB:eq(0)').remove();
});
$('.shield').click(function(){
    $('.monsterC:eq(0)').remove();
});

function gameBegin(){
    window.ttt = setInterval('createMonster()', offset);
    window.tttt = setInterval('judge()', 100);
}

function createMonster(){
    var to = $('.container');
    var monsterA = '<div class="monsterA monster" id="monster_' + id + '"></div>';
    var monsterB = '<div class="monsterB monster" id="monster_' + id + '"></div>';
    var monsterC = '<div class="monsterC monster" id="monster_' + id + '"></div>';
    var monster = '';
    monster = i == 0 ? monsterA : monster;
    monster = i == 1 ? monsterB : monster;
    monster = i == 2 ? monsterC : monster;
    i += 1;
    if(i > 2){
        i = 0;
    }
    to.append(monster)
    $('#monster_' + id).animate({
        left: '15px',
        top: '15px',
    }, moveTime, 'linear');
    id+=1;
}

function judge(){
    var monster = $('.monster');
    for(var i = 0;i < monster.length;i++){
        var m = $(monster[i]);
        var mPosition = $(monster[i]).position();
        if(health >= 0 && mPosition.top == 15 && mPosition.left == 15){
            var pHealth = '<p>生命减少1，还剩' + health + '</p>';
            $('.log').prepend(pHealth);
            health -= 1;
            m.remove();
            if(health == 0){
                alert('game over');
                clearInterval(window.ttt);
                clearInterval(window.tttt);
                $('.monster').remove();
            }
        }
    }
}

/*
, function(){
        var that = this;
        that.remove();
        health -= 1;
        if(health >= 0){
            var pHealth = '<p>生命减少1，还剩' + health + '</p>';
            $('.log').prepend(pHealth);
            if(health == 0){
                alert('game over');
                clearInterval(window.ttt);
                $('.monster').remove();
            }
        }
    }
*/