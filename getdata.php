<?php
include './databaseconnection/dbconfig.php';
$according = $_POST['according'];
$keyword = $_POST['keyword'];

if (strcmp($according, "doi") == 0 || strcmp($according, "title") == 0 || strcmp($according, "publisher") == 0 || strcmp($according, "status") == 0) {
    $query = "select * from paper where $according like '$keyword%'";
} elseif (strcmp($according, "a_name") == 0) {
    $keyword = explode(",", $keyword);
    $name = "";
    $doi = "";
    for ($i = 0; $i < count($keyword); $i++) {
        $name = $keyword[$i];
        $query = "SELECT * FROM author  where A_NAME LIKE '$name%'";
        $result = mysqli_query($link, $query);
        $row = mysqli_fetch_row($result);
        $doi = $doi . $row[0] . ",";
    }
    $doi = rtrim($doi, ",");
    $doi = explode(',', $doi);
    $query = "select * from ";
    for ($i = 0; $i < count($doi); $i++) {
        $query = $query . "written_by w" . $i . ", ";
    }
    $query = rtrim($query, ", ");
    $query = $query . " where ";
    for ($i = 0; $i < (count($doi) - 1); $i++) {
        $query = $query . "w" . $i . ".doi = " . "w" . ($i + 1) . ".doi and ";
    }

    for ($i = 0; $i < count($doi); $i++) {
        $query = $query . "w" . $i . ".author_id = " . $doi[$i] . " and ";
    }
    $query = rtrim($query, " and ");
} else {
    $keyword = explode(",", $keyword);
    $name = "";
    $doi = "";
    for ($i = 0; $i < count($keyword); $i++) {
        $name = $keyword[$i];
        $query = "SELECT * FROM keyword  where Keyword LIKE '$name%'";
        $result = mysqli_query($link, $query);
        while($row = mysqli_fetch_row($result)){
            $doi = $doi . $row[0] . ",";
        }
    }
    $doi = rtrim($doi, ",");
    $doi = explode(',', $doi);
    $query = "select * from ";
    for ($i = 0; $i < count($doi); $i++) {
        $query = $query . "categorized_as c" . $i . ", ";
    }
    $query = rtrim($query, ", ");
    $query = $query . " where ";
    for ($i = 0; $i < (count($doi) - 1); $i++) {
        $query = $query . "c" . $i . ".doi = " . "c" . ($i + 1) . ".doi and ";
    }

    for ($i = 0; $i < count($doi); $i++) {
        $query = $query . "c" . $i . ".category_id = " . $doi[$i] . " and ";
    }
    $query = rtrim($query, " and ");
}



$result = mysqli_query($link, $query);
$string = "";
while ($row = mysqli_fetch_row($result)) {
    $author = "";
    $category = "";

    $row1 = mysqli_query($link, "select a.a_name from author a, written_by w where w.DOI = \"" . $row[0] . "\" and w.AUTHOR_ID=a.AUTHOR_ID");
    while ($row2 = mysqli_fetch_row($row1)) {
        $author = $author . $row2[0] . ", ";
    }

    $row1 = mysqli_query($link, "select c.category from category c, categorized_as ca where ca.DOI = \"" . $row[0] . "\" and ca.CATEGORY_ID=c.CATEGORY_ID");
    while ($row2 = mysqli_fetch_row($row1)) {
        $category = $category . $row2[0] . ", ";
    }
    $author = rtrim($author, ", ");
    $category = rtrim($category, ", ");

    $row1 = mysqli_query($link, "select * from paper where doi = '" . $row[0] . "'");
    $row2 = mysqli_fetch_row($row1);

    $string = $string . $row2[0] . ":;" . $row2[1] . ":;" . $row2[2] . ":;" . $row2[3] . ":;" . $row2[4] . ":;" . $author . ":;" . $category . "HARSH";
}

echo $string;
?>
