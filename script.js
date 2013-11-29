jQuery.noConflict();
jQuery(document).ready(function ($) {
    var windowWidth = $(window).width();
    var windowHeight = $(window).height();
    var roadSpeed = 2;
    var startRoad = -9200;
    var x = 600;
    var ctx;
    var canvas = document.getElementById("canvas");
    var startBugPosition = 0;


    // init
    function updateCanvas(){
        ctx = canvas.getContext('2d');
        changeAnimate();
    }
    (function animationLoop(){
        updateCanvas();
        requestAnimationFrame(animationLoop, '#canvas');
    })();

    canvas.height = windowHeight;
    canvas.width = windowWidth;

    //ctx.fillRect(x, windowHeight -200, 81, 200);

    $('#wrapper').mousemove(function(e){
        ctx.clearRect(x, windowHeight -200, 81, 200);
        x = e.clientX;
        ctx.fillRect(x, windowHeight -200, 81, 200);
    });

    // Если ничего нет - возвращаем обычный таймер
    window.requestAnimFrame = (function(){
        return  window.requestAnimationFrame       ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame    ||
            window.oRequestAnimationFrame      ||
            window.msRequestAnimationFrame     ||
            function(/* function */ callback, /* DOMElement */ element){
                window.setTimeout(callback, 1000 / 60);
            };
    })();

    // rand
    function rand (min, max){
        min = parseInt(min);
        max = parseInt(max);
        return Math.floor( Math.random() * (max - min + 1)) + min;
    }


    function changeAnimate(){
        // road
        $('#canvas').css('backgroundPosition','0' +startRoad+'px');
        startRoad = startRoad + roadSpeed;

        // move bag
        randBug();
    }



    // click
    $('#wrapper').click(function(e){
        var i = 220;
        function rocket(){
            // remove rocket
            if(i == windowHeight){
                ctx.clearRect(e.clientX + 38, windowHeight -i, 4, 20);
                return false
            }

            ctx.clearRect(e.clientX + 38, windowHeight -i, 4, 20);
            i+=10;
            ctx.fillRect(e.clientX + 38, windowHeight -i, 4, 20);
        }
        (function animationLoop(){
            rocket();
            requestAnimationFrame(animationLoop, '#canvas');
        })();
    });

    // create rand bag
    function randBug(){
        ctx.clearRect(500, startBugPosition, 50, 50);
        startBugPosition+=8;
        ctx.fillRect(500, startBugPosition, 50, 50);
    }

});
