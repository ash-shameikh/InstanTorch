<?php
// Get the language parameter from the URL, default to 'en' if not set
$lang = isset($_GET['lang']) ? $_GET['lang'] : 'en';

// Determine the correct file name based on the language
if ($lang === 'ar') {
    $contentFile = 'home-1-ar.html'; // Arabic file
} else {
    $contentFile = 'index.html'; // English file
}

// Check if the content file exists
if (file_exists($contentFile)) {
    // Include the corresponding content file
    include($contentFile);
} else {
    // If file doesn't exist, fallback to the English page
    include('content/index.html');
}
?>
