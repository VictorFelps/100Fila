<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;

class UsuarioController extends Controller
{
    public function index()
    {
        $usuarios = User::select('id', 'name', 'tipo', 'email')->get();
        return response()->json($usuarios);
    }

    public function show($id)
    {
        $usuario = User::find($id);

        if (!$usuario) {
            return response()->json([
                'message' => 'Usuário não encontrado'
            ], 404);
        }

        return response()->json($usuario);
    }

    public function usuarioAutenticado()
{
    return auth()->user();
}

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|string|min:8',
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => bcrypt($request->password),
        ]);

        return response()->json($user, 201);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'name' => 'required|string',
            'email' => 'required|email|unique:users,email,' . $id,
        ]);

        $user = User::find($id);

        if (!$user) {
            return response()->json([
                'message' => 'Usuário não encontrado'
            ], 404);
        }

        $user->update([
            'name' => $request->name,
            'email' => $request->email,
        ]);

        return response()->json($user, 200);
    }

    public function destroy($id)
    {
        $user = User::find($id);

        if (!$user) {
            return response()->json([
                'message' => 'Usuário não encontrado'
            ], 404);
        }

        $user->delete();

        return response()->json(null, 204);
    }
}
