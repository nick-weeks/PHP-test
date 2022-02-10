
<?php
$servername = "localhost";
$username = "root";
$password = "test";
$db = "test";
if(isset($_POST["action"])) {
$show = $_POST["action"];
}  else {
$show = "the-flash";
}
$link = 'https://www.episodate.com/api/show-details?q='.$show;
//$link = 'https://www.episodate.com/api/search?q='.$showName.'&page=1';
$conn = new mysqli($servername, $username, $password, $db);
// Check connection
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}
$json = file_get_contents($link);
$obj = json_decode($json,true);
$new = true;
$validSql = "SELECT `name` FROM `tvshows`";
$validResult = $conn->query($validSql);

while($row = mysqli_fetch_assoc($validResult)) {
    if($row['name'] == $obj['tvShow']['name']) {
        $new = false;
    }
}
if ($new == true) {
$id = $obj['tvShow']['id'];
$name = str_replace("'","",$obj['tvShow']['name']);
$link = $obj['tvShow']['permalink'];
$img = $obj['tvShow']['image_thumbnail_path'];
$status = $obj['tvShow']['status'];
if(is_null($obj['tvShow']['countdown'])) {
    $season = 0;
    $episode = 0;
    $episodeName = "N/A";
    $airDate = $obj['tvShow']["start_date"];
} else {
$season = $obj['tvShow']['countdown']['season'];
$episode = $obj['tvShow']['countdown']['episode'];
$episodeName = str_replace("'","",$obj['tvShow']['countdown']['name']);
$airDate = $obj['tvShow']['countdown']['air_date'];
}
$sql = "INSERT INTO `tvshows` (`id`, `name`, `permalink`, `thumbnail_path`, `status`, `Season`, `Episode`, `EpisodeName`, `EpisodeAirData`)
        VALUES ($id,'$name', '$link', '$img', '$status', $season, $episode, '$episodeName', '$airDate')";
  $result = $conn->query($sql);
    echo("Success");

} else { echo("show already in data base");}
$conn->close();
?>



