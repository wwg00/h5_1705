  (function($){
    $(function(){
            console.log(333);
          $('.header').load('html/header.html');
         $('.carousel').lxCarousel({imgs:['img/g1.jpg','img/g2.jpg','img/g3.jpg','img/g4.jpg'],width:1920,height:400,type:'fade',buttons:true});
         $('.footer').load('html/footer.html');

         
    });

    
 //写入数据;
        $(function(){

                    $.ajax({type:'get',url:'../api/data/list.json',success:function(data){
                        console.log($('.carlist>li'));

                        $('.carlist>li').each(function(i){
                           var img=data[i].imgurl;
                             $(this).html('<a href="html/detail.html"><img src="'+img+'"  alt="" class="listicon"/><img src="img/g6.jpg" alt="" class="proImg"/></a><div class="proinfo"><h3><a href="" class="tit"> BEATUY SHINE 两件装 自然堂</a><a href="" class="red">清爽去污</a></h3><p>包邮</p><div class="price">$45</div><a  class="buy buybtn">加入购物车</a></div>')
                        });

                        //飞入购物车;要写在ajax回调之后;
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

            /*------------------------------------*/ 
                    }
                });
        });
         $(function(){

           
                

        });
                    
    
})(jQuery);