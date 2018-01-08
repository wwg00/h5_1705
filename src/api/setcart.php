<?php

    include 'connect.php';
    $username=isset($_GET['username'])? $_GET['username']:'';
    $sql = "insert into cart (username) values('$username')";
     //获取查询结果集;
    $result=$conn->query($sql);
     if ($result) {
            echo "ok";
        } else {
            echo "Error: " . $sql . "<br>" . $conn->error;
            
        } 

 ?>
