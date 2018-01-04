;(function($){
   $(function(){
      $('.header').load('../html/header.html',function(){
          $('.goodimg').gdsZoom({position:'right',gap:30});
            $('.gds-zoom-big').css({top:170}); 

      });
      $('.footer').load('../html/footer.html');

       
      
       
   })
})(jQuery);