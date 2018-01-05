 (function($){
    $(function(){
            console.log(333);
          $('.header').load('../html/header.html');
         $('.footer').load('../html/footer.html');

         
    });

    
 //写入数据;
        $(function(){
                    var goodlist;
                    $.ajax({type:'get',url:'../api/data/list.json',success:function(data){
                        console.log($('.carlist>li'));
                          goodlist=data;
                        $('.carlist>li').each(function(i){
                             $(this).attr('id',data[i].id);
                             //deenter用于点击事件detail入口;
                             $(this).html('<a class="deenter"><img src="../'+data[i].imgurl+'"  alt="" class="listicon"/><img src="../'+data[i].img+'" alt="" class="proImg"/></a><div class="proinfo"><h3><a href="" class="tit"> '+data[i].name+'</a><a href="" class="red">清爽去污</a></h3><p>包邮</p><div class="price">$'+data[i].price+'</div><a  class="buy buybtn">加入购物车</a></div>')
                        });

                        //飞入购物车;要写在ajax回调之后;
                        var cartLeft = $('.cart').offset().left;  // 获取a标签距离屏幕顶端的距离(因为fly插件的start开始位置是根据屏幕可视区域x，y来计算的，而不是根据整个文档的x，y来计算的)
            var cartTop = $('.cart').offset().top- $(document).scrollTop(); // 获取a标签的y坐标

　　　　　　 
            
            $(".buybtn").click(function(event){ 

                //找到id;
                var good;
                var id=$(this).parents('li').attr('id');
                 goodlist.forEach(function(item){
                      if(item.id==id){
                         good=item;
                      }
                 })
                /*----------------------------*/
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

                         if(cookie.get('good')!=''){

                            var val=JSON.parse(cookie.get('good'));
                            var res=false;
                            for(var i=0;i<val.length;i++){
                                if(val[i].id==id){
                                    val[i].qty+=1;
                                    // val[i].price=price;
                                    // val[i].name=name;
                                    // val[i].img=img;
                                   res=true;
                                    break;
                                }
                             
                            }
                            if(!res){
                              val.unshift({id:id,qty:1,price:good.price,img:good.img,name:good.name});

                            }
   
                           val=JSON.stringify(val);
                        }else{
                            var val=JSON.stringify([{id:id,qty:1,price:good.price,img:good.img,name:good.name}]);
                        }
                        
                         var now= new Date();
                        
                         now.setDate(now.getDate()+7);

                         // console.log(now);
                        cookie.set('good',val,now,'/');
                    } 
                }); 
            });

            /*------------------------------------*/ 

             $('.carlist').on('click','li .deenter',function(){
                   location.href="../html/detail.html?id="+$(this).parents('li').attr('id');
              });
                    }
                });



        });

                    
    
})(jQuery);