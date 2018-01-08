require(['config'],function(){
   require(['jquery'],function(){
         var res;
         // console.log(3323);
         $('.footer').load('../html/footer.html');
        $('.floating-btn').click(function(){
           var username=$('.username').val().trim();
        var password=$('#password').val().trim();
        // console.log(username);
            $.ajax({type:'get',
                    url:'../api/enter.php',
                    data:{
                      username:username,
                      password:password
                    },
                    success:function(data){
               
                 console.log(data.trim());
                 
               if(data.trim()=='fail'){
               alert('用户名或密码错误!');
           }else{  
                   sessionStorage.setItem("username", username);
                    // console.log(data);
                       console.log(username);
                       alert('恭喜登录成功!');
                       location.href="../index.html?username="+username;
                    }

        }});
            
           

        });
        
  
   
            
           

        });
       
        
})