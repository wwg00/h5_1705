<?php

    include 'connect.php';
    $username=isset($_GET['username'])? $_GET['username']:'';
    $cartlist=isset($_GET['cartlist'])? $_GET['cartlist']:'';
    $sql = "select username from cart where username='$username'";
    $result=$conn->query($sql);
     if($result->num_rows>0){
        $sql = "update cart set cartlist='$cartlist' where username='$username'";
        $result=$conn->query($sql);
         $row=$result->fetch_all(MYSQLI_ASSOC);
        //释放查询结果集;
            $result->close();
        echo json_encode($row,JSON_UNESCAPED_UNICODE);
     }else{
        echo 'fail';
     }
     $result->close();
     $conn->close();
?>