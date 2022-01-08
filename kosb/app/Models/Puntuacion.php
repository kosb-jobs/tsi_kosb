<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\softDeletes; //Linea necesaria para el soft deletes

class Puntuacion extends Model
{
    use HasFactory;
    use softDeletes;
    protected $dates = ['deleted_at']; //para el soft deletes
}
