<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;


class Estabelecimento extends Model
{
    use HasFactory;
    use SoftDeletes;

    protected $table = 'estabelecimento';
    protected $key = 'id';

    public $timestamps = false;

    protected $fillable = [
        'tempo',
        'nome',
        'local',
        'cnpj',
        'user_id'
    ];

}
