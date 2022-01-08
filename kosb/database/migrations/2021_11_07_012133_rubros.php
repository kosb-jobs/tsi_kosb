<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class Rubros extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('rubros', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('nom_rubro');
            $table->unsignedBigInteger('cod_admin');
            $table->date('fecha_edicion');
            $table->softDeletes();
            //Claves Foraneas
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
        Schema::dropIfExists('rubros');
    }
}
