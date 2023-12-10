<?php

use App\Http\Controllers\Api\EstabelecimentoController;
use App\Http\Controllers\Api\UsuarioController;
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


Route::group(['middleware' => 'web'], function() {
    Route::resource('estabelecimento', EstabelecimentoController::class);
    Route::resource('usuarios', UsuarioController::class);
    Route::delete('/estabelecimento/{id}', 'EstabelecimentoController@destroy');



    Route::get('estabelecimento/{id}/fila', [EstabelecimentoController::class, 'fila'])
        ->where('id', '[0-9]+');

        Route::get('estabelecimento/{id}/fila/pessoas', [EstabelecimentoController::class, 'pessoas'])
        ->where('id', '[0-9]+');
    
    Route::get('estabelecimento/{idEstabelecimento}/fila/entrar-na-fila', [EstabelecimentoController::class, 'entrarNaFila'])
        ->where('idEstabelecimento', '[0-9]+');
    
    Route::get('estabelecimento/{idEstabelecimento}/fila/sair-da-fila', [EstabelecimentoController::class, 'sairDaFila'])
        ->where('idEstabelecimento', '[0-9]+');

    Route::get('estabelecimento/{idEstabelecimento}/fila/chamar-da-fila', [EstabelecimentoController::class, 'chamarPessoaDaFila'])
        ->where('idEstabelecimento', '[0-9]+');
});
