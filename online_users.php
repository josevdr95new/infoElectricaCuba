<?php
session_start();

$filename = 'online_users_count.txt';

function get_user_count() {
    global $filename;
    if (!file_exists($filename)) {
        file_put_contents($filename, '0');
    }
    return (int)file_get_contents($filename);
}

function set_user_count($count) {
    global $filename;
    file_put_contents($filename, (string)$count);
}

if (!isset($_SESSION['user_online'])) {
    $_SESSION['user_online'] = true;
    $current_count = get_user_count();
    set_user_count($current_count + 1);
}

if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    if (isset($_SESSION['user_online'])) {
        $current_count = get_user_count();
        set_user_count(max(0, $current_count - 1));
        unset($_SESSION['user_online']);
    }
    http_response_code(200);
    exit;
}

echo json_encode(['count' => get_user_count()]);
?>