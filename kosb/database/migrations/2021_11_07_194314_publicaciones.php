<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class Publicaciones extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('publicaciones', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('titulo_publicacion');
            $table->unsignedBigInteger('cod_zona'); //fk
            $table->unsignedBigInteger('cod_duracion'); //fk
            $table->unsignedBigInteger('cod_rubro'); //fk
            $table->date('fecha_ini');
            $table->date('fecha_fin');
            $table->date('fecha_publicada');       
            $table->string('descripcion');
            $table->string('tipo_oferta');
            $table->string('estado')->nullable();
            $table->softDeletes();
            $table->unsignedBigInteger('cod_usuario'); //fk
            //Claves Foraneas
            $table->foreign('cod_zona')->references('id')->on('zonas');
            $table->foreign('cod_duracion')->references('id')->on('duraciones');
            $table->foreign('cod_rubro')->references('id')->on('rubros');         
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
        Schema::dropIfExists('publicaciones');
    }
}
