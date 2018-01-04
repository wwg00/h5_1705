;(function($){
    $(function(){
        // console.log(555);
        var res;
        $.get({url:'../api/data/username.json',success:function(data){
            res=data;
        }});
         $('.footer').load('../html/footer.html');
        $('.floating-btn').click(function(){
            var i=false;
            console.log(res);
            res.forEach(function(item){
                  if(item.name==$('.username').val()){
                     i=true;
                      if(item.password==$('#password').val()){
                          location.href='../index.html';
                      }else{
                        alert('密码错误');
                      }
                  }
            })
            if(!i){
                       alert('用户名错误');
                    }

        });
        

         
    })
})(jQuery);