<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class Postulaciones extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up() //ver que hacer con la tabla
    {
        Schema::create('postulaciones', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('cod_publicacion');
            $table->unsignedInteger('cod_usuario')->constrained('users');
            $table->tinyInteger('aceptacion')->nullable();
            $table->date('fecha_postulacion');
            $table->softDeletes();
            $table->foreign('cod_publicacion')->references('id')->on('publicaciones');
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
        Schema::dropIfExists('postulaciones');
    }
}
