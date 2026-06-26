<?php
// send-form.php

// 1. CONFIGURATION (MUST be provided via environment)
// IMPORTANT: Never hardcode secrets in repository.
$BOT_TOKEN = getenv('TELEGRAM_BOT_TOKEN') ?: '';
$CHAT_ID = getenv('TELEGRAM_CHAT_ID') ?: '';
$EMAIL_TO = getenv('LEADS_EMAIL_TO') ?: 'kireev-rinat@list.ru';
$ALLOWED_ORIGINS = [
    'https://buro-sovetnik.com',
    'https://www.buro-sovetnik.com',
    'https://sovetnik-cno.ru',
    'https://www.sovetnik-cno.ru',
    'http://localhost:3000',
    'http://localhost:3002',
    'http://127.0.0.1:3000',
    'http://127.0.0.1:3002',
    'http://localhost:4174',
    'http://127.0.0.1:4174'
];

// 2. HEADERS + CORS (restricted)
header("Content-Type: application/json; charset=UTF-8");

$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
if ($origin && in_array($origin, $ALLOWED_ORIGINS, true)) {
    header("Access-Control-Allow-Origin: " . $origin);
    header("Vary: Origin");
}
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

// 3. LISTEN FOR POST REQUEST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(["status" => "error", "message" => "Method Not Allowed"]);
    exit;
}

// Block requests from unknown origins (browser context)
if ($origin && !in_array($origin, $ALLOWED_ORIGINS, true)) {
    http_response_code(403);
    echo json_encode(["status" => "error", "message" => "Forbidden origin"]);
    exit;
}

if (!$BOT_TOKEN || !$CHAT_ID) {
    http_response_code(500);
    echo json_encode(["status" => "error", "message" => "Server is not configured"]);
    exit;
}

// 3.1 BASIC SERVER-SIDE ANTI-SPAM / RATE LIMIT
$uaHeader = $_SERVER['HTTP_USER_AGENT'] ?? '';
if (!$uaHeader || strlen($uaHeader) < 10) {
    http_response_code(400);
    echo json_encode(["status" => "error", "message" => "Bad request"]);
    exit;
}

$ip = $_SERVER['HTTP_CLIENT_IP'] ?? $_SERVER['HTTP_X_FORWARDED_FOR'] ?? $_SERVER['REMOTE_ADDR'] ?? 'Unknown';
if (strpos($ip, ',') !== false) {
    $ip = explode(',', $ip)[0];
}

// File-based limit: N requests per window per IP.
$windowSeconds = (int)(getenv('LEADS_RATE_WINDOW_SECONDS') ?: 600); // 10 min
$maxRequests = (int)(getenv('LEADS_RATE_MAX_REQUESTS') ?: 10);
$now = time();
$key = hash('sha256', 'leads:' . $ip);
$rlFile = rtrim(sys_get_temp_dir(), DIRECTORY_SEPARATOR) . DIRECTORY_SEPARATOR . $key . '.json';

try {
    $data = ["start" => $now, "count" => 0];
    if (file_exists($rlFile)) {
        $raw = file_get_contents($rlFile);
        $decoded = $raw ? json_decode($raw, true) : null;
        if (is_array($decoded) && isset($decoded["start"], $decoded["count"])) {
            $data = $decoded;
        }
    }

    if (($now - (int)$data["start"]) > $windowSeconds) {
        $data = ["start" => $now, "count" => 0];
    }

    $data["count"] = (int)$data["count"] + 1;
    file_put_contents($rlFile, json_encode($data), LOCK_EX);

    if ((int)$data["count"] > $maxRequests) {
        http_response_code(429);
        echo json_encode(["status" => "error", "message" => "Too many requests"]);
        exit;
    }
} catch (Throwable $e) {
    // Fail-open: never block legit leads due to RL storage issues.
}

// 4. GET DATA
$input = json_decode(file_get_contents("php://input"), true);
$name = $input['name'] ?? 'Не указано';
$phone = $input['phone'] ?? 'Не указано';
$message = $input['message'] ?? ''; // Empty by default
$service = $input['service'] ?? 'Быстрая заявка'; // Capture service or default
$shadowProfile = $input['shadowProfile'] ?? null;

// Basic payload validation
$phoneDigits = preg_replace('/\D+/', '', (string)$phone);
if (strlen($phoneDigits) < 10) {
    http_response_code(400);
    echo json_encode(["status" => "error", "message" => "Invalid phone"]);
    exit;
}
if (is_string($message) && strlen($message) > 4000) {
    $message = substr($message, 0, 4000);
}

