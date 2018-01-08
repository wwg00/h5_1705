 

 require(['config'],function(){
      require(['jquery','common','header'],function($){
            $('.footer').load('../html/footer.html');
        $('.header').load('../html/header.html');

        //加减按钮
             var count; 

         //读取cookie;
         // var val=JSON.parse(cookie.get('good'));
         var val=[];
          var str=[];
           var vall=[];
          var count=[];
         // var val=JSON.parse(cookie.get(sessionStorage.getItem('username')+'carlist'));
         $.get({url:'../api/cart.php?username='+sessionStorage.getItem('username'),success:function(data){
             data=JSON.parse(data);
             // console.log(data[0].cartlist);
             var cartarray=data[0].cartlist.split(',');
             // console.log(cartarray);
             var ids=JSON.stringify(data[0].cartlist);
             // console.log(ids);
             $.get({url:'../api/cartlist.php?ids='+ids,success:function(data){
                    data=JSON.parse(data);
                    
                    data.forEach(function(item){
                          val.push(item[0]);

                    })
                    val=val.slice(1); 
                    // console.log(data);
                   
                    var i;
                   
                    val.forEach(function(item,idx){
                      // console.log(item.id);
                      
                         i=str.indexOf(item.id);
                          console.log(i);
                        if(i>=0){
                            count[i]++;
                            vall[i].qty++;
                            // val.splice(idx,1); 
                        }else{
                           str.push(item.id);
                           vall[str.length-1]=val[idx];
                           vall[str.length-1].qty=1;
                          
                           count[str.length-1]=1;
                        }

                    });
                       console.log(vall);
                        readcart(vall);
                        sum();
                    // console.log(str);
             }})
         }})
         function readcart(vall){
         

           vall.forEach(function(item){

                setbox(item);
           });
           remove();
         }
           
       function setbox(item){
          
           var $box=$('<div/>');
           $box.addClass('box');
           $box.attr('id',item.id);
            // var box=document.createElement('div');
        var $total=$('.total');
         // var total=document.getElementsByClassName('total')[0];
      
       $box.html(`<img src="../${item.img}" ><div><h4>${item.name}</h4><p>ID:${item.id}</p><P>Size:Default</P></div><p class="btngroup"><button    class="btn1 button" ><strong>+</strong></button><button class="btn2 button" ><strong>${item.qty}</strong></button><button class="btn3 button"  >-</button>  </p><h2 class="price"><p>${item.price}</p></h2><h2 class="tprice"><p>${(item.price*item.qty).toFixed(2)}</p></h2><h2 class="remove">&times;</h2>`)
       // console.log(box);
        // var carlist=document.getElementById('carlist');
        var $carlist=$('#carlist');
        // carlist.appendChild(box);
        // carlist.insertBefore(box,total);
        $box.insertBefore($total);
             count=item.qty;
             qtybtn(item);

         }

            //加减按钮操作;
            function qtybtn(item){

             
            var id=document.getElementById(item.id);  
               var adult=id.getElementsByClassName("btn1")[0];
            var adcount=id.getElementsByClassName("btn2")[0];

            var adco=id.getElementsByClassName("btn3")[0];  
  
             var tprice=id.getElementsByClassName('tprice')[0];
             var p1=tprice.children[0];
             // var p2=tprice.children[1];
             

               adcount.innerHTML=count;
                adult.onclick=function(){  
                     // console.log(333);
                count++;  
                adcount.innerHTML=count;  
                // date.qty=count;
                 p1.innerHTML=(count*item.price).toFixed(2);
                // p2.innerHTML='You save' +date.qty*date.save+'py6.';
                // Cookie.set('gdDate',JSON.stringify(date));
                // 修改cookie;
               var id=adult.parentNode.parentNode.getAttribute('id');
               qty(item,id);
                sum();
                }
                  adco.onclick=function(){ 
                    // console.log(55); 
                if(count>0){
                
                   count--;  
                adcount.innerHTML=count; 
                //   date.qty=count;
                 p1.innerHTML=(count*item.price).toFixed(2);
                // p2.innerHTML='You save' +date.qty*date.save+'py6.';
                //   Cookie.set('gdDate',JSON.stringify(date));
            }else{  
                adcount.innerHTML=0;  
            } 
            var id=adult.parentNode.parentNode.getAttribute('id');
               qty(item,id);
               sum();
       }  
                 
     
            }
          
        // var remove=document.getElementsByClassName('remove')[0];
        
       
       //删除;
       function remove(){
          var $remove=$('.remove');
        $remove.click(function(){
            // console.log(3);
            // console.log();
            $(this).parent().remove();
            var id=$(this).parent().attr('id');

            vall.forEach(function(item,idx){
                if(item.id==id){
                    vall.splice(idx,1);
                }
            });
            // cookie.remove('good');
            var now =new Date();
            now.setDate(now.getDate()+7)
            cookie.set('good',JSON.stringify(val),now,'/');
           sum();
           /*---------------------------------------------*/
               console.log(type(str));
                i=str.indexOf(id)

                console.log(str);
                str.splice(i,1);
                cartlistid=str.join(',');
               $.get({url:'../api/save.php?username='+sessionStorage.getItem('username')+'&cartlist='+cartlistid,success:function(data){
                                       
                                    }});

           /*----------------------------------------------*/


        }) 
       }
       
        //点击数量按钮修改cookie的good: qty;
        function qty(item,id){
            // console.log(333);
            vall.forEach(function(item,idx){
                if(item.id==id){
                     val[idx].qty=count;
                }
            });
            // cookie.remove('good');
            var now =new Date();
            now.setDate(now.getDate()+7)
            cookie.set('good',JSON.stringify(val),now,'/');

            /*---------------------------------------------*/
               
                
                
                str.push(id);
                cartlistid=str.join(',');
               $.get({url:'../api/save.php?username='+sessionStorage.getItem('username')+'&cartlist='+cartlistid,success:function(data){
                                       // data=JSON.parse(data);
                                          console.log(data); 
                                    }});

           /*----------------------------------------------*/

            
        }

        //商品总价;
        var $cartotal=$('#cartotal');
        sum();
        function sum(){
            var total=0;

           vall.forEach(function(item){
                total+=item.qty*item.price;
                 
               
           });
            total=total.toFixed(2);
           $cartotal.html(total);
           // var now =new Date();
           //  now.setDate(now.getDate()+7)
           //  cookie.set('sum',total,now,'/');
        }
      });
 })