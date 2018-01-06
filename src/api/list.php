<?php

    include 'connect.php';

    /*
        * 获取前端参数
        * 拼接sql语句
        * 格式化数据
     */
    
    $pageNo=isset($_GET['pageNo'])?$_GET['pageNo'] : 1;
    $qty=isset($_GET['qty']) ? $_GET['qty'] : 10;
    $cate=isset($_GET['cate'])?$_GET['cate'] :'';

    $sql='select * from list';

     if($cate){
        $sql .=" where category=$cate";
     }
      $sql .=' limit '. $qty*($pageNo-1) .' , ' . $qty;

    //获取查询结果集;
    $result=$conn->query($sql);
    //使用查询结果集;
    $row=$result->fetch_all(MYSQLI_ASSOC);
    //释放查询结果集;
    $result->close();

    $res = array(
        'pageNo'=>$pageNo,
        'qty'=>$qty,
        'total'=>$conn->query('select count(*) from list')->fetch_row()[0],
        'data'=>$row,
    );
    echo json_encode($res,JSON_UNESCAPED_UNICODE);

    //关闭连接;
    $conn->close();
?>