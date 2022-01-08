<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class Reclamos extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('reclamos', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('titulo_reclamo');
            $table->unsignedBigInteger('cod_usuario'); //FK direccionada a users
            $table->date('fecha_reclamo');
            $table->string('descripcion_reclamo');
            $table->string('tipo_reclamo');
            $table->date('fecha_respuesta')->nullable();
            $table->string('contenido_respuesta')->nullable();
            $table->unsignedBigInteger('cod_admin')->nullable(); //FK direccionada a administradores
            $table->softDeletes();
            //ForeanKey
            $table->foreign('cod_admin')->references('id')->on('administradores');
            $table->foreign('cod_usuario')->references('id')->on('users');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('reclamos');
    }
}
