<?php
$pdo = new PDO(
    "mysql:host=localhost;dbname=kea_beer", "root", "");
$pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
$poi = $pdo->query("SELECT beer_id, header, label, style FROM beers ORDER BY beer_id DESC");
?>
<!doctype html>
...
    <body>
...          
          <?php
          
        while($bee = $poi->fetchObject()){
          
            echo "<div class='col-md-4'>
              <h2>$bee->header</h2>
              <img src='beerlabels/$bee->label' class='img-responsive'>
              <p><a href='style.php?style=$bee->style'>$bee->style</a></p>
              <p><a href='beer.php?beer_id=$bee->beer_id'>View details &raquo;</a></p>
            </div>";
        }
        ?>
        ...
    </body>
</html>


$va1

$va2

$va3

