<?php

   include 'connect.php';
   $ids=isset($_GET['ids'])? $_GET['ids']:'';
   $ids=json_decode($ids);
   $ids=explode(',',$ids);
   // $a=array('s','d','f','g');  
    $num = count($ids); 
    $a=array();
 
    for($i=0;$i<$num;$i++){  
  
         $sql="select * from list where id='$ids[$i]'";
          //获取查询结果集;
        $result=$conn->query($sql);
        //使用查询结果集;
        $row=$result->fetch_all(MYSQLI_ASSOC);
        //释放查询结果集;
        $result->close();
        array_push($a,$row);
        }  
        echo json_encode($a,JSON_UNESCAPED_UNICODE);
?>