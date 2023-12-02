<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Estabelecimento extends Model
{
    use HasFactory;

    protected $table = 'estabelecimento';
    protected $key = 'id';

    public $timestamps = false;

    protected $fillable = [
        'tempo',
        'nome',
        'local',
        'cnpj'
    ];

}
