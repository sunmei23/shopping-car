//jquery入口函数
$(function () {
    $('#fullpage').fullpage({
        /*配置参数*/
        sectionsColor: ["#fadd67", "#84a2d4", "#ef674d", "#ffeedd", "#d04759", "#84d9ed", "#8ac060"],
        navigation: true,
        navigationColor: '#fff',
        verticalCentered: false,
        scrollingSpeed: 1000,
        afterRender: function () {
            /*console.log(this);*/
            /*this没有api方法*/
            /*jquery插件初始的时候封装这个方法*/
            /*1.回想jquery插件的封装 $.fn.fullpage = function(){} */
            /*2.jquery本身没有的方法通过$.fn的方式追加方法  认为是插件方法*/
            /*3.例如：$.fn.src = function(){ return this.attr('src') } this 你选择谁this（jquery对象）执行谁 */
            /*点击更多切换下一页*/
            $('.more').on('click',function () {
                $.fn.fullpage.moveSectionDown();
            });
            var transitionEvent = whichTransitionEvent();
            var animationEvent = whichAnimationsEvent();
            /*当第四屏的购物车动画结束之后执行收货地址的动画*/
            $('.screen04 .cart').on(animationEvent,function () {
                 $('.screen04 .address').show().children('img:last-child').fadeTo(1000,1);
                $('.screen04 .text').addClass('show');
            });
            //第七屏功能
            var i = 0;
            $('.screen07 .start li').on(transitionEvent,function () {
                i++;
                if (i == 5) {
                    $('.screen07.now .text').animateCss('bounceOut',function () {
                        $('.screen07.now .text').css('opacity',1);
                        i = 0;
                    })
                }
            });
            /*第八屏功能*/
            var windowWidth = $(window).width();
            var windowHei = $(window).height();
            var contentWidth = $('.screen08 .content').width();
            var contentHeight = $('.screen08 .content').height();
            /*1.手要跟着鼠标移动*/
            $('.screen08').on('mousemove',function (e) {
                /*鼠标的坐标设置给手*/
                $(this).find('.hand').css({
                    left:e.clientX - (windowWidth-contentWidth)/2,
                    top:e.clientY -(windowHei - contentHeight) +15
                });
            }).find('.again').on('click',function () {
                $('.now,.leave,.show').removeClass('now').removeClass('leave').removeClass('show');
                /*2.4 加css属性  后果：加一个style属性*/
                /*2.5 用jquery方法  show() fadeIn() 后果：加一个style属性*/
                $('.content [style]').removeAttr('style');
                /*跳回第一页*/
                $.fn.fullpage.moveTo(1);
            });
        },
        afterLoad: function (link,index) {
            $('.section').eq(index-1).addClass('now');
            if (index == 7){
                $('.screen07.now .start').children('li').each(function (index,item){
                    // $(this).delay(index*1000*0.5).fadeIn();
                    $(this).css('transition-delay',index*0.5 +'s');
                });
            }
        },
        onLeave: function (index,nextindex,direction) {
            if (index==2 && nextindex==3 && direction == 'down') {
                console.log(2);
                $('.screen02 .sofa').addClass('leave');
            }else if (index==3 && nextindex==4 && direction == 'down') {
                console.log(3);
                $('.screen03 .sofa').addClass('leave');
            } else if (index == 5 && nextindex == 6 && direction == 'down'){
                console.log(5);
                $('.screen05 .sofa').addClass('leave');
            }
        }
    });
    function whichAnimationsEvent(){
        var t,
            el = document.createElement('div'),
            animations = {
                'animation':'animationend',
                'OAnimation':'oAnimationEnd',
                'MozAnimation':'animationend',
                'WebkitAnimation':'webkitAnimationEnd'
            }

        for(t in animations){
            if( el.style[t] !== undefined ){
                return animations[t];
            }
        }
    }
    function whichTransitionEvent(){
        var t,
            el = document.createElement('div'),
            transitions = {
                'transition':'transitionend',
                'OTransition':'oTransitionEnd',
                'MozTransition':'transitionend',
                'WebkitTransition':'webkitTransitionEnd'
            }

        for(t in transitions){
            if( el.style[t] !== undefined ){
                return transitions[t];
            }
        }
    }
    $.fn.extend({
        animateCss: function(animationName, callback) {
            var animationEnd = whichAnimationsEvent();
            this.addClass('animated ' + animationName).one(animationEnd, function() {
                $(this).removeClass('animated ' + animationName);
                if (typeof callback === 'function') callback();
            });
            return this;
        },
    });
});