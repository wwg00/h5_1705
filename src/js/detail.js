

require(['config'],function(){
  require(['jquery','fly','gdszoom','common','header'],function($){
    $('.footer').load('../html/footer.html');
      // $('.state').html(``)
      
      //根据id获取数据;
      var params=location.search;
      
      params=params.slice(1);
         
      var array=params.split('=');

      if(array[0]=='id'){
             var id=array[1];


      }
      var img='';
      var price='';
      var name='';
      $.ajax({type:'get',url:'../api/list.php',success:function(totaldata){
        var totaldata=JSON.parse(totaldata);
          var data=totaldata.data;
          $('.header').load('../html/header.html',function(){
            //ajax回调后再加载??
            $('.goodimg').gdsZoom({position:'right',gap:30});
            $('.gds-zoom-big').css({top:170});
       
          
     
      });
           data.forEach(function(item){
               if(item.id==id){
                // console.log(item.id);
                   $('.goodimg').html(`<img src="../${item.img}" data-big="../${item.img}"  />`);
                   $('.smallList').html(`<img src="../${item.img}" >
        <img src="../img/g7.jpg" alt="">
        <img src="../img/g8.jpg" alt="">
        <img src="../img/g9.jpg" alt="">
        <img src="../img/g10.jpg" alt="">`)
                   right(item);
                   qtybtn();
                   imgurl=item.img;
                   // console.log(img);
                   price=item.price;
                   name=item.name;

               }
           });
           

      }
  });
       


     function right(item){
        //右边样式;
      $('.state').html(`<p class="goodname">${item.name}</p>
                <p class="price"><span>价格:</span>${item.price}</p>
                <p class="qty"></p>
                <button class="buybtn"><a>加入购物车</a></button>`);
      $('.qty').html(`<span>数量:</span><p class="btngroup clearfix"> <button  id="btn1" class="button"><strong>+</strong></button><button id="btn2"  class="button"><strong>0</strong></button><button id="btn3" class="button" >-</button>  </p>`)
     }
       var count=1;
       function qtybtn(){
               //加减按钮
                 
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
                        // console.log([{id:id,qty:count}]);
                        // 
                        //点击购物车获取cookie;
                        if(cookie.get('good')!=''){

                            var val=JSON.parse(cookie.get('good'));
                            var res=false;
                            for(var i=0;i<val.length;i++){
                                if(val[i].id==id){
                                    val[i].qty+=count;
                                    // val[i].price=price;
                                    // val[i].name=name;
                                    // val[i].img=img;
                                   res=true;
                                    break;
                                }
                             
                            }
                            if(!res){
                              val.unshift({id:id,qty:count,price:price,img:imgurl,name:name});

                            }
   
                           val=JSON.stringify(val);
                        }else{
                            var val=JSON.stringify([{id:id,qty:count,price:price,img:imgurl,name:name}]);
                            // console.log(img);
                        }
                        
                         var now= new Date();
                         
                         now.setDate(now.getDate()+7);

                         console.log(img);
                        cookie.set('good',val,now,'/');

                        /*----------------------------------------------*/
                          
                          
                                              //获取购物车信息;
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



                        /*-----------------------------------------------*/


                         $.get({url:`../api/cart.php?username=${sessionStorage.getItem('username')}`,success:function(cartdata){
                          data=JSON.parse(cartdata);
                          for(var i=0;i<count;i++){

                            data[0].cartlist+=','+id;
                            
                         }
                         $.get({url:'../api/save.php?username='+sessionStorage.getItem('username')+'&cartlist='+data[0].cartlist,success:function(data){
                                       // data=JSON.parse(data);
                                          console.log(data); 
                                    }});

                 }});    
                        /*-----------------------------------------------*/
                    } 
                }); 
            });

         }, 50)

      });

       $('.smallList').on('mouseover','img',function(){
          // var $copy=$(this).clone();
          //  $('.goodimg').html($copy);
          //  $copy.attr('data-big',this.src);

           $('.goodimg img').attr({
          'src':this.src,
          'data-big':$(this).attr('data-big') || this.src
        });
       })
  })
})