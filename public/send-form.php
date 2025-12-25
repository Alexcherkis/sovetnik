<?php
// send-form.php

// 1. CONFIGURATION (User fills this)
$BOT_TOKEN = "8500064360:AAEcfNab5xs7eo5iX5KRBDzttAPHBvvjueY"; // Sovetnik Bot
$CHAT_ID = "-5290829707";     // Sovetnik Group ID

// 2. HEADERS
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

// 3. LISTEN FOR POST REQUEST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(["status" => "error", "message" => "Method Not Allowed"]);
    exit;
}

// 4. GET DATA
$input = json_decode(file_get_contents("php://input"), true);
$name = $input['name'] ?? 'Не указано';
$phone = $input['phone'] ?? 'Не указано';
$message = $input['message'] ?? 'Нет сообщения';

// 5. FORMAT MESSAGE FOR TELEGRAM
$txt = "⚡️ <b>Новая заявка с сайта!</b>\n\n";
$txt .= "👤 <b>Имя:</b> " . strip_tags($name) . "\n";
$txt .= "📱 <b>Телефон:</b> " . strip_tags($phone) . "\n";
$txt .= "📝 <b>Сообщение:</b> " . strip_tags($message) . "\n";
$txt .= "🕒 <b>Время:</b> " . date('Y-m-d H:i:s');

// 6. SEND TO TELEGRAM API
$url = "https://api.telegram.org/bot" . $BOT_TOKEN . "/sendMessage";
$params = [
    'chat_id' => $CHAT_ID,
    'text' => $txt,
    'parse_mode' => 'html'
];

$ch = curl_init($url);
curl_setopt($ch, CURLOPT_POST, 1);
curl_setopt($ch, CURLOPT_POSTFIELDS, $params);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
$result = curl_exec($ch);
curl_close($ch);

// 7. RETURN RESPONSE
if ($result) {
    echo json_encode(["status" => "success"]);
} else {
    http_response_code(500);
    echo json_encode(["status" => "error", "message" => "Telegram API Error"]);
}
?>
