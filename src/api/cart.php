<?php

   include 'connect.php';
   
    $username=isset($_GET['username'])? $_GET['username']:'';

   
     $sql = "select * from cart where username='$username'";
      $result = $conn->query($sql);

    $row=$result->fetch_all(MYSQLI_ASSOC);
     $result->close();
     // var_dump($row);
   echo json_encode($row,JSON_UNESCAPED_UNICODE);

   //关闭连接;
    $conn->close();

   
  
   
  
?>