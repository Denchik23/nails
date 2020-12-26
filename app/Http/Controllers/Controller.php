<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;

class Controller extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;

    /**
     * @param string $message
     * @param array $data
     * @param int $cod
     * @return \Illuminate\Http\JsonResponse
     */
    public function success($message = '', $data = [], $cod = 200)
    {
        $response = array_merge(['message' => $message, 'status' => true], $data);
        return response()->json($response, $cod);
    }

    /**
     * @param string $message
     * @param array $data
     * @param int $cod
     * @return \Illuminate\Http\JsonResponse
     */
    public function error($message = '', $data = [], $cod = 200)
    {
        $response = array_merge(['message' => $message, 'status' => false], $data);
        return response()->json($response, $cod);
    }
}
