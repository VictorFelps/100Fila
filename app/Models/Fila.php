<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Fila extends Model
{
    use HasFactory;

    protected $table = 'fila';
    protected $key = 'id';

    public $timestamps = false;

    protected $casts = [
        'created_at' => 'date:Y-m-d',
    ];

    protected $fillable = [
        'estabelecimento_id',
        'created_at',
        'current_state',
    ];
}
