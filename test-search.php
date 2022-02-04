
<?php
$servername = "localhost";
$username = "root";
$password = "test";
$db = "test";
$showName = $_POST["name"];
//$link = 'https://www.episodate.com/api/show-details?q='.$showName;
$link = 'https://www.episodate.com/api/search?q='.$showName.'&page=1';
$conn = new mysqli($servername, $username, $password, $db);
// Check connection
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}
$json = file_get_contents($link);
$obj = json_decode($json,true);
echo $json;
$conn->close();
?>


