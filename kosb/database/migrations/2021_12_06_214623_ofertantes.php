<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class Ofertantes extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('ofertantes', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('cod_usuario')->unsigned()->unique();
            $table->integer('publicaciones_activas');
            $table->integer('ofertas_total_publ');
            $table->integer('puntuacion_ofertante');
            $table->softDeletes();
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
        Schema::dropIfExists('ofertantes');
    }
}
