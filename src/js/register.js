;(function($){

  $(function(){


    var result;
     var username;
     // var password;
    // $('.header').load('../html/header.html');
    $('.footer').load('../html/footer.html');
    var res=[false];
    $('#username').blur(function(){
        console.log(333);
        username=$('#username').val();
        var reg=/^[a-z][\da-z\-]{5,19}$/i;
        if(!reg.test(username)){
            $('#tip').html('&times;用户名格式不对');
            res[1]=false;
        }else{
             $.get({
          url: `../api/register.php?rest=false&username=${username}`,
          success: function(data){
               
               result=data;
               console.log(result);

               if(result=='fail'){
               
                    $('#tip').html('&times;名字已被使用');
                    console.log($('#tip').html());
                 res[1]=false;
                 }else{
                    res[1]=true;
                     $('#tip').html('');
                 }
              
                }
              });
              
 
          
        }
        // $('#username').focus(function(){
        //      $('#tip').html('');
        //      $('#username').val('');
        // })
    });
     $('#phone').blur(function(){
        // console.log(333);
        var $val=$('#phone').val();
        var reg=/^1[34578]\d{9}$/i;
        if(!reg.test($val)){
            $('#tip').html('&times;手机号不合法');
            res[2]=false;
        }else{
            res[2]=true;
            $('#tip').html('');
        }
        // $('#phone').focus(function(){
        //      $('#tip').html('');
        //      $('#phone').val('');
        // })
    });

     $('#password').blur(function(){

        var reg=/^\S{1,20}$/;
        var $val=$('#password').val();
        if(!reg.test($val)){
            $('#tip').html('&times;密码不合法');
            res[0]=false;
        }else{
            res[0]=true;
            $('#tip').html('');
        }
        // $('#password').focus(function(){
        //      $('#tip').html('');
        //      $('#password').val('');
        // });
     });
      $('#confirm_pwd').blur(function(){
      
        var $val=$('#confirm_pwd').val();
        if($val!=$('#password').val()){
            $('#tip').html('&times;两次密码输入不一致');
            res[3]=false;
        }else{
            res[3]=true;
            $('#tip').html('');
        }
        // $('#confirm_pwd').focus(function(){
        //      $('#tip').html('');
        //      $('#confirm_pwd').val('');
        // });
     });

      $('button').click(function(){
           var rest=true;
           for(var i=0;i<res.length;i++){
              if(!res[i]){
                 rest=false;
              }
           }
          
           if(rest){
                  console.log(res);
             $.get({
          url: '../api/register.php?'+'rest='+true+'&username='+username+'&password='+$('#password').val(),
          success: function(data){       
               result=data;
               // console.log(result);
               // 
               //注册购物车;
            $.get({url:'../api/setcart.php?'+'username='+username,success:function(data){
                 // console.log(data);
              location.href="../html/enter.html";
                 
            }});
               
                }
              });

             

            
           }
       
      });
        



  })
    

})(jQuery);
