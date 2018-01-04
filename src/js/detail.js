;(function($){
   $(function(){
    //load后回调不一定加载完??先用延时器;
      $('.header').load('../html/header.html',function(){
        setTimeout(function(){
            $('.goodimg').gdsZoom({position:'right',gap:30});
            $('.gds-zoom-big').css({top:170});
        }, 50)
          
     
      });
      $('.footer').load('../html/footer.html');
      // $('.state').html(``)
      
      //根据id获取数据;
      var params=location.search;
      
      params=params.slice(1);
         
      var array=params.split('=');

      if(array[0]=='id'){
             var id=array[1];


      }
      $.ajax({type:'get',url:'../api/data/list.json',success:function(data){

           data.forEach(function(item){
               if(item.id==id){
                // console.log(item.id);
                   $('.goodimg').html(`<img src="../${item.img}" data-big="../${item.img}"  />`)
               }
           });
      }});
       



       //右边样式;
      $('.qty').html(`<span>数量:</span><p class="btngroup clearfix"> <button    id="btn1" class="button"><strong>+</strong></button><button id="btn2"  class="button"><strong>0</strong></button><button id="btn3" class="button" >-</button>  </p>`)
       //加减按钮
             
             var count=1;  
            var adult=document.getElementById("btn1");  
            var adcount=document.getElementById("btn2");  
            var adco=document.getElementById("btn3");  
  
             var tprice=document.getElementsByClassName('tprice')[0];
             // var p1=tprice.children[0];
             // var p2=tprice.children[1];
             

               adcount.innerHTML=count;
                adult.onclick=function(){  
                     // console.log(333);
                count++;  
                adcount.innerHTML=count;  
                // date.qty=count;
                 // p1.innerHTML=date.qty*date.price+'py6.';
                // p2.innerHTML='You save' +date.qty*date.save+'py6.';
                // Cookie.set('gdDate',JSON.stringify(date));
                  adco.onclick=function(){ 
                  // console.log(555); 
                if(count>0){  
                   count--;  
                adcount.innerHTML=count; 
                //   date.qty=count;
                //   p1.innerHTML=date.qty*date.price+'py6.';
                // p2.innerHTML='You save' +date.qty*date.save+'py6.';
                //   Cookie.set('gdDate',JSON.stringify(date));
            }else{  
                adcount.innerHTML=0;  
            }  
       }  
                 
    } 
       
      $('.fix').load('../html/slip.html',function(){

         setTimeout(function(){
               //飞入购物车;要写在ajax回调之后;
                        var cartLeft = $('.cart').offset().left;  // 获取a标签距离屏幕顶端的距离(因为fly插件的start开始位置是根据屏幕可视区域x，y来计算的，而不是根据整个文档的x，y来计算的)
            var cartTop = $('.cart').offset().top- $(document).scrollTop(); // 获取a标签的y坐标
             console.log($('.cart').offset().left);
　　　　　　 
            
            $(".buybtn").click(function(event){ 
                
                 var btnLeft = $(this).offset().left ; 
　　　　　　  var btnTop = $(this).offset().top- $(document).scrollTop();
                var addcar = $(this); 
                var img = addcar.parents('.detailbox').find('.goodimg img').attr('src'); 
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

         }, 50)
       
      });

       
       
   })
})(jQuery);