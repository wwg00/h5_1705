  (function($){
    $(function(){
            console.log(333);
          $('.header').load('html/header.html');
         $('.carousel').lxCarousel({imgs:['img/g1.jpg','img/g2.jpg','img/g3.jpg','img/g4.jpg'],width:1920,height:400,type:'fade',buttons:true});
         $('.footer').load('html/footer.html');

         
    });

    //飞入购物车;
//     $(function() { 

//     var offset = $(".cart").offset();
//      console.log(offset);

//     $(".buy").click(function(event){ 
         
//         var addcar = $(this); 
//         var img = addcar.parents('li').find('.proImg').attr('src');
        
//         var flyer = $('<img class="u-flyer" src="'+img+'">');  
//         flyer.fly({ 
//             start: { 
//                 left: event.pageX, //开始位置（必填）#fly元素会被设置成position: fixed 
//                 top: event.pageY //开始位置（必填） 
//             }, 
//             end: { 
//                 left: offset.left+10, //结束位置（必填） 
//                 top: offset.top+10, //结束位置（必填） 
//                 width: 0, //结束时宽度 
//                 height: 0 //结束时高度 
//             }, 
//             onEnd: function(){ //结束回调 
//                 $("#msg").show().animate({width: '250px'}, 200).fadeOut(1000); //提示信息 
//                 addcar.css("cursor","default").removeClass('orange').unbind('click'); 
//                 this.destory(); //移除dom 
//             } 
//         }); 
//     }); 
// }); 
    

     $(function(){
            var cartLeft = $('.cart').offset().left;  // 获取a标签距离屏幕顶端的距离(因为fly插件的start开始位置是根据屏幕可视区域x，y来计算的，而不是根据整个文档的x，y来计算的)
            var cartTop = $('.cart').offset().top- $(document).scrollTop(); // 获取a标签的y坐标

　　　　　　 
            
            $(".buybtn").click(function(event){ 
                 var btnLeft = $(this).offset().left ; 
　　　　　　  var btnTop = $(this).offset().top- $(document).scrollTop();
                var addcar = $(this); 
                var img = addcar.parents('li').find('.proImg').attr('src'); 
                var flyer = $('<img class="u-flyer" src="'+img+'">'); 
                flyer.fly({ 
                    start: { 
                        left: btnLeft, 
                        top: btnTop 
                    }, 
                    end: { 
                        left: cartLeft, //结束位置（必填） 
                        top: cartTop, //结束位置（必填） 
                        width: 0, //结束时宽度 
                        height: 0 //结束时高度 
                    }, 
                    onEnd: function(){ //结束回调 
                        console.log('加入成功！');
                        this.destory(); //移除dom 
                    } 
                }); 
            }); 
        })
})(jQuery);