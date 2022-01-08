<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\softDeletes; //Linea necesaria para el soft deletes

class Administrador extends Model
{
    use HasFactory;
    use softDeletes;
    protected $dates = ['deleted_at']; //para el soft deletes
    protected $table = 'administradores';
    //protected $primarykey = 'cod_usuario';
}
