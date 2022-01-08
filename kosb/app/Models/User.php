<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Database\Eloquent\softDeletes; //Linea necesaria para el soft deletes

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;
    use softDeletes;
    
    /**
     * The attributes that are mass assignable.
     *
     * @var string[]
     */
    //protected $fecha_actual = new DateTime('now');
    
    protected $attributes = [
        'estado' => 0,
        //'fecha_registro'=> date_default_timezone_get(),
    ];

    protected $dates = ['deleted_at']; //para el soft deletes

    protected $fillable = [
        'name',
        'email',
        'password',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];
}
