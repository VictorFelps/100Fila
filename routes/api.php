<?php

use App\Http\Controllers\Api\EstabelecimentoController;
use App\Models\Estabelecimento;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user();
});


Route::resource('estabelecimento', EstabelecimentoController::class)->withoutMiddleware(['web']);
Route::get('estabelecimento/{id}/fila', [EstabelecimentoController::class, 'fila'])->withoutMiddleware(['web']);