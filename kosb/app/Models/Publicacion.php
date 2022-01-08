<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\softDeletes; //Linea necesaria para el soft deletes

class Publicacion extends Model
{
    use HasFactory;
    use softDeletes;
    protected $dates = ['deleted_at']; //para el soft deletes
    
    protected $table = 'publicaciones';
    //protected $primarykey = 'cod_publicacion';
    //public $incrementing = true;
    /*protected $attributes = [
        'cod_publicacion' => 0,
    ];*/
    
}
