;(function($){
    $(function(){
        $('.footer').load('../html/footer.html');
        $('.header').load('../html/header.html');
        var box=document.createElement('div');
         var total=document.getElementsByClassName('total')[0];
       box.innerHTML=`<img src="../img/g6.jpg" ><div><h4>Guii Dressages Original Tote Bag 223456 Coffe</h4><p>ID:#24234</p><P>Size:Default</P></div><p class="btngroup"> <button    id="btn1" class="button"><strong>+</strong></button><button id="btn2"  class="button"><strong>0</strong></button><button id="btn3" class="button" >-</button>  </p><h2 class="price"><p>$45</p></h2><h2 class="tprice"><p>$45</p></h2><h2 class="remove">&times;</h2>`
       console.log(box);
        var carlist=document.getElementById('carlist');
        // carlist.appendChild(box);
        carlist.insertBefore(box,total);

              //加减按钮
             
             var count=1;  
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
        var remove=document.getElementsByClassName('remove')[0];
        remove.onclick=function(){
            console.log(3);
            carlist.removeChild(box);
            // Cookie.remove('gdDate');

        } 
    })
})(jQuery);