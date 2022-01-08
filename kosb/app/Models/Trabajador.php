<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\softDeletes; //Linea necesaria para el soft deletes

class Trabajador extends Model
{
    use HasFactory;
    protected $table = 'trabajadores';
    
    use softDeletes;
    protected $dates = ['deleted_at']; //para el soft deletes
}
