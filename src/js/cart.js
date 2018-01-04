;(function($){
    $(function(){

        $('.footer').load('../html/footer.html');
        $('.header').load('../html/header.html');

        //加减按钮
             var count; 

         //读取cookie;
         var val=JSON.parse(cookie.get('good'));
         console.log(val);
         val.forEach(function(item){

              setbox(item);
         });
         remove();
           
       function setbox(item){

           var $box=$('<div/>');
           $box.addClass('box');
            // var box=document.createElement('div');
        var $total=$('.total');
         // var total=document.getElementsByClassName('total')[0];
       $box.html(`<img src="${item.img}" ><div><h4>${item.name}</h4><p>ID:${item.id}</p><P>Size:Default</P></div><p class="btngroup"><button    id="btn1" class="button"><strong>+</strong></button><button id="btn2"  class="button"><strong>0</strong></button><button id="btn3" class="button" >-</button>  </p><h2 class="price"><p>$45</p></h2><h2 class="tprice"><p>$45</p></h2><h2 class="remove">&times;</h2>`)
       // console.log(box);
        // var carlist=document.getElementById('carlist');
        var $carlist=$('#carlist');
        // carlist.appendChild(box);
        // carlist.insertBefore(box,total);
        $box.insertBefore($total);
             count=item.qty;

         }
              
             //加减按钮操作;
            var adult=document.getElementById("btn1");  
            var adcount=document.getElementById("btn2");  
            var adco=document.getElementById("btn3");  
  
             var tprice=document.getElementsByClassName('tprice')[0];
             var p1=tprice.children[0];
             var p2=tprice.children[1];
             

               adcount.innerHTML=count;
                adult.onclick=function(){  
                     console.log(333);
                count++;  
                adcount.innerHTML=count;  
                // date.qty=count;
                 // p1.innerHTML=date.qty*date.price+'py6.';
                // p2.innerHTML='You save' +date.qty*date.save+'py6.';
                // Cookie.set('gdDate',JSON.stringify(date));
                  adco.onclick=function(){  
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
        // var remove=document.getElementsByClassName('remove')[0];
        
       
       //删除;
       function remove(){
          var $remove=$('.remove');
        $remove.click(function(){
            console.log(3);
            // console.log();
            $(this).parent().remove();
           

        }) 
       }
       
        
    })
})(jQuery);