<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Estabelecimento;
use App\Models\Fila;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

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
        $toDay = Carbon::now()->format('Y-m-d');
        $filaAtual = Fila::where(['estabelecimento_id' => $id, 'created_at' => $toDay])->count();        
        
        return response()->json([
            'estabelecimento' => Estabelecimento::find($id),
            'fila' => $filaAtual,
        ]);

    }

    public function entrarNaFila($idEstabelecimento)
    {
        //dd($id);
        $toDay = Carbon::now()->format('Y-m-d');
        $data = [
            'estabelecimento_id' => $idEstabelecimento,
            'user_id' => Auth::id(),
            'created_at' => $toDay
        ];
        $fila = Fila::where($data)->first();
        if(!$fila) {
            Fila::insert($data);
        }
        
        return response()->json([
            'message' => 'fila atualizada com sucesso'
        ]);

    }

    public function sairDaFila($idEstabelecimento)
    {
        //dd($id);
        $toDay = Carbon::now()->format('Y-m-d');
        $data = [
            'estabelecimento_id' => $idEstabelecimento,
            'user_id' => Auth::id(),
            'created_at' => $toDay
        ];
        $fila = Fila::where($data)->delete();
        
        return response()->json([
            'message' => 'fila atualizada com sucesso'
        ]);

    }


   
    
}

