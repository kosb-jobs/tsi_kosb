<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\softDeletes; //Linea necesaria para el soft deletes

class Duracion extends Model
{
    use HasFactory;
    use softDeletes;
    protected $dates = ['deleted_at']; //para el soft deletes
    protected $table = 'duraciones';
    //protected $primarykey = 'cod_duracion';
    
}
