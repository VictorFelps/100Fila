<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Fila extends Model
{
    use HasFactory;
    use SoftDeletes;

    protected $table = 'fila';
    protected $key = 'id';

    public $timestamps = false;

    protected $casts = [
        'created_at' => 'date:Y-m-d',
    ];

    protected $fillable = [
        'estabelecimento_id',
        'user_id',
        'created_at',
        'current_state',
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id', 'id');
    }

    public function estabelecimento()
    {
        return $this->belongsTo(Estabelecimento::class, 'estabelecimento_id', 'id');
    }
}