// IP & GEO LOGIC (optional; must never block lead delivery)
$geoInfo = "г. Не определен ($ip)";
if ($ip !== 'Unknown' && $ip !== '127.0.0.1' && $ip !== '::1') {
    // try to get city from IP-API (free)
    $chGeo = curl_init("https://ip-api.com/json/{$ip}?lang=ru&fields=city,regionName");
    curl_setopt($chGeo, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($chGeo, CURLOPT_TIMEOUT, 2); // 2 seconds max so we don't block
    $geoRes = curl_exec($chGeo);
    curl_close($chGeo);
    if ($geoRes) {
        $geoData = json_decode($geoRes, true);
        if (isset($geoData['city'])) {
            $geoInfo = $geoData['city'] . ", " . $geoData['regionName'];
        }
    }
}

// 5. FORMAT MESSAGE FOR TELEGRAM
$txt = "⚡️ <b>Новая заявка!</b>\n";
$txt .= "📌 <b>Услуга:</b> " . strip_tags($service) . "\n";
$txt .= "👤 <b>Имя:</b> " . strip_tags($name) . "\n";
$txt .= "📱 <b>Телефон:</b> " . strip_tags($phone) . "\n\n";

if (!empty($message)) {
    $txt .= "📝 <b>Конфигурация/Вопрос:</b>\n" . strip_tags($message) . "\n\n";
}

// АНАЛИТИКА ТЕНЕВОГО ПРОФИЛЯ
$txt .= "📊 <b>ДАННЫЕ О ПОСЕТИТЕЛЕ:</b>\n";
$txt .= "📍 <b>Город:</b> " . $geoInfo . "\n";

if ($shadowProfile) {
    // Устройство (упрощенно: iPhone/Android/Windows/Mac)
    $ua = $shadowProfile['userAgent'] ?? '';
    $device = 'PC (Windows/Mac)';
    if (stripos($ua, 'iPhone') !== false) $device = 'Apple iPhone';
    elseif (stripos($ua, 'Mac OS') !== false) $device = 'Apple Mac';
    elseif (stripos($ua, 'Android') !== false) $device = 'Android Smartphone';
    
    $txt .= "💻 <b>Устройство:</b> " . $device . "\n";
    $txt .= "⏱ <b>Время на сайте:</b> " . ($shadowProfile['timeOnSite'] ?? '0с') . "\n";
    
    if (!empty($shadowProfile['channel'])) {
        $txt .= "🎯 <b>Источник:</b> " . $shadowProfile['channel'] . "\n";
    }

    if (!empty($shadowProfile['visitedPages']) && is_array($shadowProfile['visitedPages'])) {
        $pagesCount = count($shadowProfile['visitedPages']);
        $lastPage = end($shadowProfile['visitedPages']);
        $txt .= "👣 <b>История:</b> Посмотрел " . $pagesCount . " страниц(ы)\n";
        $txt .= "🏁 <b>Где оставил заявку:</b> " . strip_tags($lastPage) . "\n";
    }
} else {
    $txt .= "<i>Аналитика визита недоступна (браузер заблокировал скрипты).</i>\n";
}

$txt .= "\n🕒 <b>Отправлено:</b> " . date('Y-m-d H:i:s');

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
$telegram_result = curl_exec($ch);
curl_close($ch);

// 7. SEND TO EMAIL (REDUNDANCY)
$to = $EMAIL_TO;
$subject = "⚡️ Заявка: " . mb_substr($service, 0, 30); // Short subject
$email_headers = "MIME-Version: 1.0" . "\r\n";
$email_headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
$email_headers .= "From: no-reply@buro-sovetnik.com" . "\r\n"; 

$email_content = nl2br(htmlspecialchars($message)); // Safe HTML with line breaks

$email_message = "
<html>
<head>
    <title>Новая заявка</title>
</head>
<body style='font-family: Arial, sans-serif; color: #333;'>
    <div style='background-color: #f4f4f4; padding: 20px; border-radius: 10px;'>
        <h2 style='color: #991b1b;'>Новая заявка с сайта</h2>
        <p><strong>📌 Услуга/Источник:</strong> " . htmlspecialchars($service) . "</p>
        <p><strong>👤 Имя:</strong> " . htmlspecialchars($name) . "</p>
        <p><strong>📱 Телефон:</strong> <a href='tel:" . htmlspecialchars($phone) . "'>" . htmlspecialchars($phone) . "</a></p>
        " . (!empty($message) ? "<div style='background: white; padding: 15px; border-left: 4px solid #991b1b; margin: 10px 0;'><strong>📝 Сообщение:</strong><br>" . $email_content . "</div>" : "") . "
        <hr>
        <h3 style='color: #4a5568;'>📊 Аналитика визита</h3>
        <p><strong>📍 Город (IP):</strong> " . $geoInfo . "</p>
        <p><strong>💻 Устройство:</strong> " . ($device ?? 'Неизвестно') . "</p>
        <p><strong>⏱ Время на сайте:</strong> " . ($shadowProfile['timeOnSite'] ?? '0с') . "</p>
        <p><strong>👣 Открытых страниц:</strong> " . (count($shadowProfile['visitedPages'] ?? [])) . "</p>
        <p><strong>🎯 Источник перехода:</strong> " . ($shadowProfile['channel'] ?? 'Прямой заход') . "</p>
        <hr>
        <p><small style='color: #777;'>Время отправки: " . date('Y-m-d H:i:s') . "</small></p>
    </div>
</body>
</html>
";

// Use mail() - simple and works on most shared hosting
$email_result = mail($to, $subject, $email_message, $email_headers);

// 8. RETURN RESPONSE
if ($telegram_result || $email_result) {
    echo json_encode([
        "status" => "success",
        "telegram" => $telegram_result ? "sent" : "failed",
        "email" => $email_result ? "sent" : "failed"
    ]);
} else {
    http_response_code(500);
    echo json_encode(["status" => "error", "message" => "All notifications failed"]);
}
?>
