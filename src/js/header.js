require(['config'],function(){
      require(['jquery'],function(){
             var value = sessionStorage.getItem('username');
                  console.log(value);
              if(value){
                 $('.tonavleft1').html(`<span>您好,${value}</span><a class="tuichu">退出</a>`);
                 }
               // window.remove()
             $('.tuichu').click(function(){
                // console.log(333);
                   window.sessionStorage.removeItem('username');
                   location.href="../index.html";
             });
      })
})