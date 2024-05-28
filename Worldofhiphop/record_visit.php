<?php
include 'config.php';

// Attempt to create the table
$tableName = 'visit_dates';
$createTableQuery = "CREATE TABLE IF NOT EXISTS $tableName (
                      id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
                      visit_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                    )";
if ($mysqli->query($createTableQuery) === TRUE) {
    echo "Table '$tableName' created or already exists.<br>";
} else {
    echo "Error creating table: " . $mysqli->error . "<br>";
}

// Insert visit date into the database
$insertQuery = "INSERT INTO $tableName (visit_date) VALUES (CURRENT_TIMESTAMP)";
if ($mysqli->query($insertQuery) === TRUE) {
    echo "Visit date recorded successfully";
} else {
    echo "Error: " . $insertQuery . "<br>" . $mysqli->error;
}
?>
