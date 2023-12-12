<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Casts\Attribute;

class Fila extends Model
{
    use HasFactory;
    use SoftDeletes;

    protected $table = 'fila';
    protected $key = 'id';

    public $timestamps = false;

    protected $casts = [
        'created_at' => 'datetime:Y-m-d H:i:s',
    ];

    protected $fillable = [
        'estabelecimento_id',
        'user_id',
        'created_at',
        'current_state',
    ];

    protected $appends = [
        'time'
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id', 'id');
    }

    public function estabelecimento()
    {
        return $this->belongsTo(Estabelecimento::class, 'estabelecimento_id', 'id');
    }

    protected function time(): Attribute
    {
        return Attribute::make(
            get: function (mixed $value, array $attributes) {
                $now = Carbon::now();
                $created = Carbon::createFromFormat('Y-m-d H:i:s', $attributes['created_at']);
                return $created->diff($now)->format('%H:%i:%s');
            }
        );
    }
}
