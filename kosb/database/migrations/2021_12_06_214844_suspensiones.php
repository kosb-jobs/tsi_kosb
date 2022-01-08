<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class Suspensiones extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('suspensiones', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('cod_usuario');
            $table->unsignedBigInteger('cod_admin');
            $table->date('fecha_comien_susp');
            $table->date('fecha_final_susp');
            $table->string('descripcion_susp');
            $table->softDeletes();
            $table->foreign('cod_usuario')->references('id')->on('users');
            $table->foreign('cod_admin')->references('id')->on('administradores');
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
        Schema::dropIfExists('suspensiones');
    }
}
