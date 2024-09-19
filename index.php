<?php
// Get the language parameter from the URL, default to 'en' if not set
$lang = isset($_GET['lang']) ? $_GET['lang'] : 'en';

// Determine the content file based on the language
$contentFile = 'content/index-' . $lang . '.html';

// Check if the content file exists
if (!file_exists($contentFile)) {
    $contentFile = 'content/index-en.html'; // Fallback to English if file not found
}

// Include the content file
include($contentFile);
?>
