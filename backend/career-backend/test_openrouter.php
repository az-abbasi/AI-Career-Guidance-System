<?php
require __DIR__ . '/vendor/autoload.php';
$app = require_once __DIR__ . '/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

use Illuminate\Support\Facades\Http;

$prompt = "Test prompt for AI recommendation.";
$key = env('OPENROUTER_API_KEY');

echo "API Key: " . ($key ? substr($key, 0, 10) . "..." : "NONE") . "\n";
echo "Sending test HTTP post to OpenRouter...\n";

try {
    $response = Http::timeout(20)->withHeaders([
        'Authorization' => 'Bearer ' . $key,
        'Content-Type' => 'application/json',
    ])->post('https://openrouter.ai/api/v1/chat/completions', [
        'model' => 'openrouter/free',
        'messages' => [
            ['role' => 'user', 'content' => $prompt]
        ],
    ]);

    echo "Status Code: " . $response->status() . "\n";
    echo "Body: " . $response->body() . "\n";
} catch (\Exception $e) {
    echo "Exception: " . $e->getMessage() . "\n";
}
