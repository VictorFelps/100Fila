<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Estabelecimento;
use App\Models\Fila;
use Carbon\Carbon;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class EstabelecimentoController extends Controller
{
    public function index()
    {
        $user = Auth::user();
        $minhasFilas = request()->input('minhas-filas', false);
        
        $data = Estabelecimento::when($minhasFilas, function($query) use ($user) {
            return $query->where('user_id', $user->id);
        })->get();
        return response()->json($data);
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

    public function store(Request $request) 
    {
        try {
            $data = $request->all();
            $data['user_id'] = Auth::id();
            $estabelecimento = Estabelecimento::create($data);
            return response()->json($estabelecimento);
        } catch(Exception $e) {
            return response()->json($e->getMessage());
        }
        
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

    public function update(Request $request, string $id)
{
    $estabelecimento = Estabelecimento::find($id);

    if (!$estabelecimento) {
        return response()->json([
            'message' => 'Estabelecimento não encontrado'
        ], 404);
    }

    $estabelecimento->update($request->all());

    return response()->json($estabelecimento, 200);
}

    public function destroy($id)
{
    try {
        $estabelecimento = Estabelecimento::find($id);

        if (!$estabelecimento) {
            return response()->json(['message' => 'Estabelecimento não encontrado'], 404);
        }

        $estabelecimento->delete();

        return response()->json(['message' => 'Estabelecimento excluído com sucesso']);
    } catch (Exception $e) {
        return response()->json(['message' => $e->getMessage()], 500);
    }
}

    public function fila($id)
    {
        //dd($id);
        $toDay = Carbon::now()->format('Y-m-d');
        $filaAtual = Fila::where(['estabelecimento_id' => $id])->whereDate('created_at', $toDay)->count();
        $chamado = Fila::where([
            'estabelecimento_id' => $id, 
            'user_id' => Auth::id(),
            'current_state' => 'CHAMANDO'
        ])
            ->whereDate('created_at', $toDay)
            ->count();

        $fila = Fila::where(['estabelecimento_id' => $id])->whereDate('created_at', $toDay)->get();
        $posicao = 0;
        $fila->each(function($item, $index) use (&$posicao) {
            if($item->user_id == Auth::id()) {
                $posicao = $index + 1;
            }
        });
        
        return response()->json([
            'estabelecimento' => Estabelecimento::find($id),
            'chamado' => $chamado,
            'fila' => $filaAtual,
            'posicao' => $posicao,
        ]);

    }

    public function pessoas($id)
    {
        $toDay = Carbon::now()->format('Y-m-d');
        $filaAtual = Fila::with(['user','estabelecimento'])
            ->whereDate('created_at', $toDay)
            ->where(['estabelecimento_id' => $id])
            ->get();
        
        return response()->json($filaAtual);
    }

    public function entrarNaFila($idEstabelecimento)
    {
        //dd($id);
        $toDay = Carbon::now();
        $data = [
            'estabelecimento_id' => $idEstabelecimento,
            'user_id' => Auth::id(),
            'created_at' => $toDay
        ];
        $fila = Fila::where($data)->first();
        if(!$fila) {
            Fila::insert($data);
        }
        unset($data['user_id']);
        $fila = Fila::where($data)->get();

        $posicao = 0;
        $fila->each(function($item, $index) use (&$posicao) {
            if($item->user_id == Auth::id()) {
                $posicao = $index + 1;
            }
        });
        
        return response()->json([
            'message' => 'fila atualizada com sucesso',
            'posicao' => $posicao
        ]);

    }

    public function sairDaFila($idEstabelecimento)
    {
        //dd($id);
        $toDay = Carbon::now()->format('Y-m-d');
        $data = [
            'estabelecimento_id' => $idEstabelecimento,
            'user_id' => Auth::id(),
        ];
        Fila::where($data)->whereDate('created_at', $toDay)->delete();

        
        $fila = Fila::where('estabelecimento_id', $idEstabelecimento)->whereDate('created_at', $toDay)->get();

        $posicao = 0;
        $fila->each(function($item, $index) use (&$posicao) {
            if($item->user_id == Auth::id()) {
                $posicao = $index + 1;
            }
        });
        
        return response()->json([
            'message' => 'fila atualizada com sucesso',
            'posicao' => $posicao
        ]);

    }

    public function chamarPessoaDaFila($idEstabelecimento)
    {
        $toDay = Carbon::now()->format('Y-m-d');
        $data = [
            'estabelecimento_id' => $idEstabelecimento,
        ];

        Fila::where([
            'current_state' => 'CHAMANDO'
        ])->delete();

        $fila = Fila::where($data)->whereDate('created_at', $toDay)->orderBy('id', 'asc')->first();
        $fila->current_state = 'CHAMANDO';
        $fila->save();
    }


   
    
}

