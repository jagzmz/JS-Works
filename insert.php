# Gets details from POST and inserts into DB

<?php
include './databaseconnection/dbconfig.php';
$doi=$_POST['doi'];
$title = $_POST['title'];
$publisher = $_POST['publisher'];
$pub_date = $_POST['pub_date'];
$authorName = $_POST['authorName'];
$authorId = $_POST['authorId'];
$categoryName = $_POST['categoryName'];
$categoryId = $_POST['categoryId'];
$status = $_POST['status'];




$authorName=split(",",$authorName);
$authorId=split(",",$authorId);
$categoryName=split(",",$categoryName);
$categoryId=split(",",$categoryId);

$query = "insert into paper values('$doi','$title','$publisher','$pub_date','$status')";
$result=mysqli_query($link, $query);


for ($x = 0; $x <count($authorName); $x++) {
    $query = "insert into author values(".$authorId[$x].",'".$authorName[$x]."')";
    $result=mysqli_query($link, $query);
}   

for ($x = 0; $x <count($categoryName); $x++) {
    $query = "insert into category values(".$categoryId[$x].",'".$categoryName[$x]."')";
    $result=mysqli_query($link, $query);
}  


for ($x = 0; $x <count($categoryName); $x++) {
    $cid=(int) $categoryId[$x];
    $query = "insert into categorized_as values('$doi',$cid)";
    $result=mysqli_query($link, $query);
    
}  

for ($x = 0; $x <count($authorName); $x++) {
    $aid=(int) $authorId[$x];
    $query = "insert into written_by values('$doi',$aid)";
    $result=mysqli_query($link, $query);
}  


if($result){
    echo "Success";
    }
    else{
        echo "Fail";
    }



?>
