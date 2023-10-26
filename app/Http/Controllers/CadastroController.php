<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ntroller extends Controller
{
    public function index()
    {
        return view('cadastro');
    }

    public function store(Request $request)
    {
        // Adicione aqui a lógica para salvar os dados no banco de dados

        return redirect()->route('cadastro.index')->with('success', 'Cadastro realizado com sucesso!');
    }
}