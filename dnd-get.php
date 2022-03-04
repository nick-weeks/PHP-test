<?php
$servername = "localhost";
$username = "root";
$password = "test";
$db = "test";
$conn = new mysqli($servername, $username, $password, $db);
// Check connection
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

if(isset($_POST['Function'])) {
    apiLoad();
} else {
    load();
}

function load(){

$link = 'https://api.open5e.com';
$json = file_get_contents($link);
echo $json;


}

function apiLoad(){
$link = $_POST['option'];
$json = file_get_contents($link);
echo $json;

}
$conn->close();
?>