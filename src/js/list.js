 (function($){
    $(function(){
            // console.log(333);
          $('.header').load('../html/header.html');
         $('.footer').load('../html/footer.html');

         
    

       
 //写入数据;
        
                    var goodlist;
                    var totalqty;
                function listdata(){


                    $.ajax({type:'get',url:'../api/list.php?qty=10&pageNo='+pageNo,success:function(totaldata){
                        // console.log(8888);
                        var totaldata=JSON.parse(totaldata);
                        var data=totaldata.data;
                          goodlist=data;
                          totalqty=totaldata.total;
                        $('.carlist>li').each(function(i){
                             $(this).attr('id',data[i].id);
                             //deenter用于点击事件detail入口;
                             $(this).html('<a class="deenter"><img src="../'+data[i].imgurl+'"  alt="" class="listicon"/><img src="../'+data[i].img+'" alt="" class="proImg"/></a><div class="proinfo"><h3><a href="" class="tit"> '+data[i].name+'</a><a href="" class="red">清爽去污</a></h3><p>包邮</p><div class="price">$'+data[i].price+'</div><a  class="buy buybtn">加入购物车</a></div>')
                        });

                        //飞入购物车;要写在ajax回调之后;
                        var cartLeft = $('.cart').offset().left;  // 获取a标签距离屏幕顶端的距离(因为fly插件的start开始位置是根据屏幕可视区域x，y来计算的，而不是根据整个文档的x，y来计算的)
            var cartTop = $('.cart').offset().top- $(document).scrollTop(); // 获取a标签的y坐标

　　　　　　 
            
            $(".buybtn").click(function(event){ 

                //找到当前商品id;
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


                        /*-------------------------------------------------*/
                          
            //                  //获取购物车信息;
            //   var data;
            //   $.get({url:`../api/cart.php?username=${sessionStorage.getItem('username')}`,success:function(cartdata){
            //         data=JSON.parse(cartdata);
            //         console.log(sessionStorage.getItem('username'));
            //      if(data[0].username){

            //         var now=new Date();
            //         now.setDate(now.getDate()+7)
            //         cookie.set(sessionStorage.getItem('username')+'carlist',data[0].cartlist,now,'/');

            //      }
            //             val=JSON.parse(val);
            //                     var idsum=[];
            //                      console.log(val);

            //                     val.forEach(function(item){
            //                         for(var i=0;i<item.qty;i++){

            //                              idsum.unshift(item.id);
            //                         }
            //                     })

            //                         data[0].cartlist+=','+idsum.join(',');
            //                         var now=new Date();
            //                         now.setDate(now.getDate()+7);
            //                         cookie.set(sessionStorage.getItem('username')+'carlist',data[0].cartlist,now,'/');
            //                         $.get({url:'../api/save.php?username='+sessionStorage.getItem('username')+'&cartlist='+data[0].cartlist,success:function(data){
            //                               // console.log(data); 
            //                         }});


            // }})
                        /*--------------------------------------------*/
                        //写在回调函数中;点击购买后去数据库cart表获取当前用户购物车商品信息,在重新用接口写入数据库;
                 $.get({url:`../api/cart.php?username=${sessionStorage.getItem('username')}`,success:function(cartdata){
                          data=JSON.parse(cartdata);
                         data[0].cartlist+=','+id;
                         $.get({url:'../api/save.php?username='+sessionStorage.getItem('username')+'&cartlist='+data[0].cartlist,success:function(data){
                                       // data=JSON.parse(data);
                                          console.log(data); 
                                    }});

                 }});             
                // str.push(id);
                // cartlistid=str.join(',');
               
                       /*---------------------------------------------*/
                    } 
                }); 
            });

            /*------------------------------------*/ 

             $('.carlist').on('click','li .deenter',function(){
                   location.href="../html/detail.html?id="+$(this).parents('li').attr('id');
              });

                 //获取全部页数;
                 $('.page').html('');
                 for(var i=0;i<Math.ceil(totalqty/totaldata.qty);i++){
                     $('<span/>').html(i+1).appendTo('.page');
                     
                 }
                   $('.page').children().eq(pageNo-1).css('background','blue').siblings().css('background','#58bc58');
                  
                    }


                });
           }

            var pageNo=1;
            listdata();
           //分页显示;
              
              
               $('.page').on('click','span',function(){
                   pageNo=$(this).html();
                   listdata();
                   // $(this).css('background','blue');
                   // $(this).siblings().css('background','#58bc58');
                   // $('.page').children().eq(0).css('background','blue');
               })

        });                
    
})(jQuery);