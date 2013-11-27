jQuery.noConflict();
jQuery(document).ready(function ($) {
    var windowWidth = $(window).width();
    var windowHeight = $(window).height();
    var roadSpeed = 2;
    var startRoad = -9200;
    var x = 600;
    var x_click;





    var canvas = document.getElementById("canvas");

    // init
    var ctx = canvas.getContext('2d');

    canvas.height = windowHeight;
    canvas.width = windowWidth;

    ctx.fillRect(x, windowHeight -200, 81, 200);


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






    function changeRoad(){
     $('#canvas').css('backgroundPosition','0' +startRoad+'px');
        startRoad = startRoad + roadSpeed;
    }
    (function animationLoop(){
        changeRoad();
        requestAnimationFrame(animationLoop, '#canvas');
    })();


    $('#wrapper').click(function(e){
        var i = 220;
        function rocket(){
            // remove rocket
            if(i == 600){
                ctx.clearRect(e.clientX + 38, windowHeight -i, 4, 20);
                return false
            }

            ctx.clearRect(e.clientX + 38, windowHeight -i, 4, 20);
            i+=5;
            ctx.fillRect(e.clientX + 38, windowHeight -i, 4, 20);
        }
        (function animationLoop(){
            rocket();
            requestAnimationFrame(animationLoop, '#canvas');
        })();
    });

});
