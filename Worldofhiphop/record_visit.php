<?php
include 'config.php';

// Check if the table exists
$tableName = 'visit_dates';
$tableCheckQuery = "SHOW TABLES LIKE '$tableName'";
$tableCheckResult = $mysqli->query($tableCheckQuery);

if ($tableCheckResult->num_rows == 0) {
    // Table doesn't exist, create it
    $createTableQuery = "CREATE TABLE $tableName (
                          id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
                          visit_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                        )";
    if ($mysqli->query($createTableQuery) === TRUE) {
        echo "Table '$tableName' created successfully.<br>";
    } else {
        echo "Error creating table: " . $mysqli->error . "<br>";
    }
}

// Insert visit date into the database
$insertQuery = "INSERT INTO $tableName (visit_date) VALUES (CURRENT_TIMESTAMP)";
if ($mysqli->query($insertQuery) === TRUE) {
    echo "Visit date recorded successfully";
} else {
    echo "Error: " . $insertQuery . "<br>" . $mysqli->error;
}
?>
