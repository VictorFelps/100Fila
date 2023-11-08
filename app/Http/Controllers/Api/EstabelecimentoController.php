<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Estabelecimento;
use Illuminate\Http\Request;

class EstabelecimentoController extends Controller
{
    public function index()
    {
        return response()->json(Estabelecimento::all());
    }

    public function show($id)
    {
        $estabelecimento = Estabelecimento::find($id);

        if(!$estabelecimento) {
            return response()->json([
                'message' => 'Estabelecimento não encontrado'
            ], 500);
        }

        return response()->json(Estabelecimento::find($id));
    }

    public function edit(Request $request, string $id)
    {
        $estabelecimento = Estabelecimento::find($id);

        if(!$estabelecimento) {
            return response()->json([
                'message' => 'Estabelecimento não encontrado'
            ], 404);
        }
        
        $estabelecimento->update($request->all());

        return response()->json(Estabelecimento::find($id), 204);
    }

    public function fila($id)
    {
        //dd($id);
        return response()->json([
            'estabelecimento' => Estabelecimento::find($id),
            'fila' => [1,2,3]
        ]);

    }

}
