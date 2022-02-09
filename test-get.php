
<?php
$servername = "localhost";
$username = "root";
$password = "test";
$db = "test";
$array = array();
//$link = 'https://www.episodate.com/api/show-details?q=arrow';
//$link = 'https://www.episodate.com/api/search?q='.$showName.'&page=1';
$conn = new mysqli($servername, $username, $password, $db);
// Check connection
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}
//$json = file_get_contents($link);
//$obj = json_decode($json,true);
//echo $json;

$sql = "SELECT *  FROM `tvshows`";

//$sql = "INSERT INTO `tvshows` (`id`, `name`, `permalink`, `thumbnail_path`, `status`, `Season`, `Episode`, `EpisodeName`, `EpisodeAirData`)
       // VALUES ($id, '$name', '$link', '$img', '$status', $season, $episode, '$episodeName', '$airDate')";
//echo $sql;
  $result = $conn->query($sql);
while($row = mysqli_fetch_assoc($result)) {
    $array['tvShows'][]= $row;
}

echo json_encode($array);
$conn->close();
?>

